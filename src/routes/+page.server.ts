import supabase from "$lib/db"
import type { UserRecord } from "$lib/supabase"

export async function load({ url }: { url: URL }) {
	const limit = Number(url.searchParams.get("limit")) || 20
	const skip = Number(url.searchParams.get("skip")) || 0
	const users = supabase
		.from("users")
		.select("*")
		.range(skip, skip + limit - 1)
		.returns<UserRecord[]>()
	return {
		streamed: { users },
	}
}
