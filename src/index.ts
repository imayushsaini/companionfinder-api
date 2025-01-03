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

import tripsHandler from './controller/trips';
import fetch_users from './db/queries/users/fetch_users';
import update_users from './db/queries/users/update_users';
import { getJwtToken, validateToken } from './middleware/auth';
import { handleCors } from './middleware/cors';
import { decorateResponse } from './utils/reponse';

export default {
	async fetch(request, env, ctx): Promise<Response> {
		if (request.method == 'OPTIONS') {
			return handleCors(request, new Response());
		}
		let payload: FirebasePayload | undefined = undefined;
		const { pathname, searchParams } = new URL(request.url);
		const token = getJwtToken(request);
		if (token) {
			try {
				payload = await validateToken(token);
			} catch (error) {
				console.log(error);
				return decorateResponse(request, {}, 401);
			}
		}
		if (pathname === '/api/user' && payload) {
			if (request.method == 'POST') {
				const input = (await request.json()) as Record<string, string>;
				const aboutUser: string | undefined = input['about'];
				if (aboutUser) {
					const result = await update_users.updateProfile(env, [payload?.user_id, aboutUser]);
					if (result.success) {
						return decorateResponse(request, { success: true, message: 'Record updated' }, 200);
					} else {
						return decorateResponse(request, { success: false, message: 'No update' }, 500);
					}
				}
			} else if (request.method == 'GET') {
				const userProfile = await fetch_users.fetchProfile(env, [payload?.user_id]);

				return decorateResponse(request, userProfile.results[0], 200);
			}
		}
		if (pathname === '/api/trips') {
			return await tripsHandler(env, request, payload);
		}
		return decorateResponse(request, {}, 401);
	},
} satisfies ExportedHandler<Env>;
