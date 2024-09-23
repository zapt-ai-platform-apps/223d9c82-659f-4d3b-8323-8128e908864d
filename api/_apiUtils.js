import { createClient } from '@supabase/supabase-js'

import { Pool } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';

const pool = new Pool({ connectionString: process.env.NEON_DB_URL });
const db = drizzle(pool)

const supabase = createClient(process.env.VITE_PUBLIC_SUPABASE_URL, process.env.VITE_PUBLIC_SUPABASE_ANON_KEY)

export { supabase, db };

export async function authenticateUser(req) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    throw new Error('Missing Authorization header');
  }

  const token = authHeader.split(' ')[1];
  const { data: { user }, error } = await supabase.auth.getUser(token);

  if (error) {
    throw new Error('Invalid token');
  }

  return user;
}