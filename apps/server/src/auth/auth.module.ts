import { Module } from '@nestjs/common';
import { TotpModule } from './totp/totp.module';
import { OauthModule } from './oauth/oauth.module';
import { AuthController } from './auth.controller';

@Module({
  imports: [TotpModule, OauthModule],
  controllers: [AuthController]
})
export class AuthModule {}
