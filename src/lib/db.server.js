import {createPool} from "@vercel/postgres";
import {POSTGRES_URL} from "$env/static/private"

const db = createPool({connectionString: POSTGRES_URL})

export default db
