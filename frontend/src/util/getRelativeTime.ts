export function getRelativeTime(date: Date): string {
	const now = new Date();
	const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

	if (diffInSeconds < 60) {
		return `${diffInSeconds}s ago`;
	}

	const diffInMinutes = Math.floor(diffInSeconds / 60);
	if (diffInMinutes < 60) {
		return `${diffInMinutes} min ago`;
	}

	const diffInHours = Math.floor(diffInMinutes / 60);
	if (diffInHours < 24) {
		return `${diffInHours} hr ago`;
	}

	const diffInDays = Math.floor(diffInHours / 24);
	if (diffInDays < 30) {
		return `${diffInDays} day ago`;
	}

	const diffInMonths = Math.floor(diffInDays / 30);
	if (diffInMonths < 12) {
		return `${diffInMonths} month ago`;
	}

	const diffInYears = Math.floor(diffInMonths / 12);
	return `${diffInYears} year ago`;
}

export function getResponseTime(userMessageDate: Date, aiMessageDate: Date) {
	const diffInSeconds = Math.floor(
		(aiMessageDate.getTime() - userMessageDate.getTime()) / 1000
	);
	if (diffInSeconds < 60) {
		return `${diffInSeconds}s`;
	}

	const diffInMinutes = Math.floor(diffInSeconds / 60);
	if (diffInMinutes < 60) {
		return `${diffInMinutes} min`;
	}
}
