export type Json =
	| string
	| number
	| boolean
	| null
	| { [key: string]: Json }
	| Json[]

export interface Database {
	public: {
		Tables: {
			users: {
				Row: {
					email: string
					id: number
					name: string
				}
				Insert: {
					email: string
					id?: number
					name: string
				}
				Update: {
					email?: string
					id?: number
					name?: string
				}
				Relationships: []
			}
		}
		Views: {
			[_ in never]: never
		}
		Functions: {
			[_ in never]: never
		}
		Enums: {
			[_ in never]: never
		}
		CompositeTypes: {
			[_ in never]: never
		}
	}
}

export type UserRecord = Database["public"]["Tables"]["users"]["Row"]
