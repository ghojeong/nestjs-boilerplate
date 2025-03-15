import { Test } from '@nestjs/testing';
import { MemberService } from './member.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Member } from './entity/member.entity';
import { AuthService } from 'src/auth/auth.service';

const mockMemberRepository = {
  findOne: jest.fn(),
  save: jest.fn(),
  create: jest.fn(),
};

const mockAuthService = {
  signin: jest.fn(),
  verify: jest.fn(),
};

describe('UserService', () => {
  let service: MemberService;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      providers: [
        MemberService,
        {
          provide: getRepositoryToken(Member),
          useValue: mockMemberRepository,
        },
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
      ],
    }).compile();
    service = module.get<MemberService>(MemberService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it.todo('createMember');
  it.todo('login');
  it.todo('findById');
  it.todo('editProfile');
});
