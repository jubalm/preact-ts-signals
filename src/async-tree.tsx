import { getTimeStamp } from "./lib/helpers"
import { useAsyncState } from "./lib/preact-utilities"

export const AsyncTree = () => {
	const asyncState = useAsyncState<number>()
	console.count('async: renders parent')
	return (
		<div>
			<h1>useAsyncState</h1>
			<AsyncIgnore />
			<AsyncTrigger asyncState={asyncState} />
			<AsyncListener asyncState={asyncState} />
		</div>
	)
}

const AsyncIgnore = () => {
	console.count('async: renders ignore')
	return null
}

const AsyncListener = ({ asyncState }: { asyncState: ReturnType<typeof useAsyncState<number>> }) => {
	const [someAsync] = asyncState
	console.count('async: renders listener')

	switch (someAsync.state) {
		case 'inactive':
			return <div>{Date.now()}</div>
		case 'pending':
			return <div>loading...</div>
		case 'rejected':
			return <div>fail</div>
		case 'resolved':
			return <div>{someAsync.value}</div>
		default:
			return null
	}
}

const AsyncTrigger = ({ asyncState }: { asyncState: ReturnType<typeof useAsyncState<number>> }) => {
	const [_, resolve] = asyncState
	const resolver = () => resolve(async () => await getTimeStamp())
	console.count('async: renders trigger')
	return <button onClick={resolver}>update</button>
}