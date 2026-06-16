const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  'https://vzufbqncbawoxrptxzuw.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ6dWZicW5jYmF3b3hycHR4enV3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk5OTYzMjgsImV4cCI6MjA5NTU3MjMyOH0.lgzn0USZY35R9rcx7GQoJnQTkFTEBff_cuJeN1v0aPg'
);

module.exports = supabase;
