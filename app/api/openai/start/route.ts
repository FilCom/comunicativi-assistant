import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: Request) {
	let thread;
	try {
		thread = await openai.beta.threads.create();
	} catch (error) {
		return Response.json({ error: 'Unable to create thread' }, { status: 409 });
	}
	return Response.json({ threadId: thread.id });
}
