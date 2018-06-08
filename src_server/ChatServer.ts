import * as socketIo from 'socket.io'
import * as express from 'express'
import { Server } from 'http'
const knex = require('knex')(require('../knexfile.js')) //include in one place

export default class ChatServer {
	private io: socketIo.Server;
	private sessionMiddleware: express.RequestHandler;

	constructor(server: Server, session: express.RequestHandler) {
		this.io = socketIo(server);
		this.sessionMiddleware = session;

		this.setMiddleware();
		this.setConnection();
	}

	private setMiddleware() {
		this.io.use((socket, next) => {
			this.sessionMiddleware(socket.request, socket.request.res, next);
		});
	}

	private setConnection() {
		this.io.on('connection', (socket) => {
			console.log('user connected');
			socket.on('chat message', async msg => {
				console.log(msg);				
				let fullMessage = {
					text: msg,
					id_user: socket.request.session.user_id,
					user_name: "Anonymous",
					date: new Date()
				};
				await this.recordMessage(fullMessage.text, fullMessage.id_user, fullMessage.date);
				socket.json.send(fullMessage);
				socket.broadcast.json.send(fullMessage);
			});
		});
	}

	private async recordMessage(text: string, id_user: number, date: Date) {
		await knex('messages').insert({
			text,
			id_user,
			date
		});
	}
}