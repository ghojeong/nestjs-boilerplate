import { Inject, Injectable } from '@nestjs/common';
import * as FormData from 'form-data';
import got from 'got';
import { CONFIG_OPTIONS } from 'src/common/common.constants';
import { EmailVar, MailModuleOptions } from './mail.interface';

@Injectable()
export class MailService {
  constructor(
    @Inject(CONFIG_OPTIONS) private readonly options: MailModuleOptions,
  ) {}

  async sendVerificationEmail(
    memberName: string,
    memberEmail: string,
    memberCode: string,
  ) {
    await this.sendEmail(memberEmail, 'Verify Your Email', 'verify-email', [
      { key: 'memberName', value: memberName },
      { key: 'code', value: memberCode },
    ]);
  }

  async sendEmail(
    toEmail: string,
    subject: string,
    template: string,
    emailVars: EmailVar[],
  ) {
    const body = new FormData();
    body.append(
      'from',
      `ghojeong Test Email <postmaster@${this.options.domainName}>`,
    );
    body.append('to', toEmail);
    body.append('subject', subject);
    body.append('template', template);
    emailVars.forEach(({ key, value }) => body.append(`v:${key}`, value));
    try {
      await got(
        `https://api.mailgun.net/v3/${this.options.domainName}/messages`,
        {
          method: 'POST',
          headers: {
            Authorization: `Basic ${Buffer.from(`api:${this.options.apiKey}`).toString('base64')}`,
          },
          body,
        },
      );
    } catch (e) {
      console.error(e);
    }
  }
}
