import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import axios from "axios";

interface MpesaTokenResponse {
	access_token: string;
}

/**
 * @class - This class handles the business logic, data access of payment with MPesa
 */
@Injectable()
export class MpesaService {
	constructor(private configService: ConfigService) {}

	getMPesaConsumerKey(): string {
		return this.configService.get<string>("MPESA_CONSUMER_KEY")!;
	}

	getMPesaConsumerSecretKey(): string {
		return this.configService.get<string>("MPESA_CONSUMER_SECRET_KEY")!;
	}

	getMPesaBaseURL(): string {
		return this.configService.get<string>("MPESA_BASE_URL")!;
	}

	getMPesaShortCode(): string {
		return this.configService.get<string>("MPESA_SHORT_CODE")!;
	}

	private getAuthCredentials(): string {
		const consumerKey = this.getMPesaConsumerKey();
		const consumerSecretKey = this.getMPesaConsumerSecretKey();

		return Buffer.from(`${consumerKey}${consumerSecretKey}`).toString("base64");
	}

	async getAuthToken(): Promise<string> {
		const auth = this.getAuthCredentials();
		const response = await axios.get<MpesaTokenResponse>(
			`${this.getMPesaBaseURL()}/oauth/v1/generate?grant_type=client_credentials`,
			{
				headers: { Authorization: `Basic ${auth}` },
			},
		);

		return response.data.access_token;
	}

	/**
	 * @method initiateSTKPush - Implement this STK push with axios.
	 * Interacts with @url {/mpesa/stkpush/v1/processrequest}
	 */
	async initiateSTKPush(): Promise<void> {
		//const authToken = await this.getAuthToken();
	}

	async reverseMPesaTransaction(): Promise<void> {}
}
