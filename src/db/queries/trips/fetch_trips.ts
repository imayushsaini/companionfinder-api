const tripsByUserId = 'SELECT * FROM Trips WHERE user_id = ? LIMIT = ?';
const tripsByTripId = 'SELECT * FROM Trips WHERE trip_id = ?';
const tripsByDestination = 'SELECT * FROM Trips WHERE to = ? LIMIT = ?';
const tripsBySource = 'SELECT * FROM Trips WHERE from = ? LIMIT = ?';

const fetchTripsByUserId = async (env: Env, params: (string | number)[] = []) => {
	return await env.DB.prepare(tripsByUserId)
		.bind(...params)
		.run<TripRow>();
};

const fetchTripsByTripId = async (env: Env, params: string[] = []) => {
	return await env.DB.prepare(tripsByTripId)
		.bind(...params)
		.run<TripRow>();
};

const fetchTripsByDestination = async (env: Env, params: string[] = []) => {
	return await env.DB.prepare(tripsByDestination)
		.bind(...params)
		.run<TripRow>();
};

const fetchTripsByStartPoint = async (env: Env, params: string[] = []) => {
	return await env.DB.prepare(tripsBySource)
		.bind(...params)
		.run<TripRow>();
};

export default { fetchTripsByUserId, fetchTripsByDestination, fetchTripsByTripId, fetchTripsByStartPoint };
