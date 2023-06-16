// import {
// 	NEXT_PUBLIC_SUPABASE_URL,
// 	NEXT_PUBLIC_SUPABASE_ANON_KEY,
// } from "$env/static/private"

import { createClient } from "@supabase/supabase-js"

export default createClient(
	import.meta.env.VITE_NEXT_PUBLIC_SUPABASE_URL,
	import.meta.env.VITE_NEXT_PUBLIC_SUPABASE_ANON_KEY
)
