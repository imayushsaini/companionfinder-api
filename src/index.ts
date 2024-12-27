/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Bind resources to your worker in `wrangler.toml`. After adding bindings, a type definition for the
 * `Env` object can be regenerated with `npm run cf-typegen`.
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

import update_users from './db/queries/users/update_users';
import { getJwtToken, validateToken } from './middleware/auth';

export default {
	async fetch(request, env, ctx): Promise<Response> {
		let payload: FirebasePayload | undefined = undefined;
		const { pathname } = new URL(request.url);
		const token = getJwtToken(request);
		if (token) {
			try {
				payload = await validateToken(token);
			} catch {
				return new Response('Unauthorized');
			}
		}
		if (pathname === '/api/user' && payload) {
			const input = (await request.json()) as Record<string, string>;
			const aboutUser: string | undefined = input['about'];
			if (aboutUser) {
				await update_users.updateProfile(env, [payload?.user_id, aboutUser]);
				return new Response(`About updated to ${aboutUser} for userId ${payload?.user_id}`);
			}
		}
		return new Response('Not logged in');
	},
} satisfies ExportedHandler<Env>;
