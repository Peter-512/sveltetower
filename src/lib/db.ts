import { createClient } from "@supabase/supabase-js"

export default createClient(
	import.meta.env.VITE_NEXT_PUBLIC_SUPABASE_URL,
	import.meta.env.VITE_NEXT_PUBLIC_SUPABASE_ANON_KEY,
	{
		realtime: {
			headers: {
				Authorization: `Bearer ${
					import.meta.env.VITE_NEXT_PUBLIC_SUPABASE_ANON_KEY
				}`,
			},
			params: {
				apiKey: import.meta.env.VITE_NEXT_PUBLIC_SUPABASE_ANON_KEY,
			},
		},
	}
)
