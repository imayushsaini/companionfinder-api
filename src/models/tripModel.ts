// interface of Row (how data stored in db)
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
	additional_info: string;
	bannerUrl: string; // JSON string
	posted_on: string; // ISO 8601 string
}
// for data coming from request , to create/update a trip
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
	additional_info: string;
	bannerUrl: string[]; // Parsed JSON array
	posted_on: Date;
}

// data coming after executing table join with User,
// since its a left join , user data may be null
interface TripRowWithUser extends TripRow {
	name: string | null;
}

// response pojo for fetch trips request.
interface TripWithUser extends Trip {
	name: string | null;
}
