import { pgTable, bigint, text, timestamp, sql, uuid} from 'drizzle-orm/pg-core';

export const jokes = pgTable('jokes', {
  id: bigint('id', { mode: 'number' }).primaryKey().notNull().default(sql`unique_rowid()`),
  setup: text('setup').notNull(),
  punchline: text('punchline').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  userId: uuid('user_id').notNull()
});