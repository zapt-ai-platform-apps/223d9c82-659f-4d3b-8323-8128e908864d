import { authenticateUser, getDatabaseClient, getDrizzle } from './_apiUtils';
import { jokes } from '../drizzle/schema.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  let client;
  try {
    const user = await authenticateUser(req);
    client = await getDatabaseClient();
    const db = getDrizzle(client);

    const { setup, punchline } = req.body;

    if (!setup || !punchline) {
      return res.status(400).json({ error: 'Setup and punchline are required' });
    }

    const result = await db.insert(jokes).values({ 
      setup, 
      punchline,
      userId: user.id
    }).returning();

    res.status(201).json(result[0]);
  } catch (error) {
    console.error('Error saving joke:', error);
    if (error.message.includes('Authorization') || error.message.includes('token')) {
      res.status(401).json({ error: 'Authentication failed' });
    } else {
      res.status(500).json({ error: 'Error saving joke' });
    }
  } finally {
    if (client) {
      await client.end();
    }
  }
}