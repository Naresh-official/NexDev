class ApiError extends Error {
	statusCode: number;
	errors: Array<any>;
	constructor(message = "Something went wrong", statusCode = 500) {
		super(message);
		this.statusCode = statusCode;
		this.message = message;
		this.errors = [];
	}

	status(statusCode: number) {
		this.statusCode = statusCode;
		return this;
	}
}

export { ApiError };
