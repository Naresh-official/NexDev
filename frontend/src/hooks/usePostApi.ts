import { useState } from "react";
import axios from "axios";
import { handleError } from "@/util/errorhandler";

export function usePostApi<T, R = any>() {
	const [data, setData] = useState<R | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState<boolean>(false);

	const postData = async (url: string, payload: T) => {
		setLoading(true);
		setError(null);

		try {
			const response = await axios.post(
				`${process.env.NEXT_PUBLIC_BACKEND_URL as string}${url}`,
				payload,
				{
					withCredentials: true,
				}
			);
			if (!response?.data?.error) {
				setData(response.data.data as R);
			} else {
				setError(response.data.error || "Unknown error");
			}
		} catch (err: unknown) {
			console.log(err);
			setError(handleError(err));
		} finally {
			setLoading(false);
		}
	};

	return { data, error, loading, postData };
}
