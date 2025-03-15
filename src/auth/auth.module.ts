import { DynamicModule, Global, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthModuleOptions } from './auth.interface';
import { PRIVATE_KEY } from './auth.constants';

@Global()
@Module({})
export class AuthModule {
  static forRoot(options: AuthModuleOptions): DynamicModule {
    return {
      module: AuthModule,
      providers: [
        {
          provide: PRIVATE_KEY,
          useValue: options.privateKey,
        },
        AuthService,
      ],
      exports: [AuthService],
    };
  }
}
