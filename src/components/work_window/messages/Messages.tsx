import * as React from 'react'

interface Props {
	messages: string[]
}

const Messages: React.SFC<Props> = ({ messages }) => (
	<div>
	{messages.map((message:string) => (<div>message</div>))}
	</div>
)

export default Messages;