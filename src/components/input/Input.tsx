import * as React from 'react'
import * as styles from './Input.css'

interface Props extends React.HTMLProps<HTMLInputElement> {
	outerClass?: string;
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
		const value = event.target.value;		
		this.setState(() => ({value}));
		if (this.props.onValueChange) {
			const {onValueChange} = this.props;
			onValueChange(value);			
		}		
	}

	render() {
		const { value } = this.state;
		const { outerClass, title, onValueChange, ...inputProps } = this.props;

		return (<div className={outerClass}>
			<div className={styles.title}>{title}</div>
			<input className={styles.input} {...inputProps} value={value} onChange={this.handleChange} />
		</div>)
	}
}

export default Input;