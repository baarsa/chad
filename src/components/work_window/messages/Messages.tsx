import * as React from 'react'

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
	<div>
	{messages.map((message: any) => (<div>"{message.text}"" BY #{message.user_name} AT {message.date.toString()}</div>))}
	</div>
)

export default Messages;