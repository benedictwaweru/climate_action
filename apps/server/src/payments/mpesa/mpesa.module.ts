import { Module } from "@nestjs/common";
import { MpesaController } from "./mpesa.controller";
import { MpesaService } from "@/payments/mpesa/mpesa.service";

@Module({
	controllers: [MpesaController],
	providers: [MpesaService],
})
export class MpesaModule {}
