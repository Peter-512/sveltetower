import { error, fail, json } from "@sveltejs/kit"
import supabase from "$lib/db.server.js"
import type { UserType } from "$lib/types.js"
export async function POST({ request }) {
	const data = await request.json()
	const user = await addUser(data.email, data.name)
	if ("emailAlreadyExists" in user) {
		throw error(400, { message: "Email already exists" })
	}
	return json(user.data)
}

async function emailExists(email: string) {
	const { count } = await supabase
		.from("users")
		.select("email", { count: "exact" })
		.ilike("email", email)
	return !!count
}

async function addUser(email: string, name: string) {
	if (await emailExists(email)) {
		return fail(400, { email, emailAlreadyExists: true })
	}
	return supabase
		.from("users")
		.insert({ email, name })
		.select()
		.returns<UserType>()
}
