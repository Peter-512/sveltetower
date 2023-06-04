import supabase from "$lib/db.server.js"

/** @type {import('./$types').PageServerLoad} **/
export async function load({ url }) {
	const limit = Number(url.searchParams.get("limit")) || 20
	const skip = Number(url.searchParams.get("skip")) || 0
	const { data: users } = await supabase
		.from("users")
		.select("*")
		.range(skip, skip + limit)
	return {
		promise: { users },
	}
}
