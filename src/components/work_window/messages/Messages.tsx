import * as React from 'react'

export interface Message {
	text: string,
	user_id: number
}

interface Props {
	messages: Message[]
}

const Messages: React.SFC<Props> = ({ messages }) => (
	<div>
	{messages.map((message: any) => (<div>"{message.text}"" BY #{message.user_id}</div>))}
	</div>
)

export default Messages;