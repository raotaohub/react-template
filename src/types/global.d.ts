declare global {
	namespace NodeJS {
		interface Process {
			IS_DEV: boolean;
		}
	}
}

export {};
