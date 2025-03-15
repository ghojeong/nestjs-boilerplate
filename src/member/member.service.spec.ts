import { Test } from '@nestjs/testing';
import { MemberService } from './member.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Member } from './entity/member.entity';
import { AuthService } from 'src/auth/auth.service';
import { ObjectLiteral, Repository } from 'typeorm';

type MockRepository<Entity extends ObjectLiteral> = Partial<
  Record<keyof Repository<Entity>, jest.Mock>
>;

describe('UserService', () => {
  let memberService: MemberService;
  let memberRepository: MockRepository<Member>;

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
            save: jest.fn(),
          },
        },
        {
          provide: AuthService,
          useValue: {
            signin: jest.fn(),
            verify: jest.fn(),
          },
        },
      ],
    }).compile();
    memberService = module.get(MemberService);
    memberRepository = module.get(getRepositoryToken(Member));
  });

  it('should be defined', () => {
    expect(memberService).toBeDefined();
  });

  describe('createMember', () => {
    const newMember = {
      email: 'new@email.com',
      password: 'pwd',
    };
    it('회원가입에 성공한다.', async () => {
      // given: 가입되어 있지 않았다.
      memberRepository.exists?.mockResolvedValue(false);

      // when: 회원가입을 시도한다.
      const result = await memberService.createMember(newMember);

      // then: 회원가입에 성공한다.
      expect(memberRepository.save).toHaveBeenCalledTimes(1);
      expect(memberRepository.create).toHaveBeenCalledTimes(1);
      expect(memberRepository.create).toHaveBeenCalledWith(newMember);
      expect(result).toMatchObject({ ok: true });
    });

    it('이미 가입되었다면 실패한다.', async () => {
      // given: 이미 가입이 되어있다.
      memberRepository.exists?.mockResolvedValue(true);

      // when: 회원가입을 시도한다.
      const result = await memberService.createMember(newMember);

      // then: 회원가입을 실패한다.
      expect(result).toMatchObject({
        ok: false,
        error: '이미 존재하는 계정입니다.',
      });
    });
  });

  it.todo('createMember');
  it.todo('login');
  it.todo('findById');
  it.todo('editProfile');
});
