import {
	ArgumentMetadata,
	BadRequestException,
	Injectable,
	PipeTransform,
} from "@nestjs/common";

@Injectable()
export class MpesaPipe implements PipeTransform {
	transform(value: string, metadata: ArgumentMetadata) {
		if (!this.validatePhoneNumber(value)) {
			throw new BadRequestException();
		}

		return value;
	}

	validatePhoneNumber(phoneNumber: string): boolean {
		const cleanedPhoneNumber = phoneNumber.replace(/\D/g, "");

		return /^(\|254|0)(1\d{8}|7\d{8})$/.test(cleanedPhoneNumber);
	}
}
