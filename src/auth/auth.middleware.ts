import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { NextFunction } from 'express';
import { AUTH_HEADER, AUTH_MEMBER } from './auth.constants';
import { AuthService } from './auth.service';
import { MemberService } from 'src/member/member.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private readonly authService: AuthService,
    private readonly memberService: MemberService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    if (!(AUTH_HEADER in req.headers)) {
      next();
      return;
    }
    try {
      const memberId = this.authService.verify(
        req.headers[AUTH_HEADER] as string,
      ).id;
      req[AUTH_MEMBER] = await this.memberService.findById(memberId);
    } catch (e) {
      console.error(e);
      throw new UnauthorizedException(e);
    }
    next();
  }
}
