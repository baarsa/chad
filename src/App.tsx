import * as React from 'react'
import RegisterLogin from './components/register_login/RegisterLogin'
import WorkWindow from './components/work_window/WorkWindow'
import * as styles from './App.css'

interface State {
	authorized: boolean
}

class App extends React.Component<{}, State> {
	constructor(props: {}) {
		super(props);
		this.state = {
			authorized: false
		};
	}

	componentWillMount () {
		fetch("/isauth", {
			method: 'post',
			credentials: 'include'
		})
		.then(res => {
			if (res.status === 200) {
					this._login();
			}
		});
	}

	render () {
		let { authorized } = this.state;
		return (<div className={styles.page}>
			<div className={styles.content}>
			{authorized ? <WorkWindow /> : <RegisterLogin onLogin={this._login} />}
			</div>
		</div>);
	}

	_login = () => {
		this.setState({
			authorized: true
		});
	}
}

export default App;