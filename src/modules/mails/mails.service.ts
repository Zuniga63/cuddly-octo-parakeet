import { Injectable } from '@nestjs/common';
import { render } from '@react-email/render';
import { ResendService } from 'nestjs-resend';
import { EmailVerification } from './templates/email-verification';
import { ConfigService } from '@nestjs/config';
import { EnvironmentVariables } from 'src/config';

interface SendMailConfiguration {
  fromFriendlyName?: string;
  to: string;
  subject: string;
  text?: string;
  template: any;
}

@Injectable()
export class MailsService {
  constructor(
    private readonly resendService: ResendService,
    private readonly configService: ConfigService<EnvironmentVariables>,
  ) {}

  async sendEmailVerification(email: string, token: string) {
    const verificationLink = this.getBaseUrl() + '/auth/verify-email?token=' + token;

    const result = await this.sendEmail({
      to: email,
      subject: 'Verificación de Email',
      template: EmailVerification({
        verificationLink,
        bussinessName: 'Estudio Fotografico Braylen Linares',
        address: 'Calle 5ta, 5-10 Zona 1',
        city: 'Chiquimula',
      }),
      fromFriendlyName: 'Verificar Email',
    });

    if (result.error) return { ok: false, message: 'Error al enviar el correo de verificación' };
    return { ok: true };
  }

  async sendEmail({ to, subject, template, fromFriendlyName }: SendMailConfiguration) {
    const html = await this.generateEmail(template);
    const fromEmail = this.configService.get('resend.from', { infer: true })!;
    const from = fromFriendlyName ? `${fromFriendlyName} <${fromEmail}>` : fromEmail;

    return this.resendService.send({ from, to, subject, html });
  }

  private generateEmail(template: any) {
    return render(template);
  }

  private getBaseUrl() {
    const frontendUrl = this.configService.get('urls.frontend', { infer: true });
    const backendUrl = this.configService.get('urls.backend', { infer: true });

    let verificationLink = frontendUrl || backendUrl;
    if (!frontendUrl && !backendUrl) verificationLink = 'http://localhost:3000';

    if (!frontendUrl) return (verificationLink += '/api');
    return verificationLink;
  }
}
