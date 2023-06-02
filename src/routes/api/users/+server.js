import {error, fail, json} from "@sveltejs/kit";
import db from "$lib/db.server.js";
export async function POST({request}) {

	const data = await request.json();
	const user = await addUser(data.email, data.name)
	if (user.data?.emailAlreadyExists) {
		throw error(400, {message: "Email already exists"})
	}
	return json(data)
}

async function emailExists(email) {
	return (await db.query(`select * from users where email = ${email})`)).rowCount > 0
}

async function addUser(email, name) {
	if (await emailExists(email)) {
		return fail(400, {email, emailAlreadyExists: true})
	}
	return db.query(`insert into users (name, email) values (${name}, ${email})`)
}
