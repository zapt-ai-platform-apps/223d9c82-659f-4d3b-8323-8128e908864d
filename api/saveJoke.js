import { drizzle } from "drizzle-orm/node-postgres";
import pg from 'pg';
const { Client } = pg;
import { jokes } from '../drizzle/schema.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const client = new Client({
    connectionString: process.env.COCKROACH_DB_URL,
  });

  try {
    await client.connect();
    const db = drizzle(client);

    const { setup, punchline } = req.body;

    if (!setup || !punchline) {
      return res.status(400).json({ error: 'Setup and punchline are required' });
    }

    const result = await db.insert(jokes).values({ setup, punchline }).returning();
    res.status(201).json(result[0]);
  } catch (error) {
    console.error('Error saving joke:', error);
    res.status(500).json({ error: 'Error saving joke' });
  } finally {
    await client.end();
  }
}