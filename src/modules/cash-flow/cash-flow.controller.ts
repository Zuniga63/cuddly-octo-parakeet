import { Controller } from '@nestjs/common';
import { CashFlowService } from './cash-flow.service';

@Controller('cash-flow')
export class CashFlowController {
  constructor(private readonly cashFlowService: CashFlowService) {}
}
