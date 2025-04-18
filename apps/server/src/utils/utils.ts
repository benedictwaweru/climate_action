// ---------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------

import argon2 from "argon2";

export const hash = async (data: string): Promise<string> => {
	return await argon2.hash(data, {
		type: argon2.argon2id,
		timeCost: 3,
		memoryCost: 2 ** 16,
		parallelism: 2,
	});
};

export const verify = async (hash: string, data: string): Promise<boolean> => {
	return await argon2.verify(hash, data);
};
