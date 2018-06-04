import * as React from 'react'
import RegisterLogin from './components/register_login/RegisterLogin'
import WorkWindow from './components/work_window/WorkWindow'


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

	render () {
		let { authorized } = this.state;
		return (<div>
			{authorized ? <WorkWindow /> : <RegisterLogin onLogin={() => {this._login();}} />}
		</div>);
	}

	_login () {
		this.setState({
			authorized: true
		});
	}
}

export default App;