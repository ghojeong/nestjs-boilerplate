import { Inject, Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { PRIVATE_KEY } from './auth.constants';
import { AuthPayload } from './auth.interface';

@Injectable()
export class AuthService {
  constructor(@Inject(PRIVATE_KEY) private readonly privateKey: string) {}

  sign(memberId: number): string {
    const payload: AuthPayload = { id: memberId };
    return jwt.sign(payload, this.privateKey);
  }

  verify(token: string): AuthPayload {
    return jwt.verify(token, this.privateKey) as AuthPayload;
  }
}
