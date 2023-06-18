<script lang="ts">
	import type { UserType } from "$lib/types"
	import { fly } from "svelte/transition"
	export let user: UserType | undefined = undefined
	export let number = 0
	const widths = [32, 60]
	const width = widths[Math.floor(Math.random() * widths.length)]
</script>

{#if !user}
	<div
		role="status"
		class="m-8 max-w-lg p-6 space-y-4 bg-blue-50 rounded-lg flex-1 drop-shadow-lg animate-pulse"
	>
		<div>
			<div
				class="h-3 bg-gray-200 rounded-full dark:bg-gray-400 w-24 mb-4"
			/>
			<div
				class="h-2 bg-gray-100 rounded-full dark:bg-gray-300 w-{width}"
			/>
		</div>
		<span class="sr-only">Loading...</span>
	</div>
{:else}
	<div
		in:fly|global={{ y: 50, duration: 750, delay: number * 150 }}
		class="bg-blue-50 m-8 p-4 rounded-lg flex-1 drop-shadow-lg relative"
	>
		<p class="text-xl capitalize">{user.name}</p>
		<p class="text-gray-600">{user.email}</p>
	</div>
{/if}
