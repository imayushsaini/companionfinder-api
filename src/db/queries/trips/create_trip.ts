const query = `INSERT INTO Trips (
    user_id,
    trip_id,
    title,
    startDate,
    endDate,
    from_location,
    to_location,
    itinerary,
    contactDetails,
	additional_info,
    bannerUrl,
	posted_on
)  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  RETURNING trip_id`;

const createTrip = async (env: Env, trip: TripRow) => {
	return await env.DB.prepare(query)
		.bind(
			trip.user_id,
			crypto.randomUUID(), // Generate a unique ID
			trip.title,
			trip.startDate,
			trip.endDate,
			trip.from_location,
			trip.to_location,
			trip.itinerary,
			trip.contactDetails,
			trip.additional_info,
			trip.bannerUrl,
			new Date().toISOString() // trip posted on current date
		)
		.run();
};

export default { createTrip };
