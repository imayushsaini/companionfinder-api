interface TripRow {
	user_id: string;
	trip_id: string;
	title: string;
	startDate: string; // ISO 8601 string
	endDate: string; // ISO 8601 string
	from_location: string;
	to_location: string;
	itinerary: string; // JSON string
	contactDetails: string;
	bannerUrl: string; // JSON string
}

interface Trip {
	user_id: string;
	trip_id: string;
	title: string;
	startDate: Date; // Converted to Date object
	endDate: Date; // Converted to Date object
	from_location: string;
	to_location: string;
	itinerary: string[]; // Parsed JSON array
	contactDetails: string;
	bannerUrl: string[]; // Parsed JSON array
}
