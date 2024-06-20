
import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://credbjrazvomzlktbkva.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNyZWRianJhenZvbXpsa3Ria3ZhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTg5MDYwNjcsImV4cCI6MjAzNDQ4MjA2N30.PudZRs0BVTxq3TD0T6zXdOX-F9ReioevOgeN47EJ3jE"
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase