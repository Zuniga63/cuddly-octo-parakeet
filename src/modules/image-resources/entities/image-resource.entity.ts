import { Column, CreateDateColumn, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ResourceProvider } from '../constants';
import { User } from 'src/modules/users/entities';

@Entity({ name: 'image_resource' })
export class ImageResource {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // * ----------------------------------------------------------------------------------------------------------------
  // * RELATIONSHIPS
  // * ----------------------------------------------------------------------------------------------------------------
  @OneToOne(() => User, user => user.profilePhoto, { nullable: true })
  user?: User;

  // * ----------------------------------------------------------------------------------------------------------------
  // * MAIN COLUMNS
  // * ----------------------------------------------------------------------------------------------------------------
  @Column('text')
  url: string;

  @Column('text', { nullable: true, name: 'file_name' })
  fileName: string | null;

  @Column('text', { nullable: true, name: 'public_id' })
  publicId: string | null;

  @Column('integer', { nullable: true })
  width: number | null;

  @Column('integer', { nullable: true })
  height: number | null;

  @Column('text', { nullable: true })
  format: string | null;

  @Column('integer', { nullable: true })
  size: number | null;

  @Column('enum', { enum: ResourceProvider })
  provider: ResourceProvider;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', name: 'created_at' })
  createdAt: Date;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', name: 'updated_at' })
  updatedAt: Date;
}
