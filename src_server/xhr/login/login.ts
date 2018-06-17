import express from 'express'
import {DB as knex} from '../../db/DB'
const crypto = require('crypto')

const login = async (req: express.Request, res: express.Response) => {
	const { email, password } = req.body;
	const [user] = await knex('users').where({email});
	if (!user) {
		res.sendStatus(401);
		return;
	}
	const { hash } = saltHashPassword(password, user.salt);
	if (hash === user.hash) {
		req.session.user_id = user.id;
		res.sendStatus(200);
	} else {
		res.sendStatus(401);
	}
}

function saltHashPassword(password: string, salt: string) {
	const hash = crypto
		.createHmac('sha512', salt)
		.update(password);
	return {
		salt,
		hash: hash.digest('hex')
	};
}

export default login;