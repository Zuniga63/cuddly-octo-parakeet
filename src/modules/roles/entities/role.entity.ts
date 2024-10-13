import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { AppPermissions } from 'src/config';
import { User } from 'src/modules/users/entities/user.entity';

@Entity()
export class Role {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // * ----------------------------------------------------------------------------------------------------------------
  // * RELATIONSHIPS
  // * ----------------------------------------------------------------------------------------------------------------
  @OneToMany(() => User, user => user.role)
  users?: User[];

  // * ----------------------------------------------------------------------------------------------------------------
  // * MAIN COLUMNS
  // * ----------------------------------------------------------------------------------------------------------------
  @Column('text', { unique: true })
  name: string;

  @Column('text', { array: true })
  permissions: AppPermissions[];

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', name: 'created_at' })
  createdAt: Date;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', name: 'updated_at' })
  updatedAt?: Date;
}
