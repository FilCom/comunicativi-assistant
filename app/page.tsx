'use client';

import { useEffect, useRef, useState } from 'react';
import { startThread, sendMessage } from '@/utils/assistant';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faRobot } from '@fortawesome/free-solid-svg-icons';

interface Message {
	text: string;
	role: string;
}

export default function Home() {
	const textAreaRef = useRef<HTMLTextAreaElement>(null);

	const [loading, setLoading] = useState(true);
	const [threadId, setThreadId] = useState<string>();
	const [messages, setMessages] = useState<Array<Message>>([]);

	async function handleFormSubmit(event?: React.FormEvent<HTMLFormElement>) {
		if (event) {
			event.preventDefault();
		}

		if (!threadId || !textAreaRef || !textAreaRef.current || !textAreaRef.current.value) {
			return;
		}

		const message = textAreaRef.current.value;

		// Store user message
		setMessages((oldArr) => {
			const arr = [...oldArr];
			arr.push({
				text: message,
				role: 'user'
			});
			return arr;
		});

		// Clear textarea
		textAreaRef.current.value = '';

		setLoading(true);

		const responseMessage = await sendMessage(threadId, message);

		// Store assistant message
		setMessages((oldArr) => {
			const arr = [...oldArr];
			arr.push({
				text: responseMessage,
				role: 'assistant'
			});
			return arr;
		});

		setLoading(false);
	}

	useEffect(() => {
		startThread().then((threadId) => {
			setThreadId(threadId);
			setLoading(false);
		});
	}, []);

	return (
		<div className='mx-auto flex h-screen max-w-screen-lg flex-col justify-between gap-2 px-4 text-white'>
			<h1 className='pb-1 pt-2 text-center text-lg font-medium'>Assistente Comunicativi</h1>
			{/* Chat */}
			<div className='grow overflow-auto'>
				{messages.map((item, i) => (
					<div key={i} className='mb-6'>
						<div className='flex gap-2'>
							<div className='w-[32px]'>
								<FontAwesomeIcon icon={item.role === 'user' ? faUser : faRobot} className='fa-fw mt-0.5 text-xl' />
							</div>
							<div className='grow'>
								<p className='text-lg font-medium'>{item.role === 'user' ? 'You' : 'Assistant'}</p>
								<div>{item.text}</div>
							</div>
						</div>
					</div>
				))}
				{loading && (
					<div className='flex w-full justify-center py-2'>
						<span className='loader'></span>
					</div>
				)}
			</div>
			{/* Input */}
			<div className='pb-2 pt-4'>
				<form onSubmit={handleFormSubmit} className='items-stetch mb-2 flex gap-2'>
					<textarea
						ref={textAreaRef}
						className='w-full grow resize-none overflow-hidden rounded-md border border-gray-600 bg-background px-2 py-1'
						rows={1}
						placeholder='Scrivi un messaggio...'
					></textarea>
					<button type='submit' className='rounded-md bg-primary px-4 py-2 text-white'>
						Invia
					</button>
				</form>
				<p className='text-xs'>Thread ID: {threadId}</p>
			</div>
		</div>
	);
}
