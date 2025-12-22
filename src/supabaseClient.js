import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://hlmkozabiokkxflvcbjv.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhsbWtvemFiaW9ra3hmbHZjYmp2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYzNjI0MzksImV4cCI6MjA4MTkzODQzOX0.tSQAf-tuCLOL5t5sPzU7OtNdR-j0dBQXQELOyvVraes';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
