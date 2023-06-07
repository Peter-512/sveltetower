<script lang="ts">
	import "../app.css"
	import ThemeSwitcher from "./ThemeSwitcher.svelte"
</script>

<svelte:head>
	<title>SvelteTower</title>
	<meta
		name="description"
		content="This is a blazingly fast homepage, showcasing the strength of SvelteKit x Tailwind x Postgres"
	/>
	<meta
		property="og:image"
		content="https://pddtgdppxntnufplgurm.supabase.co/storage/v1/object/public/sveltetower-bucket/logo.png?t=2023-06-05T13%3A20%3A52.183Z"
	/>
	<script>
		// On page load or when changing themes, best to add inline in `head` to avoid FOUC (flash of unstyled content)
		if (
			localStorage.getItem("theme") === "dark" ||
			(!("theme" in localStorage) &&
				window.matchMedia("(prefers-color-scheme: dark)").matches)
		) {
			document.documentElement.classList.add("dark")
		} else {
			document.documentElement.classList.remove("dark")
		}
	</script>
</svelte:head>

<ThemeSwitcher />
<slot />
