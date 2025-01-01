const query = `INSERT INTO Trip (
    user_id,
    trip_id,
    title,
    startDate,
    endDate,
    from_location,
    to_location,
    itinerary,
    contactDetails,
    bannerUrl
)  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

const createTrip = async (env: Env, trip: TripRow) => {
	const trip_id = crypto.randomUUID(); // Generate a unique ID
	return await env.DB.prepare(query)
		.bind(
			trip.user_id,
			trip_id,
			trip.title,
			trip.startDate,
			trip.endDate,
			trip.from_location,
			trip.to_location,
			trip.itinerary,
			trip.contactDetails,
			trip.bannerUrl
		)
		.run();
};

export default { createTrip };
