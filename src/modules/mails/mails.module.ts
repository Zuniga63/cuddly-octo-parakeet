import { Module } from '@nestjs/common';
import { MailsService } from './mails.service';
import { ResendModule } from 'nestjs-resend';

@Module({
  imports: [
    ResendModule.forRootAsync({
      useFactory: async () => {
        return {
          apiKey: process.env.RESEND_API_KEY!,
        };
      },
    }),
  ],
  controllers: [],
  providers: [MailsService],
  exports: [MailsService],
})
export class MailsModule {}
