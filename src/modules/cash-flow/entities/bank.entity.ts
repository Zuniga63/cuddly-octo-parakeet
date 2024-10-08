import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { PaymentMethod } from './payment-method.entity';

@Entity('bank')
export class Bank {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // * ----------------------------------------------------------------------------------------------------------------
  // * RELATIONSHIPS
  // * ----------------------------------------------------------------------------------------------------------------
  @OneToMany(() => PaymentMethod, paymentMethod => paymentMethod.bank)
  paymentMethods: PaymentMethod[];

  // * ----------------------------------------------------------------------------------------------------------------
  // * MAIN FIELDS
  // * ----------------------------------------------------------------------------------------------------------------
  @Column('text')
  name: string;

  @Column('text')
  holder: string;

  @Column('text', { name: 'account_number' })
  accountNumber: string;

  @Column('boolean', { default: true })
  isEnabled: boolean;

  @Column('decimal', { precision: 12, scale: 2, default: 0 })
  balance: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
