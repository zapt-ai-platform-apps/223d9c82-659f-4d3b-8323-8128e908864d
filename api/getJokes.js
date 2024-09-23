import { drizzle } from "drizzle-orm/node-postgres";
import pg from 'pg';
const { Client } = pg;
import { jokes } from '../drizzle/schema.js';

export default async function handler(req, res) {
  const client = new Client({
    connectionString: process.env.COCKROACH_DB_URL,
  });

  if (req.method === 'GET') {
    try {
      await client.connect();
      const db = drizzle(client);
      
      const result = await db.select().from(jokes).limit(10);
      res.status(200).json(result);
    } catch (error) {
      console.error('Error fetching jokes:', error);
      res.status(500).json({ error: 'Error fetching jokes' });
    } finally {
      await client.end();
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}