import * as React from 'react'
import * as styles from './Messages.css'

export interface Message {
	text: string,
	id_user: number,
	user_name: string,
	date: Date
}

interface Props {
	messages: Message[]
}

const Messages: React.SFC<Props> = ({ messages }) => (
	<div className={styles.root}>
	{messages.map((message: Message, i: number) => (
		<div key={i} title={"Отправлено " + message.date.toLocaleString()}>
			<span className={styles.author}>{message.user_name}:</span> {message.text}
		</div>))}
	</div>
)

export default Messages;