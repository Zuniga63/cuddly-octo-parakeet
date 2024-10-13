import { PartialType } from '@nestjs/swagger';
import { CreateImageResourceDto } from './create-image-resource.dto';

export class UpdateImageResourceDto extends PartialType(CreateImageResourceDto) {}
