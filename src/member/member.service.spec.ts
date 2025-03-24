import { Test } from '@nestjs/testing';
import { MemberService } from './member.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Member } from './entity/member.entity';
import { AuthService } from 'src/auth/auth.service';
import { ObjectLiteral, Repository } from 'typeorm';
import { Verification } from './entity/verification.entity';
import { MailService } from 'src/mail/mail.service';

type MockRepository<Entity extends ObjectLiteral> = Partial<
  Record<keyof Repository<Entity>, jest.Mock>
>;

jest.mock('got', () => {
  return {
    default: jest.fn(),
  };
});
jest.mock('form-data', () => {
  return class {};
});

const NEW_MEMBER = {
  email: 'new@email.com',
  password: 'pwd',
};

describe('UserService', () => {
  let memberService: MemberService;
  let memberRepository: MockRepository<Member>;
  let verificationRepository: MockRepository<Verification>;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        MemberService,
        {
          provide: getRepositoryToken(Member),
          useValue: {
            exists: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
            save: jest.fn(() => NEW_MEMBER),
          },
        },
        {
          provide: getRepositoryToken(Verification),
          useValue: {
            findOne: jest.fn(),
            create: jest.fn(),
            save: jest.fn(() => ({
              code: 'TEST_CODE',
            })),
            delete: jest.fn(),
          },
        },
        {
          provide: AuthService,
          useValue: {
            signin: jest.fn(),
            verify: jest.fn(),
          },
        },
        {
          provide: MailService,
          useValue: {
            sendVerificationEmail: jest.fn(),
          },
        },
      ],
    }).compile();
    memberService = module.get(MemberService);
    memberRepository = module.get(getRepositoryToken(Member));
    verificationRepository = module.get(getRepositoryToken(Verification));
  });

  it('should be defined', () => {
    expect(memberService).toBeDefined();
  });

  describe('createMember', () => {
    it('회원가입에 성공한다.', async () => {
      // given: 가입되어 있지 않았다.
      memberRepository.exists?.mockResolvedValue(false);

      // when: 회원가입을 시도한다.
      const result = await memberService.createMember(NEW_MEMBER);

      // then: 회원가입에 성공한다.
      expect(memberRepository.save).toHaveBeenCalledTimes(1);
      expect(memberRepository.create).toHaveBeenCalledTimes(1);
      expect(memberRepository.create).toHaveBeenCalledWith(NEW_MEMBER);
      expect(result).toMatchObject({ ok: true });

      expect(verificationRepository.save).toHaveBeenCalledTimes(1);
      expect(verificationRepository.create).toHaveBeenCalledTimes(1);
      expect(verificationRepository.create).toHaveBeenCalledWith({
        member: NEW_MEMBER,
      });
    });

    it('이미 가입되었다면 실패한다.', async () => {
      // given: 이미 가입이 되어있다.
      memberRepository.exists?.mockResolvedValue(true);

      // when: 회원가입을 시도한다.
      const result = await memberService.createMember(NEW_MEMBER);

      // then: 회원가입을 실패한다.
      expect(result).toMatchObject({
        ok: false,
        error: '이미 존재하는 계정입니다.',
      });
    });
  });

  it.todo('login');
  it.todo('findById');
  it.todo('editProfile');
});
