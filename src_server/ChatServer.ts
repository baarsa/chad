import * as socketIo from 'socket.io'
import * as express from 'express'
import { Server } from 'http'
import {DB as knex} from './db/DB'

export default class ChatServer {
	private io: socketIo.Server;
	private sessionMiddleware: express.RequestHandler;

	constructor(server: Server, session: express.RequestHandler) {
		this.io = socketIo(server);
		this.sessionMiddleware = session;

		this.setMiddleware();
		this.setConnection();
	}

	private setMiddleware(): void {
		this.io.use((socket, next) => {
			this.sessionMiddleware(socket.request, socket.request.res, next);
		});
	}

	private setConnection(): void {
		this.io.on('connection', (socket) => {
			console.log('user connected');
			socket.on('chat message', async msg => {
				let id_user = socket.request.session.user_id;
				let user_name = await this.getUsername(id_user); 		
				//todo handle unathorized					;
				let fullMessage = {
					text: msg,
					id_user,
					user_name,
					date: new Date()
				};
				await this.recordMessage(fullMessage.text, fullMessage.id_user, fullMessage.date);
				socket.json.send(fullMessage);
				socket.broadcast.json.send(fullMessage);
			});
		});
	}

	private async recordMessage(text: string, id_user: number, date: Date): Promise<void> {
		await knex('messages').insert({
			text,
			id_user,
			date
		});
	}

	private async getUsername(id_user: number): Promise<string> {		
		return (await knex('users').where('id', id_user))[0].nickname;
	}
}