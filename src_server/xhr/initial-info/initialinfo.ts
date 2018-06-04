import express from 'express'
const knex = require('knex')(require('../../../knexfile.js'))

const initialinfo = async (req: express.Request, res: express.Response) => {
	if (!req.session.user_id) {
		res.sendStatus(401);
		return;
	}
	const [user] = await knex('users').where({id: req.session.user_id});
	res.send(JSON.stringify({username: user.nickname}));
}

export default initialinfo;