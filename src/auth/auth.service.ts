import { Inject, Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { PRIVATE_KEY } from './auth.constants';

@Injectable()
export class AuthService {
  constructor(@Inject(PRIVATE_KEY) private readonly privateKey: string) {}

  sign(payload: object): string {
    return jwt.sign(payload, this.privateKey);
  }
}
