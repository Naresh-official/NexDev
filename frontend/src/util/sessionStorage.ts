export function setSessionStorage(key: string, value: string, ttl: number) {
	// ttl in ms
	const expiryAt = Date.now() + ttl;
	const data = JSON.stringify({ value, expiryAt });
	sessionStorage.setItem(key, data);
}

export function getSessionStorage(key: string) {
	const data = sessionStorage.getItem(key);
	if (!data) return null;
	const { value, expiryAt } = JSON.parse(data);
	if (Date.now() > expiryAt) {
		sessionStorage.removeItem(key);
		return null;
	}
	return value;
}
