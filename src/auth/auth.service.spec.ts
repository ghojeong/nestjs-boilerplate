import { Test } from '@nestjs/testing';
import * as jwt from 'jsonwebtoken';
import { AuthService } from './auth.service';
import { PRIVATE_KEY } from './auth.constant';

const MEMBER_ID = 1;
const TEST_PRIVATE = 'test-private-key';
const TEST_TOKEN = 'test-token';
jest.mock('jsonwebtoken', () => {
  return {
    sign: jest.fn(() => TEST_TOKEN),
    verify: jest.fn(() => ({ id: MEMBER_ID })),
  };
});

describe('AuthService', () => {
  let authService: AuthService;

  beforeEach(async () => {
    const module = Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: PRIVATE_KEY,
          useValue: TEST_PRIVATE,
        },
      ],
    }).compile();
    authService = (await module).get(AuthService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  describe('sign', () => {
    it('토큰을 반환한다.', () => {
      const token = authService.sign(MEMBER_ID);

      expect(token).toEqual(TEST_TOKEN);
      expect(jwt.sign).toHaveBeenCalledTimes(1);
      expect(jwt.sign).toHaveBeenCalledWith({ id: MEMBER_ID }, TEST_PRIVATE);
    });
  });

  describe('verify', () => {
    it('토큰을 디코딩한다.', () => {
      const decoded = authService.verify(TEST_TOKEN);
      expect(decoded).toEqual({ id: MEMBER_ID });
      expect(jwt.verify).toHaveBeenCalledTimes(1);
      expect(jwt.verify).toHaveBeenCalledWith(TEST_TOKEN, TEST_PRIVATE);
    });
  });
});
