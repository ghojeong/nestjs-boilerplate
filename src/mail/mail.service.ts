import { Inject, Injectable } from '@nestjs/common';
import * as FormData from 'form-data';
import got from 'got';
import { CONFIG_OPTIONS } from 'src/common/common.constants';
import { MailModuleOptions } from './mail.interface';

@Injectable()
export class MailService {
  constructor(
    @Inject(CONFIG_OPTIONS) private readonly options: MailModuleOptions,
  ) {
    this.sendEmail('rhwjddhks@gmail.com', 'Hello', 'World');
  }

  private async sendEmail(toEmail: string, subject: string, content: string) {
    const body = new FormData();
    body.append(
      'from',
      `Mailgun Sandbox <postmaster@${this.options.domainName}>`,
    );
    body.append('to', toEmail);
    body.append('subject', subject);
    body.append('text', content);
    const response = await got(
      `https://api.mailgun.net/v3/${this.options.domainName}/messages`,
      {
        method: 'POST',
        headers: {
          Authorization: `Basic ${Buffer.from(`api:${this.options.apiKey}`).toString('base64')}`,
        },
        body,
      },
    );
    console.log(response.body);
  }
}
