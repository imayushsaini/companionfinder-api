import fetch_trips from '../db/queries/trips/fetch_trips';
import { parseTripData } from '../db/queries/trips/handler';
import { decorateResponse } from '../utils/reponse';

const DEFAULT_MAX_RESULTS = 10;
const tripsHandler = async (env: Env, request: Request): Promise<Response> => {
	const { searchParams } = new URL(request.url);
	if (request.method == 'GET') {
		const trip_id = searchParams.get('trip_id');
		const user_id = searchParams.get('user_id'); // TODO add a check to validate user Id from JWT.
		const count = searchParams.get('count') ? Number(searchParams.get('count')) : DEFAULT_MAX_RESULTS;
		if (trip_id) {
			return decorateResponse(request, parseTripData((await fetch_trips.fetchTripsByTripId(env, [trip_id])).results[0]), 200);
		} else if (user_id) {
			return decorateResponse(
				request,
				(await fetch_trips.fetchTripsByUserId(env, [user_id, count])).results.map((result) => {
					return parseTripData(result);
				}),
				200
			);
		}
	}
	return decorateResponse(request, new Response(), 400);
};

export default tripsHandler;
