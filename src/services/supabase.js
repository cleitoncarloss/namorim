import { createClient } from '@supabase/supabase-js';

// IMPORTANT: Replace with your own Supabase URL and anon key
const supabaseUrl = 'https://dycnvdicqnrhxzhrgeya.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR5Y252ZGljcW5yaHh6aHJnZXlhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjgwMTM0OTAsImV4cCI6MjA4MzU4OTQ5MH0.2x6-Y2WlMmPZJsn_U1sWG-b1iSVFUoL2BEORR5pacaA';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
