import { createClient } from '@supabase/supabase-js';

const supabaseUrl =
  import.meta.env.VITE_SUPABASE_URL?.trim() || 'https://zukgpdveyexggaibhfxs.supabase.co';

const supabaseKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY?.trim() ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp1a2dwZHZleWV4Z2dhaWJoZnhzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQyNjI3NTUsImV4cCI6MjA3OTgzODc1NX0.J8OCjDqwSsL7rdKmfe6JJtVV0Kh_iBLLsN5_qMqCWl0';

export const supabase = createClient(supabaseUrl, supabaseKey);
