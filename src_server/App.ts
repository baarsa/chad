import * as express from 'express'
import {Request, Response} from 'express'
import { createServer, Server } from 'http';
import * as bodyParser from 'body-parser'
import * as session from 'express-session'
import * as socketIo from 'socket.io'
import * as path from 'path'
import login from './xhr/login/login'
import register from './xhr/register/register'
import initialinfo from './xhr/initial-info/initialinfo'
import isauth from './xhr/isauth/isauth'

class App {
	private server: Server;
	private express: express.Application;
	private io: SocketIO.Server;

	constructor() {
		this.express = express();
		this.server = createServer(this.express);

		this.setMiddleware();
		this.setSocket();
		this.setRoutes();
	}

	public listen(port:number): void {
		this.server.listen(port);
	}

	private setSocket(): void {		
		this.io = socketIo(this.server);
		this.io.on('connection', (socket) => {
			console.log('user connected');
			socket.on('chat message', msg => {
				console.log(msg);
				socket.json.send({
					message: msg
				});
				socket.broadcast.json.send({
					message: msg
				});
			});
		});
	}

	private setMiddleware(): void {
		this.express.use(bodyParser.json());
		this.express.use(bodyParser.urlencoded({extended: true}));
		this.express.use(session({
			secret: 'sekret',
			cookie: {
				secure: false,
				httpOnly: false
			}
		}));
	}

	private setRoutes(): void {
		this.express.use(express.static("./public"));
		this.express.get("/", (req: Request, res: Response) => {
			res.sendFile("/index.html", {root: path.resolve("")});
		});

		this.express.post("/login", login);		
		this.express.post("/register", register);
		this.express.post("/initial-info", initialinfo);		
		this.express.post("/isauth", isauth);	
	}
}

export default App;