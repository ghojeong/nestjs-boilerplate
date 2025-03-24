import { Test } from '@nestjs/testing';
import { MailService } from './mail.service';
import { CONFIG_OPTIONS } from 'src/common/common.constants';

jest.mock('got', () => {
  return {
    default: jest.fn(),
  };
});
jest.mock('form-data', () => {
  return class {
    append() {}
  };
});

const options = {
  apiKey: 'TEST_API_KEY',
  domainName: 'TEST_DOMAIN_NAME',
};

describe('MailService', () => {
  let service: MailService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        MailService,
        {
          provide: CONFIG_OPTIONS,
          useValue: options,
        },
      ],
    }).compile();
    service = module.get(MailService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('sendVerificationEmail', () => {
    it('sendEmail 을 호출해야한다.', () => {
      const sendVerificationEmailArgs = {
        email: 'test@email.com',
        code: 'TEST_CODE',
      };
      jest.spyOn(service, 'sendEmail').mockImplementation(async () => {});
      service.sendVerificationEmail(
        sendVerificationEmailArgs.email,
        sendVerificationEmailArgs.email,
        sendVerificationEmailArgs.code,
      );
      expect(service.sendEmail).toHaveBeenCalledTimes(1);
      expect(service.sendEmail).toHaveBeenCalledWith(
        'test@email.com',
        'Verify Your Email',
        'verify-email',
        [
          { key: 'memberName', value: 'test@email.com' },
          { key: 'code', value: 'TEST_CODE' },
        ],
      );
    });
  });
});
