import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://bwqalwancrvxeydcrlsi.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ3cWFsd2FuY3J2eGV5ZGNybHNpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI4NDA1MjgsImV4cCI6MjA1ODQxNjUyOH0.1QHHmRchKI96DTqJvQ_gsJGzA3uX3pYGa_CzleqbXeQ";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
