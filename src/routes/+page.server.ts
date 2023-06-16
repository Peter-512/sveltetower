import supabase from "$lib/db"
import type { UserType } from "$lib/types"

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
