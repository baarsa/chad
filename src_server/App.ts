import * as express from 'express'
import {Request, Response} from 'express'
import { createServer, Server } from 'http'
import * as bodyParser from 'body-parser'
import * as session from 'express-session'
import ChatServer from './ChatServer'
import * as path from 'path'
import login from './xhr/login/login'
import register from './xhr/register/register'
import initialinfo from './xhr/initial-info/initialinfo'
import isauth from './xhr/isauth/isauth'

class App {
	private server: Server;
	private express: express.Application;	
	private chatServer: ChatServer;
	private sessionMiddleware: express.RequestHandler;

	constructor() {
		this.express = express();
		this.server = createServer(this.express);

		this.setMiddleware();
		this.setChatServer();
		this.setRoutes();
	}

	public listen(port:number): void {
		this.server.listen(port);
	}

	private setChatServer(): void {		
		this.chatServer = new ChatServer(this.server, this.sessionMiddleware);		
	}

	private setMiddleware(): void {
		this.express.use(bodyParser.json());
		this.express.use(bodyParser.urlencoded({extended: true}));
		this.sessionMiddleware = session({
			secret: 'sekret',
			cookie: {
				secure: false,
				httpOnly: false
			}
		});
		this.express.use(this.sessionMiddleware);
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