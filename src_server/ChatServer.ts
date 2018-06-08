import * as socketIo from 'socket.io'
import * as express from 'express'
import { Server } from 'http'

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
			socket.on('chat message', msg => {
				console.log(msg);
				let fullMessage = {
					text: msg,
					user_id: socket.request.session.user_id,
					user_name: "Anonymous",
					date: new Date()
				};
				socket.json.send(fullMessage);
				socket.broadcast.json.send(fullMessage);
			});
		});
	}
}