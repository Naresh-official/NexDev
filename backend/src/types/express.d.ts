import { ApiResponse } from "../middlewares/apiResponseHandler.middleware";

declare global {
	namespace Express {
		interface Response {
			sendResponse: (response: ApiResponse) => void;
		}
		interface Request {
			user?: {
				id: string;
			};
		}
	}
}
