import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Role } from 'src/modules/roles/entities/role.entity';
import { Session } from 'src/modules/auth/entities';
import { ImageResource } from 'src/modules/image-resources/entities';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // * ----------------------------------------------------------------------------------------------------------------
  // * RELATIONSHIPS
  // * ----------------------------------------------------------------------------------------------------------------
  @ManyToOne(() => Role, role => role.users, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'role_id' })
  role: Role;

  @OneToMany(() => Session, session => session.user)
  sessions?: Session[];

  @OneToOne(() => ImageResource, { nullable: true, cascade: true, onDelete: 'SET NULL', eager: true })
  @JoinColumn({ name: 'profile_photo_id' })
  profilePhoto?: ImageResource;

  // * ----------------------------------------------------------------------------------------------------------------
  // * MAIN COLUMNS
  // * ----------------------------------------------------------------------------------------------------------------
  @Column('text')
  username: string;

  @Column('text', { unique: true })
  email: string;

  @Column('text', { select: false, nullable: true })
  password?: string | null;

  @Column('timestamp', { nullable: true, name: 'email_verified_at' })
  emailVerifiedAt: Date | null;

  @Column('boolean', { default: false, name: 'is_super_user' })
  isSuperUser: boolean;

  @Column('boolean', { default: false, name: 'is_admin' })
  isAdmin: boolean;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', name: 'created_at' })
  createdAt: Date;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', name: 'updated_at' })
  updatedAt: Date;

  // * ----------------------------------------------------------------------------------------------------------------
  // * HOOKS
  // * ----------------------------------------------------------------------------------------------------------------
  @BeforeInsert()
  emailToLowerCase() {
    this.email = this.email.toLowerCase();
  }

  @BeforeUpdate()
  emailToLowerCaseOnUpdate() {
    this.email = this.email.toLowerCase();
    this.updatedAt = new Date();
  }
}
