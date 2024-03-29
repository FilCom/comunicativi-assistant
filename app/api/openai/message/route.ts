import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: Request) {
	const { message, threadId } = await req.json();

	let thread;

	try {
		thread = await openai.beta.threads.retrieve(threadId);
	} catch (error) {
		return Response.json({ error: 'Thread not found' }, { status: 404 });
	}

	await openai.beta.threads.messages.create(thread.id, {
		role: 'user',
		content: message
	});

	// Create run
	let run = await openai.beta.threads.runs.create(thread.id, { assistant_id: process.env.ASSISTANT_ID });

	// Pooling response
	while (['queued', 'in_progress', 'cancelling'].includes(run.status)) {
		await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait for 1 second
		run = await openai.beta.threads.runs.retrieve(run.thread_id, run.id);
	}

	// Get the message
	if (run.status === 'completed') {
		const messages = await openai.beta.threads.messages.list(run.thread_id);
		for (const message of messages.data) {
			if (message.content[0].type === 'text') {
				return Response.json({
					message: message.content[0].text.value
				});
			}
		}
	} else {
		console.log(run.status);
	}

	return Response.json({ error: 'Sometihng went wrong' }, { status: 400 });
}
