import * as React from 'react'

interface Props {
	onSubmit(message: string): void
}

interface State {
	message: string;
}

export default class MessageInput extends React.Component<Props, State> {
	state: State = {
		message: ""
	}
	onSubmit = (event: any) => {
		event.preventDefault();
		this.props.onSubmit(this.state.message);
	}
	handleChange = (event: any) => {
		this.setState({
			message: event.currentTarget.value
		});
	}
	render () {
		const { message } = this.state;
		return (<form onSubmit={this.onSubmit}>
				<input value={message} onInput={this.handleChange} />
				<button type="submit">send</button>
			</form>)
	}
}