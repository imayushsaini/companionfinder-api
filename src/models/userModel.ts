type USER_TYPE = 'ADMIN' | 'ORGANIZATION' | 'PERSON';
interface User {
	user_id: string;
	about: string;
	name: string;
	userType: USER_TYPE; // ADMIN / ORGANIZATION / PERSON
	instagramProfile: string; // URL or username
}
