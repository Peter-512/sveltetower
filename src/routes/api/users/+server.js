import { error, fail, json } from "@sveltejs/kit"
import supabase from "$lib/db.server.js"
export async function POST({ request }) {
	const data = await request.json()
	const user = await addUser(data.email, data.name)
	if (user.data?.emailAlreadyExists) {
		throw error(400, { message: "Email already exists" })
	}
	return json(data)
}

async function emailExists(email) {
	const { count } = await supabase
		.from("users")
		.select("email", { count: "estimated" })
		.ilike("email", email)
	return !!count
}

async function addUser(email, name) {
	if (await emailExists(email)) {
		return fail(400, { email, emailAlreadyExists: true })
	}
	return supabase.from("users").insert({ email, name })
}
