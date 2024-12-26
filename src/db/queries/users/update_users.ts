const query = 'INSERT INTO Users(user_id, about) VALUES (?, ?) ON CONFLICT (user_id) DO UPDATE SET about = EXCLUDED.about';

const updateProfile = async (env: Env, params: string[] = []) => {
	return await env.DB.prepare(query)
		.bind(...params)
		.all();
};

export default { updateProfile };
