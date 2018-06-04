import * as React from 'react'

export interface InjectedProps {
	count: number;
}

interface ExternalProps {
	increment: number;
}

interface State {
	count: number
}

function withCount<OriginProps>(Component: React.ComponentType<OriginProps & InjectedProps>) {
	type ResultProps = OriginProps & ExternalProps;
}