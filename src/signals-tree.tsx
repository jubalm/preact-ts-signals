import { Signal, useSignal } from "@preact/signals"
import { getTimeStamp } from "./lib/helpers"

export const SignalsTree = () => {
	const signal = useSignal<number>(Date.now())
	console.count('signals: renders parent')
	return (
		<div>
			<h1>useSignal</h1>
			<SignalsIgnore />
			<SignalsTrigger signal={signal} />
			<SignalsListener signal={signal} />
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
	return <div>{signal.value}</div>
}

const SignalsIgnore = () => {
	console.count('signals: renders ignore')
	return null
}