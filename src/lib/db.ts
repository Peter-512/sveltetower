import { createClient } from "@supabase/supabase-js"
import type { Database } from "$lib/supabase"

export default createClient<Database>(
	import.meta.env.VITE_NEXT_PUBLIC_SUPABASE_URL,
	import.meta.env.VITE_NEXT_PUBLIC_SUPABASE_ANON_KEY
)
