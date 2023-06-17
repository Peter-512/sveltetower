import supabase from "$lib/db.server.js"
import type { UserType } from "$lib/types.js"

export async function load({ url }: { url: URL }) {
	const limit = Number(url.searchParams.get("limit")) || 20
	const skip = Number(url.searchParams.get("skip")) || 0
	const users = supabase
		.from("users")
		.select("*")
		.range(skip, skip + limit - 1)
		.returns<UserType[]>()
	return {
		streamed: { users },
	}
}
