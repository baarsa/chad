import * as React from 'react'
import {Message} from './messages/Messages' 
import Messages from './messages/Messages'
import MessageInput from './message_input/MessageInput'
import * as io from 'socket.io-client'

interface Props {
 
}

interface State {
	username: string | undefined;
	messages: Message[]
}

class WorkWindow extends React.Component<{}, State> {

	private socket: SocketIOClient.Socket;

	constructor(props: Props) {
		super(props);
		this.state = {
			username: undefined,
			messages: [				 
				{text: "message two", user_id: 999, user_name: "no user", date: new Date}
			]
		};
		this.socket = io();
		this.socket.on('message', (msg: any) => {
			this.setState({
				messages: [...this.state.messages, msg]
			});
		});
	}

	componentDidMount () {
		fetch("/initial-info", {
			method: 'post',
			headers: {
				'Accept': 'applications/json, text/plain, */*',
				'Content-Type': 'application/json'
			},
			credentials: 'include'
		})
		.then(res => res.json())
		.then(res => {
			this.setState({
				username: res.username
			});
		});
	}

	sendMessage = (message: string) => {				
		this.socket.emit('chat message', message);
	}

	render () {
		return (<div>
			Work Window. {this.state.username ? `Welcome, ${this.state.username}!` : ""}
			<Messages messages = {this.state.messages} />
			<MessageInput onSubmit={this.sendMessage} />
			<button onClick={() => {this.sendMessage("aaa");}}>aa</button>
		</div>)
	}
}

export default WorkWindow;