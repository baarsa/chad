import express from 'express'
import {DB as knex} from '../../db/DB'
const crypto = require('crypto')

import MyMailer from '../../MyMailer'

const register = (req: express.Request, res: express.Response) => {
	let email = req.body.email;
	let password = generatePassword();
	//check if user with this email already exists

	const {salt, hash} = saltHashPassword(password);
	knex('users').insert({
		salt,
		hash,
		email,
		nickname: email
	})
	.then(() => {
		let mail_details = {
			address: email,
			subject: "Registration in Chad",
			body: `You've successfully registrated in the great Chad. Use
			 your password ${password} with wisdom`
		};
		(new MyMailer()).send(mail_details);
		res.sendStatus(200);
	})
	.catch((err: any) => {
		res.sendStatus(500);
	});
}

function saltHashPassword(password: string, salt: string = randomString()) {
	const hash = crypto
		.createHmac('sha512', salt)
		.update(password);
	return {
		salt,
		hash: hash.digest('hex')
	};
}

function randomString(): string {
	return crypto.randomBytes(4).toString('hex');
}

function generatePassword () {
	const password_length = 8;
	return crypto.randomBytes(password_length).toString('hex');
}

export default register;