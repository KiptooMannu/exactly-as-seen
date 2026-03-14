import express from 'express';
import cors from 'cors';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import dotenv from 'dotenv';
import * as schema from './db/schema.js';
import { createRoutes } from './routes/index.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Database connection
const connectionString = process.env.DATABASE_URL!;
const client = postgres(connectionString);
const db = drizzle(client, { schema });

// Routes
app.use('/api', createRoutes(db));

// Health check
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🌿 Farmer CRM API running on port ${PORT}`);
});

export { db };
