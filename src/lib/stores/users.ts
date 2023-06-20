import type { UserRecord } from "$lib/supabase"
import { writable } from "svelte/store"

export const users = writable<UserRecord[]>([])
