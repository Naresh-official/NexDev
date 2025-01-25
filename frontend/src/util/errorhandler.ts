import axios from "axios";

export const handleError = (error: unknown) => {
	if (axios.isAxiosError(error)) {
		console.log(error?.response?.data?.error || error?.message);
		return error?.response?.data?.error || error?.message;
	} else if (error instanceof Error) {
		console.log(error?.message);
		return error?.message;
	} else {
		console.log(error);
		return error;
	}
};
