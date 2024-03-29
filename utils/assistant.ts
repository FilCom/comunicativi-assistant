export async function startThread() {
	const response = await fetch(`/api/openai/start`, {
		cache: 'no-store',
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json'
		}
	});
	const { threadId } = await response.json();
	return threadId;
}

export async function sendMessage(threadId: string, message: string) {
	const response = await fetch(`/api/openai/message`, {
		cache: 'no-store',
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json'
		},
		body: JSON.stringify({ threadId, message })
	});
	const data = await response.json();
	return data.message;
}
