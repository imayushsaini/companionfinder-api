const stringifyTripData = (rawData: Trip): TripRow => {
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
		posted_on: typeof rawData.posted_on === 'string' ? rawData.posted_on : rawData.posted_on.toISOString(),
	};
};

const parseTripData = (rawData: TripRow): Trip => {
	return {
		user_id: String(rawData.user_id),
		trip_id: String(rawData.trip_id),
		title: String(rawData.title),
		startDate: new Date(rawData.startDate), // Convert ISO 8601 string to Date object
		endDate: new Date(rawData.endDate), // Convert ISO 8601 string to Date object
		from_location: String(rawData.from_location),
		to_location: String(rawData.to_location),
		itinerary: processItinerary(rawData.itinerary), // Parse JSON string to array
		contactDetails: String(rawData.contactDetails),
		bannerUrl: processItinerary(rawData.bannerUrl), // Parse JSON string to array
		posted_on: new Date(rawData.startDate), // Convert ISO 8601 string to Date object
	};
};

function processItinerary(itinerary: any): string[] {
	if (Array.isArray(itinerary)) {
		// If it's already an array, convert all elements to strings
		return itinerary.map(String);
	} else if (typeof itinerary === 'string') {
		try {
			// Attempt to parse the string as JSON
			const parsed = JSON.parse(itinerary);
			// Check if the parsed result is an array
			return Array.isArray(parsed) ? parsed.map(String) : [];
		} catch (error) {
			// If parsing fails, return an empty array
			console.error('Failed to parse itinerary JSON:', error);
			return [];
		}
	}
	// If it's neither an array nor a string, return an empty array
	return [];
}

const validator = (tripDetails: Trip) => {
	if (isNaN(tripDetails.startDate.getDate()) || isNaN(tripDetails.endDate.getDate())) {
		throw new Error('Invalid date in request');
	}
	// Validation: End date must be greater than or equal to the start date
	if (tripDetails.endDate < tripDetails.startDate) {
		throw new Error('End date must be greater than or equal to the start date');
	}
	// Calculate the difference in milliseconds
	const differenceInMilliseconds = tripDetails.endDate.getTime() - tripDetails.startDate.getTime();

	// Convert milliseconds to days and add 1 for inclusivity
	const daysDifference = Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24)) + 1;
	if (tripDetails.itinerary.length != daysDifference) {
		throw new Error('Missing day plans');
	}
};

export { parseTripData, stringifyTripData, validator };
