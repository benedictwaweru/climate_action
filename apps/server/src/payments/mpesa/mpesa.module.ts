import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { MpesaController } from "@/payments/mpesa/mpesa.controller";
import { MpesaService } from "@/payments/mpesa/mpesa.service";

@Module({
	imports: [ConfigModule],
	controllers: [MpesaController],
	providers: [MpesaService],
})
export class MpesaModule {}
