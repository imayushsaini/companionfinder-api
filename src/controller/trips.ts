import create_trip from '../db/queries/trips/create_trip';
import fetch_trips from '../db/queries/trips/fetch_trips';
import { parseTripData, stringifyTripData, validator } from '../db/queries/trips/handler';
import { decorateResponse, status } from '../utils/reponse';

const DEFAULT_MAX_RESULTS = 10;
const tripsHandler = async (env: Env, request: Request, payload: FirebasePayload | undefined): Promise<Response> => {
	const { searchParams } = new URL(request.url);
	if (request.method == 'GET') {
		const trip_id = searchParams.get('trip_id');
		const user_id = searchParams.get('user_id'); // TODO add a check to validate user Id from JWT.
		const count = searchParams.get('count') ? Number(searchParams.get('count')) : DEFAULT_MAX_RESULTS;
		if (trip_id) {
			const trip = (await fetch_trips.fetchTripsByTripId(env, [trip_id])).results[0];
			return decorateResponse(request, trip ? parseTripData(trip) : {}, 200);
		} else if (user_id) {
			return decorateResponse(
				request,
				(await fetch_trips.fetchTripsByUserId(env, [user_id, count])).results.map((result) => {
					return parseTripData(result);
				}),
				200
			);
		} else {
			return decorateResponse(
				request,
				(await fetch_trips.fetchRecentTrips(env)).results.map((result) => {
					return parseTripData(result);
				}),
				200
			);
		}
	}
	if (request.method == 'POST' && payload) {
		const user_id = payload.user_id;
		const tripDetails = parseTripData(await request.json());
		tripDetails.user_id = user_id;
		try {
			validator(tripDetails);
		} catch (error) {
			return decorateResponse(request, { status: status.SUCCESSS }, 400);
		}
		const result = await create_trip.createTrip(env, stringifyTripData(tripDetails));

		if (result.success) {
			return decorateResponse(request, { status: status.SUCCESSS, message: 'Trip Created', trip_id: result.results[0].trip_id }, 201);
		} else {
			return decorateResponse(request, { status: status.FAILED }, 500);
		}
	}
	return decorateResponse(request, {}, 400);
};

export default tripsHandler;
