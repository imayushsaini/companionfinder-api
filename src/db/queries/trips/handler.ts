const formatTripData = (rawData: Trip): TripRow => {
	return {
		user_id: rawData.user_id,
		trip_id: rawData.trip_id,
		title: rawData.title,
		startDate: typeof rawData.startDate === 'string' ? rawData.startDate : rawData.startDate.toISOString(),
		endDate: typeof rawData.endDate === 'string' ? rawData.endDate : rawData.endDate.toISOString(),
		from_location: rawData.from_location,
		to_location: rawData.to_location,
		itinerary: Array.isArray(rawData.itinerary) ? JSON.stringify(rawData.itinerary) : rawData.itinerary,
		contactDetails: rawData.contactDetails,
		bannerUrl: Array.isArray(rawData.bannerUrl) ? JSON.stringify(rawData.bannerUrl) : rawData.bannerUrl,
	};
};

const parseTripData = (rawData: TripRow): Trip | {} => {
	if (!rawData) {
		return {};
	}
	return {
		user_id: rawData.user_id,
		trip_id: rawData.trip_id,
		title: rawData.title,
		startDate: new Date(rawData.startDate), // Convert ISO 8601 string to Date object
		endDate: new Date(rawData.endDate), // Convert ISO 8601 string to Date object
		from_location: rawData.from_location,
		to_location: rawData.to_location,
		itinerary: JSON.parse(rawData.itinerary), // Parse JSON string to array
		contactDetails: rawData.contactDetails,
		bannerUrl: JSON.parse(rawData.bannerUrl), // Parse JSON string to array
	};
};

export { parseTripData, formatTripData };
