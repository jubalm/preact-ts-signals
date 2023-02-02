import { Signal, useSignal } from "@preact/signals"
import { getTimeStamp } from "./lib/helpers"

export const SignalsTree = () => {
	const signal = useSignal<number>(Date.now())
	console.count('signals: renders parent')
	return (
		<div>
			<h1>useSignal</h1>
			<SignalsIgnore />
			<SignalsListener signal={signal} />
			<SignalsTrigger signal={signal} />
		</div>
	)
}
export const SignalsTrigger = ({ signal }: { signal: Signal<number> }) => {
	console.count('signals: renders trigger')
	const resolver = async () => (signal.value = await getTimeStamp())
	return <button onClick={resolver}>update</button>
}

const SignalsListener = ({ signal }: { signal: Signal<any> }) => {
	console.count('signals: renders listener')
	return <div>Last updated: {signal.value}</div>
}

const SignalsIgnore = () => {
	console.count('signals: renders ignore')
	return <div>Initial load: {Date.now()}</div>
}