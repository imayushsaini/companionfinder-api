import { handleCors } from '../middleware/cors';

const decorateResponse = (request: Request, response: any, status: number) => {
	return handleCors(
		request,
		new Response(JSON.stringify(response), {
			headers: { 'Content-Type': 'application/json' },
			status: status,
		})
	);
};

export { decorateResponse };
