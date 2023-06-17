<script lang="ts">
	import type { UserType } from "$lib/types"
	import { Alert } from "flowbite-svelte"
	import InfoIcon from "./InfoIcon.svelte"

	export let updateUsers: (user: UserType) => void
	let emailInput = ""
	let status: number
	let message = ""
	const addUser = async (email: string) => {
		if (!email) return

		const name = email.split("@")[0].split(".")[0]

		const res = await fetch("/api/users", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
			body: JSON.stringify({ email, name }),
		})
		status = res.status
		const data = await res.json()

		if (!res.ok) {
			message = data.message
			return
		}
		updateUsers({ email, name, id: data[0].id })
		emailInput = ""
	}
</script>

<div>
	<div class="mt-8 mx-8 flex flex-col sm:flex-row gap-4">
		<div class="relative flex-1">
			<div
				class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
			>
				<svg
					aria-hidden="true"
					class="w-5 h-5 text-gray-500 dark:text-gray-400"
					fill="currentColor"
					viewBox="0 0 20 20"
					xmlns="http://www.w3.org/2000/svg"
					><path
						d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"
					/><path
						d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"
					/></svg
				>
			</div>
			<input
				bind:value={emailInput}
				name="email"
				aria-label="email input"
				type="text"
				id="email-address-icon"
				class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
				placeholder="name@email.com"
			/>
		</div>
		<button
			on:click={async () => await addUser(emailInput)}
			type="submit"
			class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
			>Submit</button
		>
	</div>
	{#if status === 400}
		<Alert color="red" border dismissable class="mx-8 my-4">
			<InfoIcon slot="icon" />
			<em class="font-medium">Aww snap!</em>
			{message}.
		</Alert>
	{:else if status >= 500}
		<Alert color="red" border dismissable class="mx-8 my-4">
			<InfoIcon slot="icon" />
			<em class="font-medium">Oh oh!</em> Something went wrong, please try
			again later.
		</Alert>
	{/if}
</div>
