import { createClient } from '@supabase/supabase-js';

// Usamos variables de entorno si existen, si no, usamos las claves hardcoded (fallback)
// Esto permite que el código sea compatible tanto con .env como con los valores directos.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://zukgpdveyexggaibhfxs.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp1a2dwZHZleWV4Z2dhaWJoZnhzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQyNjI3NTUsImV4cCI6MjA3OTgzODc1NX0.J8OCjDqwSsL7rdKmfe6JJtVV0Kh_iBLLsN5_qMqCWl0';

export const supabase = createClient(supabaseUrl, supabaseKey);