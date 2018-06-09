import * as React from 'react'
import Input from '../input/Input'

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
			<h1>Registration!</h1>
			<Input title="E-mail" onValueChange={email => {this.setState({email});}} />
			<input type="submit" />
		</form>)
	}
}

export default Register;

