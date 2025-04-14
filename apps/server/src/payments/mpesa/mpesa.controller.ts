import { Controller, Get } from "@nestjs/common";
import { MpesaService } from "@/payments/mpesa/mpesa.service";

/**
 * @class
 */
@Controller("mpesa")
export class MpesaController {
	constructor(private readonly mpesaService: MpesaService) {}

	@Get()
	getMpesaKeys() {
		const mpesaConsumerKey = this.mpesaService.getMPesaConsumerKey();
		// eslint-disable-next-line prettier/prettier
		const mpesaConsumerSecretKey = this.mpesaService.getMPesaConsumerSecretKey();

		return { mpesaConsumerKey, mpesaConsumerSecretKey };
	}
}
