const tripsByUserId = 'SELECT * FROM Trips WHERE user_id = ? LEFT JOIN Users on Trips.user_id = Users.user_id LIMIT = ?';
const tripsByTripId = 'SELECT * FROM Trips WHERE trip_id = ? LEFT JOIN Users on Trips.user_id = Users.user_id';
const tripsByDestination = 'SELECT * FROM Trips LEFT JOIN Users on Trips.user_id = Users.user_id WHERE to = ? LIMIT = ?';
const tripsBySource = 'SELECT * FROM Trips LEFT JOIN Users on Trips.user_id = Users.user_id WHERE from = ? LIMIT = ?';
const recentTrips = 'SELECT * FROM Trips LEFT JOIN Users on Trips.user_id = Users.user_id ORDER BY Trips.posted_on DESC LIMIT 10';

const fetchTripsByUserId = async (env: Env, params: (string | number)[] = []) => {
	return await env.DB.prepare(tripsByUserId)
		.bind(...params)
		.run<TripRowWithUser>();
};

const fetchTripsByTripId = async (env: Env, params: string[] = []) => {
	return await env.DB.prepare(tripsByTripId)
		.bind(...params)
		.run<TripRowWithUser>();
};

const fetchTripsByDestination = async (env: Env, params: string[] = []) => {
	return await env.DB.prepare(tripsByDestination)
		.bind(...params)
		.run<TripRowWithUser>();
};

const fetchTripsByStartPoint = async (env: Env, params: string[] = []) => {
	return await env.DB.prepare(tripsBySource)
		.bind(...params)
		.run<TripRowWithUser>();
};
const fetchRecentTrips = async (env: Env, params: string[] = []) => {
	return await env.DB.prepare(recentTrips)
		.bind(...params)
		.run<TripRowWithUser>();
};

export default { fetchTripsByUserId, fetchTripsByDestination, fetchTripsByTripId, fetchTripsByStartPoint, fetchRecentTrips };
