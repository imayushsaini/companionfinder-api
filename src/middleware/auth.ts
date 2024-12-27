import { verify } from '@tsndr/cloudflare-worker-jwt';

const GOOGLE_PUB_KEYS_URL = 'https://www.googleapis.com/service_accounts/v1/jwk/securetoken@system.gserviceaccount.com';
const PROJECT_ID = 'hop-on-trip';
interface FirebaseJsonWebKey extends JsonWebKey {
	kid: string; // as kid is required to get respective jwk, and jsonWebToken dont have kid field
}
const getJwtToken = (request: Request) => {
	const authorizationHeader = request.headers.get('Authorization');
	if (authorizationHeader && authorizationHeader.startsWith('Bearer ')) {
		return authorizationHeader.substring(7, authorizationHeader.length);
	}
	return null;
};

const validateToken = async (token: string): Promise<FirebasePayload | undefined> => {
	const [header, payload, signature] = token.split('.');
	if (!header || !payload || !signature) {
		throw new Error('Invalid JWT format');
	}
	const decodedHeader = JSON.parse(atob(header));
	const kid = decodedHeader.kid;
	const publicKey = (await getPublicKey()).get(kid);

	if (!publicKey) {
		throw new Error('Invalid JWT, matching KID not found');
	}
	const verifiedToken = await verify(token, publicKey, { algorithm: 'RS256', throwError: true });
	const verifiedPayload = verifiedToken?.payload as FirebasePayload;
	if (verifiedPayload && verifiedPayload.iss != `https://securetoken.google.com/${PROJECT_ID}`) {
		throw new Error('Invalid JWT');
	}

	return verifiedPayload;
};

const getPublicKey = async (): Promise<Map<string, JsonWebKey>> => {
	const response = await fetch(GOOGLE_PUB_KEYS_URL, { cf: { cacheEverything: true } });
	// Log cache status
	// const cacheStatus = response.headers.get('cf-cache-status');
	// console.log(`Cache status: ${cacheStatus}`);
	const res: { keys: FirebaseJsonWebKey[] } = (await response.json()) as { keys: FirebaseJsonWebKey[] };
	const resultMap = new Map<string, JsonWebKey>();
	res.keys.forEach((key) => {
		resultMap.set(key.kid, key as JsonWebKey);
	});
	return resultMap;
};

export { validateToken, getJwtToken };
