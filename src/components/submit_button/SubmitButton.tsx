import * as React from 'react'
import * as styles from './SubmitButton.css'

interface Props {
	text: string;	
}

const SubmitButton: React.SFC<Props> = (props: Props) => (
	<button className={styles.root} type="submit">{props.text}</button>
	)

export default SubmitButton;