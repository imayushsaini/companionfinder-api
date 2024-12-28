const query = 'SELECT * FROM Users WHERE user_id = ?';

const fetchProfile = async (env: Env, params: string[] = []) => {
	return await env.DB.prepare(query)
		.bind(...params)
		.run<User>();
};

export default { fetchProfile };
