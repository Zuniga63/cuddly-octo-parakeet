import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Bank, PaymentMethod } from './entities';
import { CashFlowService } from './cash-flow.service';
import { CashFlowController } from './cash-flow.controller';

@Module({
  controllers: [CashFlowController],
  providers: [CashFlowService],
  imports: [TypeOrmModule.forFeature([Bank, PaymentMethod])],
})
export class CashFlowModule {}
