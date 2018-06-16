import * as React from 'react'
import * as styles from './Register.css'
import Input from '../input/Input'
import SubmitButton from '../submit_button/SubmitButton'

interface Props {
	onRegister(): void;
}

interface State {
	email: string;
}

class Register extends React.Component<Props, State> {
	
	handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		fetch("/register", {
			method: 'post',
			headers: {
				'Accept': 'applications/json, text/plain, */*',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				email: this.state.email,				
			})
		})
		.then(r => {
			this.props.onRegister();
			console.log(r);
		})
	}

	render () {
		return (<form onSubmit={this.handleSubmit}>
			<h1 className={styles.title}>Регистрация</h1>
			<Input outerClass={styles.input} title="E-mail" onValueChange={email => {this.setState({email});}} />
			<SubmitButton text="Зарегистрироваться" />
		</form>)
	}
}

export default Register;

