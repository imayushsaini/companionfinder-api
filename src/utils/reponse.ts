import { handleCors } from '../middleware/cors';
export enum status {
	SUCCESSS = 'success',
	FAILED = 'failed',
}
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
