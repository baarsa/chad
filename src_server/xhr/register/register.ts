import express from 'express'
const knex = require('knex')(require('../../../knexfile.js'))
const crypto = require('crypto')

const register = (req: express.Request, res: express.Response) => {
	let email = req.body.email;
	let password = generatePassword();
	
	const {salt, hash} = saltHashPassword(password);
	knex('users').insert({
		salt,
		hash,
		email,
		nickname: email
	})
	.then(() => {
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