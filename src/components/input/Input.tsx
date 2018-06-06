import * as React from 'react'
import './Input.css'

interface Props extends React.HTMLProps<HTMLInputElement> {
	title: string;
	onValueChange?(value: string): void;	
}

interface State {
	value: string;
}

class Input extends React.Component<Props, State> {
	state: State = {
		value: ''
	}

	handleChange = (event: any) => {		
		const value = event.currentTarget.value;		
		this.setState(() => ({value}));
		if (this.props.onValueChange) {
			const {onValueChange} = this.props;
			onValueChange(value);			
		}		
	}

	render() {
		const { value } = this.state;
		const { title, onValueChange, ...inputProps } = this.props;

		return (<div>
			<div className="all">{title}</div>
			<input {...inputProps} value={value} onChange={this.handleChange} />
		</div>)
	}
}

export default Input;