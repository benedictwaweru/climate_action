import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from '@/app.controller';
import { AppService } from '@/app.service';
import { MpesaModule } from '@/payments/mpesa/mpesa.module';
import { AuthModule } from '@/users/auth/auth.module';
import { UsersModule } from '@/users/users.module';

@Module({
	imports: [ConfigModule.forRoot(), MpesaModule, AuthModule, UsersModule],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
