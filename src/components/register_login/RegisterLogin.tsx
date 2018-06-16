import * as React from 'react'
import Register from '../register/Register'
import Login from '../login/Login'
const classNames = require('classnames')
import * as styles from'./registerlogin.css'

enum Mode {
	Register,
	Login
}

interface State {
	mode: Mode
}

interface Props {
	onLogin(): void
}

class RegisterLogin extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = {
			mode: Mode.Login
		};
	}
	render() {		
		return (<div className={styles.root}>
			<div className={this._getRegisterBlockClassname()}>
				<Register onRegister={this._goToLogin} />
				<div className={styles.toggleLink} onClick={this._goToLogin}>Перейти к авторизации</div>
			</div>
			<div className={this._getLoginBlockClassname()}>
				<Login onLogin={this.props.onLogin} />
				<div className={styles.toggleLink} onClick={this._goToRegistration}>Перейти к регистрации</div>
			</div>
		</div>)
	}

	_goToRegistration = () => {
		this.setState({mode: Mode.Register});
	}

	_goToLogin = () => {
		this.setState({mode: Mode.Login});
	}

	_getRegisterBlockClassname () {
		return classNames(styles.item, {[styles.item_hidden]: this.state.mode === Mode.Login});
	}

	_getLoginBlockClassname () {
		return classNames(styles.item, {[styles.item_hidden]: this.state.mode === Mode.Register});
	}
}

export default RegisterLogin;

