<script lang="ts">
	import { Kbd } from "flowbite-svelte"
	import { onMount } from "svelte"
	import supabase from "$lib/db"
	import type { RealtimeChannel } from "@supabase/supabase-js"
	export let data

	let mousePos = { x: 0, y: 0 }
	type MousePos = typeof mousePos
	const id = crypto.randomUUID()
	let mice = { [id]: mousePos }
	let channel: RealtimeChannel
	onMount(() => {
		channel = supabase.channel("chat")
		channel.on("broadcast", { event: "mouse" }, payload => {
			if (payload.event === "mouse") {
				mice[payload.payload.id] = payload.payload.mousePos as MousePos
			}
		})
		channel.subscribe()
	})
	let ref: HTMLSpanElement[] = []

	$: {
		ref.map(r => {
			r.style.left = `${mice[r.id].x}px`
			r.style.top = `${mice[r.id].y}px`
		})
	}

	//  get current mouse position
	const updateMousePos = (e: MouseEvent) => {
		mousePos = { x: e.clientX, y: e.clientY }
	}
	$: {
		channel &&
			channel.send({
				type: "broadcast",
				event: "mouse",
				payload: { mousePos, id },
			})
	}
</script>

{#each Object.keys(mice) as mouseID, i}
	{#if id !== mouseID}
		<span
			bind:this={ref[i]}
			{id}
			class="absolute mouse"
			style="left: {mice[mouseID].x}px; top: {mice[mouseID].y}px"
		/>
	{/if}
{/each}
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
