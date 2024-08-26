import { createClient } from '@supabase/supabase-js';

const URL = 'https://itxganmusotwaabkrzwg.supabase.co'
const API_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml0eGdhbm11c290d2FhYmtyendnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQ1OTc1NDgsImV4cCI6MjA0MDE3MzU0OH0.My9myErUI2_tzDfqlIF3YYj5SNbmnB2xwTbrwoqE834"

export const supabase = createClient(URL, API_KEY);