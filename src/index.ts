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

export default {
	async fetch(request, env, ctx): Promise<Response> {
		const { pathname } = new URL(request.url);
		if (pathname === '/api/user') {
			const res = await update_users.updateProfile(env, ['1234', 'hello new 2']);
			console.log(res);
		}
		return new Response('Hello World!');
	},
} satisfies ExportedHandler<Env>;
