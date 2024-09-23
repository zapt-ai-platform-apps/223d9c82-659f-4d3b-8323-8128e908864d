import { authenticateUser, db } from './_apiUtils.js';
import { jokes } from '../drizzle/schema.js';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    const user = await authenticateUser(req);
    
    const result = await db.select()
      .from(jokes)
      .where(jokes.userId.eq(user.id))
      .limit(10);

    res.status(200).json(result);
  } catch (error) {
    console.error('Error:', error);
    if (error.message.includes('Authorization') || error.message.includes('token')) {
      res.status(401).json({ error: 'Authentication failed' });
    } else {
      res.status(500).json({ error: 'Error fetching jokes' });
    }
  }
}