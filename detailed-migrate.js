import { drizzle } from 'drizzle-orm/node-postgres';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import pg from 'pg';

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.COCKROACH_DB_URL,
});

const db = drizzle(pool);

async function runMigrationWithExplicitCommit() {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    await migrate(db, { migrationsFolder: './drizzle' });
    await client.query('COMMIT');
    console.log('Migration committed successfully');
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Migration failed:', error);
    process.exit(1);
  } finally {
    client.release();
    await pool.end();
  }
}

runMigrationWithExplicitCommit();