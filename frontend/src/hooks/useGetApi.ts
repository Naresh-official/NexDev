import { useState, useEffect } from "react";
import axios from "axios";
import { handleError } from "@/util/errorhandler";

export function useGetApi<T>(url: string) {
	const [data, setData] = useState<T | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		const fetchData = async () => {
			try {
				console.log(process.env.NEXT_PUBLIC_BACKEND_URL, url);
				const response = await axios.get(
					`${process.env.NEXT_PUBLIC_BACKEND_URL as string}${url}`,
					{
						withCredentials: true,
					}
				);
				if (!response?.data?.error) {
					setData(response.data.data as T);
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

		if (url) {
			fetchData();
		}
	}, [url]);

	return { data, error, loading };
}
