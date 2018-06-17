import * as React from 'react'
import * as cn from 'classnames'
import SubmitButton from '../../submit_button/SubmitButton'
import * as styles from './MessageInput.css'

interface Props {
	outerClass?: string;
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
		this.setState({
			message: ""
		});
	}
	handleChange = (event: any) => {
		this.setState({
			message: event.currentTarget.value
		});
	}
	render () {
		const { message } = this.state;
		const { outerClass } = this.props;
		return (<form className={cn(outerClass, styles.root)} onSubmit={this.onSubmit}>
				<input className={styles.input} value={message} onInput={this.handleChange} />
				<SubmitButton text="Отправить" />				
			</form>)
	}
}