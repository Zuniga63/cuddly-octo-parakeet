import { Module } from '@nestjs/common';
import { CashFlowService } from './cash-flow.service';
import { CashFlowController } from './cash-flow.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bank } from './entities';

@Module({
  controllers: [CashFlowController],
  providers: [CashFlowService],
  imports: [TypeOrmModule.forFeature([Bank])],
})
export class CashFlowModule {}
