/*
const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)
const { dbAccess } = require("./app/db/Db");
const login = require ("./xhr/login/login.js")
const register = require ("./xhr/register/register.js")
const initialinfo = require ("./xhr/initial-info/InitialInfo.js")

const App = require('./App.ts')

io.on('connection', (socket) => {
	console.log('user connected');
	socket.on('chat message', msg => {
		console.log(msg);
	});
});

app.use(express.static("./public"));
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());
app.use(session({
	secret: 'sekret',
	cookie: {
		secure: false,
		httpOnly: false
	}
}));
		
app.get("/", (req, res) => {
	res.sendFile("index.html", {root: __dirname});
});

app.post("/login", login);
app.post("/register", (req, res) => {
	register(req, res);
});
app.post("/initial-info", initialinfo);



app.listen(3000);
*/

import App from './App'

const app = new App();
app.listen(3000);