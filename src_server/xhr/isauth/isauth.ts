import express from 'express'

const isauth = (req: express.Request, res: express.Response) => {
	if (!req.session.user_id) {
		res.sendStatus(401);
		return;
	}
	res.sendStatus(200);
}

export default isauth;