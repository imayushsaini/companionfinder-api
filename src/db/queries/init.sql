CREATE TABLE IF NOT EXISTS Users (
	user_id TEXT NOT NULL PRIMARY KEY,
 	about TEXT,
	name TEXT,
	userType TEXT
);


CREATE TABLE IF NOT EXISTS Trips (
    user_id TEXT NOT NULL,
    trip_id TEXT NOT NULL PRIMARY KEY,
    title TEXT NOT NULL,
    startDate TEXT NOT NULL, -- Storing Date as ISO 8601 string
    endDate TEXT NOT NULL,  -- Storing Date as ISO 8601 string
    from_location TEXT NOT NULL,
    to_location TEXT NOT NULL,
    itinerary TEXT NOT NULL, -- Storing array as JSON
    contactDetails TEXT NOT NULL,
	additional_info TEXT,
    bannerUrl TEXT NOT NULL, -- Storing array as JSON
	posted_on TEXT NOT NULL
);
