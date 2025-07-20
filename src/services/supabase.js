import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://tnkjcgrvirublbatmdcc.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRua2pjZ3J2aXJ1YmxiYXRtZGNjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIwMTgyMTQsImV4cCI6MjA2NzU5NDIxNH0.HiLEhxvoZM48hlGGLfx8GMA2cUwboKDbb3oNUGjX2jQ";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
