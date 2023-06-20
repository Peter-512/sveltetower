<script lang="ts">
	import { Kbd } from "flowbite-svelte"
	import { onMount } from "svelte"
	import supabase from "$lib/db"
	import type { RealtimeChannel } from "@supabase/supabase-js"
	export let data

	let otherMousePos = { x: 0, y: 0 }
	let channel: RealtimeChannel
	onMount(() => {
		channel = supabase.channel("chat")
		channel.on("broadcast", { event: "mouse" }, payload => {
			if (payload.event === "mouse") {
				otherMousePos = payload.payload
				console.log(otherMousePos)
			}
		})
		channel.subscribe()
	})
	let ref: HTMLSpanElement

	$: {
		if (ref) {
			ref.style.left = `${otherMousePos.x}px`
			ref.style.top = `${otherMousePos.y}px`
		}
	}

	//  get current mouse position
	let mousePos = { x: 0, y: 0 }
	const updateMousePos = (e: MouseEvent) => {
		mousePos = { x: e.clientX, y: e.clientY }
	}
	$: otherMousePos = otherMousePos
	$: {
		channel &&
			channel.send({
				type: "broadcast",
				event: "mouse",
				payload: mousePos,
			})
	}
</script>

<span bind:this={ref} class="absolute mouse" />
<main class="grid h-screen" on:mousemove={updateMousePos}>
	<div
		class="dark:text-slate-400 text-slate-500 place-self-center p-4 border rounded-2xl dark:border-slate-400 border-slate-500"
	>
		<Kbd class="px-2 py-1.5">Spacebar</Kbd> to start chatting...
	</div>
</main>

<style>
	.mouse {
		width: 10px;
		height: 10px;
		background: red;
		border-radius: 50%;
		transition: all 0.1s ease-in-out;
	}
</style>
