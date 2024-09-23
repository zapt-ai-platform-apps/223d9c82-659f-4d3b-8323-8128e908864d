import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./drizzle/schema.js",
  out: "./drizzle",
  dbCredentials: {
    url: process.env.COCKROACH_DB_URL,
  },
  verbose: true
});