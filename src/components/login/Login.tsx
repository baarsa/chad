import * as React from 'react'
import Input from '../input/Input'
import SubmitButton from '../submit_button/SubmitButton'
import * as styles from './Login.css'

interface Props {
	onLogin(): void;
}

interface State {
	email: string;
	password: string;
}

class Login extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = {
			email: "",
			password: ""
		}
	}

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
		<form className={styles.root} onSubmit={this.handleLogin}>
			<h1 className={styles.title}>Авторизация</h1>
			<Input 
				outerClass={styles.input}
				title="E-mail" 
				onValueChange={email => {this.setState({email});}} />
			<Input 
				outerClass={styles.input}
				title="Пароль"
				type="password"
				onValueChange={password => {this.setState({password});}} />
			<SubmitButton text="Войти" />			
		</form>
		)
	}
}

export default Login;