import { drizzle } from "drizzle-orm/node-postgres";
import { Client } from "pg";
import { jokes } from '../drizzle/schema.js';

const client = new Client({
  connectionString: process.env.COCKROACH_DB_URL,
});

export default async function handler(req, res) {

  await client.connect();
  const db = drizzle(client);

  if (req.method === 'GET') {
    try {
      const result = await db.select().from(jokes).limit(10);
      res.status(200).json(result);   
    } catch (error) {
      console.error('Error fetching jokes:', error);
      res.status(500).json({ error: 'Error fetching jokes' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}