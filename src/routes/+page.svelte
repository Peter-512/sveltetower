<script lang="ts">
	import EmailInput from "./EmailInput.svelte"
	import User from "./User.svelte"
	import type { UserType } from "$lib/types"
	import { page } from "$app/stores"
	import supabase from "$lib/db"

	export let data
	const randomNumberOfLoadingUsers = Math.floor(Math.random() * 10) + 5
	const limit =
		Number($page.url.searchParams.get("limit")) ??
		randomNumberOfLoadingUsers

	let newUsers: UserType[] = []
	const addUser = (user: UserType) => {
		newUsers = [...newUsers, user]
	}

	const channel = supabase
		.channel("users")
		.on(
			"postgres_changes",
			{
				event: "INSERT",
				schema: "public",
			},
			payload => {
				const user = payload.new as UserType
				addUser(user)
			}
		)
		.subscribe()
</script>

<h1 class="text-6xl md:text-9xl m-8 text-center">
	<span
		class="bg-gradient-to-br font-bold from-red-600 to-yellow-500 bg-clip-text text-transparent box-decoration-clone"
		>Blazingly fast</span
	> 🚀
</h1>

<EmailInput updateUsers={addUser} />

{#await data.streamed.users}
	<div class="flex flex-wrap">
		{#each { length: limit } as _}
			<User />
		{/each}
	</div>
{:then users}
	<div class="flex flex-wrap">
		{#if users.data && users.data.length > 0}
			{#each users.data as user, i (user.id)}
				<User {user} number={i} />
			{/each}
		{:else}
			<h1 class="text-white font-light text-3xl m-8">
				No users found...
			</h1>
		{/if}
		{#each newUsers as user, i (user.id)}
			<User {user} number={i} />
		{/each}
	</div>
{:catch error}
	<div class="text-3xl">Oops, something went wrong...</div>
	<p class="text-red-500 m-2 text-2xl">{error.message}</p>
{/await}
