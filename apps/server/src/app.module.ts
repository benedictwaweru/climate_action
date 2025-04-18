import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { AppController } from "@/app.controller";
import { AppService } from "@/app.service";
import { MpesaModule } from "@/payments/mpesa/mpesa.module";
import { AuthModule } from "@/auth/auth.module";
import { UsersModule } from "@/users/users.module";
import { DatabasesModule } from "@/databases/databases.module";

@Module({
	imports: [
		ConfigModule.forRoot(),
		MpesaModule,
		AuthModule,
		UsersModule,
		DatabasesModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
