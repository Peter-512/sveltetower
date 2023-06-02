import {sql} from "@vercel/postgres"
import db from "$lib/db.server.js";
async function getUsers(limit, skip) {
	return sql`
        select name, email, id
        from users`
        // ${limit ? sql`LIMIT ${limit}` : sql``} OFFSET ${skip}`
}

/** @type {import('./$types').PageServerLoad} **/
export async function load({ url }) {
	const limit = Number(url.searchParams.get("limit")) || 20
	const skip = Number(url.searchParams.get("skip")) || 0
	const {rows: users} = await db.query("SELECT name, email, id from users");
	return {
		promise: { users },
	}
}
