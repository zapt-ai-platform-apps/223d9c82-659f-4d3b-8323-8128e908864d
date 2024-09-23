import { createClient } from '@supabase/supabase-js'
import { drizzle } from "drizzle-orm/node-postgres";
import pg from 'pg';
const { Client } = pg;

const supabase = createClient(process.env.VITE_PUBLIC_SUPABASE_URL, process.env.VITE_PUBLIC_SUPABASE_ANON_KEY)

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

export async function getDatabaseClient() {
  const client = new Client({
    connectionString: process.env.COCKROACH_DB_URL,
  });
  await client.connect();
  return client;
}

export function getDrizzle(client) {
  return drizzle(client);
}

export { supabase };