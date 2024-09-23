import { jokes } from '../drizzle/schema.js';
import { Pool } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import { authenticateUser } from "./_apiUtils.js"

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    const user = await authenticateUser(req);

    const { setup, punchline } = req.body;

    if (!setup || !punchline) {
      return res.status(400).json({ error: 'Setup and punchline are required' });
    }

    const pool = new Pool({ connectionString: env.NEON_DB_URL });
    const db = drizzle(pool)
    
    const result = await db.insert(jokes).values({ 
      setup, 
      punchline,
      userId: user.id
    }).returning();

    const [post] = await pool.query('SELECT * FROM posts WHERE id = $1', [postId]);


    res.status(201).json(result[0]);
  } catch (error) {
    console.error('Error saving joke:', error);
    if (error.message.includes('Authorization') || error.message.includes('token')) {
      res.status(401).json({ error: 'Authentication failed' });
    } else {
      res.status(500).json({ error: 'Error saving joke' });
    }
  }
}