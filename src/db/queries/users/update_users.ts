const query = `
	INSERT INTO Users(user_id, name, about)
	VALUES(?, ?, ?) ON CONFLICT(user_id) DO UPDATE SET
	name = EXCLUDED.name,
	about = CASE
				WHEN EXCLUDED.about = 'DEFAULT' THEN Users.about
				ELSE EXCLUDED.about
				END`;

const updateProfile = async (env: Env, params: string[] = []) => {
	return await env.DB.prepare(query)
		.bind(...params)
		.run();
};

export default { updateProfile };
