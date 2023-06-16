import { error, json } from "@sveltejs/kit"
import supabase from "$lib/db.js"
import type { UserType } from "$lib/types.js"
import { z } from "zod"

export async function POST({ request }) {
	const data = await request.json()
	const result = z
		.object({
			email: z.string().email(),
			name: z.string().min(3).max(255),
		})
		.safeParse(data)
	if (!result.success) {
		const formatted = result.error.format()
		throw error(400, { message: formatted?.email?._errors[0] ?? "" })
	}

	const user = await addUser(data.email, data.name)
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
		throw error(400, { message: "Someone already added that email" })
	}
	return supabase
		.from("users")
		.insert({ email, name })
		.select()
		.returns<UserType>()
}
