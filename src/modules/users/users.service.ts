import { BadRequestException, Injectable, Logger, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { hashPassword } from '../auth/utils/hash-password';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { CloudinaryImage } from '../cloudinary/interfaces';
import { CloudinaryPresets } from 'src/config';
import { UserDto } from './dto/user.dto';
import { ChangePasswordDto } from '../auth/dto/change-password.dto';
import { compareSync } from 'bcrypt';
import { GoogleUserDto } from '../auth/dto/google-user.dto';
import { ImageResource } from '../image-resources/entities';
import { createImageResourceDtoFromCloudinaryResAdapter } from '../image-resources/adapters';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,

    @InjectRepository(ImageResource)
    private readonly imageResourcesRepository: Repository<ImageResource>,

    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    createUserDto.password = hashPassword(createUserDto.password);

    const user = this.usersRepository.create(createUserDto);
    await this.usersRepository.save(user);
    delete user.password;

    return user;
  }

  async createFromGoogle(googleUser: GoogleUserDto) {
    const { email, username, picture } = googleUser;

    // * Create or update the user entity
    let user = await this.usersRepository.findOne({ where: { email } });
    if (!user) user = this.usersRepository.create({ email: email, username: username });

    // * If the user is not verified, set the emailVerifiedAt field
    if (!user.emailVerifiedAt) user.emailVerifiedAt = new Date();
    await this.usersRepository.save(user);

    console.log('User:', user);

    if (user.profilePhoto || !picture) return user;

    // * Add google profile photo to the user
    try {
      const cloudResponse = await this.cloudinaryService.uploadImageFromUrl(
        picture,
        user.username,
        CloudinaryPresets.PROFILE_PHOTO,
      );

      const imageDto = createImageResourceDtoFromCloudinaryResAdapter(cloudResponse);
      if (!imageDto) throw new Error('Error creating image resource DTO');

      const image = this.imageResourcesRepository.create(imageDto);
      await this.imageResourcesRepository.save(image);

      user.profilePhoto = image;
      await this.usersRepository.save(user);
    } catch (error) {
      console.log(error);
      this.logger.error('No se pudo cargar la imagen de usuario desde la url de gooogle');
    }

    return user;
  }

  findAll() {
    return this.usersRepository.find();
  }

  async findOne(id: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { id }, relations: ['role'] });
  }

  async findOneWithSessionAndRole(id: string, sessionId: string): Promise<User | null> {
    return this.usersRepository.findOne({
      where: { id, sessions: { id: sessionId } },
      relations: { role: true, sessions: true },
    });
  }

  async getFullUser(email: string): Promise<User | null> {
    return this.usersRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.role', 'role')
      .addSelect('user.password')
      .where('user.email = :email', { email })
      .getOne();
  }

  async updateProfilePhoto(id: string, file: Express.Multer.File) {
    const user = await this.findOne(id);
    if (!user) throw new NotFoundException('User not found');

    const { profilePhoto: currentImage } = user;
    let image: CloudinaryImage | undefined;

    try {
      // * Upload the image to Cloudinary
      image = await this.cloudinaryService.uploadImage({
        file,
        fileName: user.username,
        preset: CloudinaryPresets.PROFILE_PHOTO,
      });

      // * If the image is not uploaded, throw an error

      // * Update the user's profile photo path
      const imageDto = createImageResourceDtoFromCloudinaryResAdapter(image);
      if (!imageDto) throw new BadRequestException('Error uploading image');

      user.profilePhoto = await this.imageResourcesRepository.save(imageDto);
      await this.usersRepository.save(user);

      // * Delete the old profile photo if it exists

      if (currentImage && currentImage.publicId) {
        this.cloudinaryService.destroyFile(currentImage.publicId);
      }

      return new UserDto(user);
    } catch (error) {
      this.logger.error(error);
      if (image) {
        this.logger.log('Deleting image');
        await this.cloudinaryService.destroyFile(image.publicId);
      }

      throw error;
    }
  }

  async removeProfilePhoto(id: string) {
    const user = await this.findOne(id);
    if (!user) throw new NotFoundException('User not found');

    const { profilePhoto } = user;
    if (!profilePhoto || !profilePhoto.publicId) throw new BadRequestException('User does not have a profile photo');

    await this.cloudinaryService.destroyFile(profilePhoto.publicId);
    await this.imageResourcesRepository.delete({ id: profilePhoto.id });

    return new UserDto(user);
  }

  async changePassword(email: string, changePasswordDto: ChangePasswordDto) {
    const { password, newPassword } = changePasswordDto;

    const user = await this.getFullUser(email);
    if (!user) throw new NotFoundException('User not found');
    if (user.password && !compareSync(password, user.password)) throw new UnauthorizedException('Invalid password');

    user.password = hashPassword(newPassword);
    await this.usersRepository.save(user);
  }

  async verifyEmail(userId: string) {
    const user = await this.findOne(userId);
    if (!user) throw new NotFoundException('User not found');

    user.emailVerifiedAt = new Date();
    await this.usersRepository.save(user);

    return new UserDto(user);
  }
}
