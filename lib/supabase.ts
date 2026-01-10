import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

if (!supabaseUrl || !supabaseAnonKey) {
	throw new Error('Supabase credentials are missing in environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Export types for use in components
export type Database = any
