import axios from "axios";

export const handleError = (error: unknown) => {
	if (axios.isAxiosError(error)) {
		console.log(error?.response?.data?.error);
		return error?.response?.data?.error;
	} else if (error instanceof Error) {
		console.log(error?.message);
		return error?.message;
	} else {
		console.log(error);
		return error;
	}
};
