import type { UserType } from "$lib/types"
import { writable } from "svelte/store"

export const users = writable<UserType[]>([])
