import * as React from 'react'
import Input from "../input/Input"
import './Login.css'

interface Props {
	onLogin(): void;
}

interface State {
	email: string;
	password: string;
}

class Login extends React.Component<Props, State> {

	handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();		
		fetch("/login", {
			method: 'post',
			credentials: 'include',
			headers: {
				'Accept': 'applications/json, text/plain, */*',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				email: this.state.email,
				password: this.state.password
			})
		})
			.then(r => {
				if (r.status === 200) {
					this.props.onLogin();
				}
			});
	}

	render () {
		return (
		<form onSubmit={this.handleLogin}>
			<div className="logo"></div>
			<Input title="E-mail" onValueChange={email => {this.setState({email});}} />
			<Input title="Пароль" type="password" onValueChange={password => {this.setState({password});}} />
			<input type="submit" />
		</form>
		)
		}
	}

export default Login;