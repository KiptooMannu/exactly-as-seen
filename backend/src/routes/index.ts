import { Router } from 'express';
import { eq, desc, sql } from 'drizzle-orm';
import type { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import * as schema from '../db/schema.js';

const JWT_SECRET = process.env.JWT_SECRET || 'change-me-in-production';

// Auth middleware
function authMiddleware(req: any, res: any, next: any) {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ error: 'Unauthorized' });
  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ error: 'Invalid token' });
  }
}

export function createRoutes(db: PostgresJsDatabase<typeof schema>) {
  const router = Router();

  // ==================== AUTH ====================

  router.post('/auth/register', async (req, res) => {
    try {
      const { name, email, password, role } = req.body;
      const passwordHash = await bcrypt.hash(password, 10);
      const [user] = await db.insert(schema.users).values({ name, email, passwordHash, role }).returning();
      const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
      res.json({ user: { id: user.id, name: user.name, email: user.email, role: user.role }, token });
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  });

  router.post('/auth/login', async (req, res) => {
    try {
      const { email, password } = req.body;
      const [user] = await db.select().from(schema.users).where(eq(schema.users.email, email));
      if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
      const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
      res.json({ user: { id: user.id, name: user.name, email: user.email, role: user.role }, token });
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  });

  // ==================== FARMERS ====================

  router.get('/farmers', authMiddleware, async (_req, res) => {
    const farmers = await db.select().from(schema.farmers).orderBy(desc(schema.farmers.createdAt));
    res.json(farmers);
  });

  router.get('/farmers/:id', authMiddleware, async (req, res) => {
    const [farmer] = await db.select().from(schema.farmers).where(eq(schema.farmers.id, req.params.id));
    if (!farmer) return res.status(404).json({ error: 'Not found' });
    res.json(farmer);
  });

  router.post('/farmers', authMiddleware, async (req, res) => {
    try {
      const [farmer] = await db.insert(schema.farmers).values(req.body).returning();
      res.status(201).json(farmer);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  });

  router.put('/farmers/:id', authMiddleware, async (req, res) => {
    const [farmer] = await db.update(schema.farmers)
      .set({ ...req.body, updatedAt: new Date() })
      .where(eq(schema.farmers.id, req.params.id))
      .returning();
    res.json(farmer);
  });

  // ==================== DELIVERIES ====================

  router.get('/deliveries', authMiddleware, async (_req, res) => {
    const deliveries = await db.select({
      ...schema.deliveries,
      farmerName: schema.farmers.name,
    }).from(schema.deliveries)
      .leftJoin(schema.farmers, eq(schema.deliveries.farmerId, schema.farmers.id))
      .orderBy(desc(schema.deliveries.date));
    res.json(deliveries);
  });

  router.post('/deliveries', authMiddleware, async (req: any, res) => {
    try {
      const [delivery] = await db.insert(schema.deliveries)
        .values({ ...req.body, clerkId: req.user.id })
        .returning();
      res.status(201).json(delivery);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  });

  // ==================== INTERACTIONS ====================

  router.get('/interactions', authMiddleware, async (_req, res) => {
    const interactions = await db.select({
      ...schema.interactions,
      farmerName: schema.farmers.name,
    }).from(schema.interactions)
      .leftJoin(schema.farmers, eq(schema.interactions.farmerId, schema.farmers.id))
      .orderBy(desc(schema.interactions.date));
    res.json(interactions);
  });

  router.post('/interactions', authMiddleware, async (req: any, res) => {
    try {
      const [interaction] = await db.insert(schema.interactions)
        .values({ ...req.body, officerId: req.user.id })
        .returning();
      res.status(201).json(interaction);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  });

  // ==================== COMPLAINTS ====================

  router.get('/complaints', authMiddleware, async (_req, res) => {
    const complaints = await db.select({
      ...schema.complaints,
      farmerName: schema.farmers.name,
    }).from(schema.complaints)
      .leftJoin(schema.farmers, eq(schema.complaints.farmerId, schema.farmers.id))
      .orderBy(desc(schema.complaints.date));
    res.json(complaints);
  });

  router.post('/complaints', authMiddleware, async (req: any, res) => {
    try {
      const [complaint] = await db.insert(schema.complaints)
        .values({ ...req.body, clerkId: req.user.id })
        .returning();
      res.status(201).json(complaint);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  });

  router.patch('/complaints/:id', authMiddleware, async (req, res) => {
    const [complaint] = await db.update(schema.complaints)
      .set({ ...req.body, updatedAt: new Date() })
      .where(eq(schema.complaints.id, req.params.id))
      .returning();
    res.json(complaint);
  });

  // ==================== EXTENSION VISITS ====================

  router.get('/extension-visits', authMiddleware, async (_req, res) => {
    const visits = await db.select({
      ...schema.extensionVisits,
      farmerName: schema.farmers.name,
    }).from(schema.extensionVisits)
      .leftJoin(schema.farmers, eq(schema.extensionVisits.farmerId, schema.farmers.id))
      .orderBy(desc(schema.extensionVisits.date));
    res.json(visits);
  });

  router.post('/extension-visits', authMiddleware, async (req: any, res) => {
    try {
      const [visit] = await db.insert(schema.extensionVisits)
        .values({ ...req.body, officerId: req.user.id })
        .returning();
      res.status(201).json(visit);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  });

  // ==================== DASHBOARD STATS ====================

  router.get('/dashboard/stats', authMiddleware, async (_req, res) => {
    const [farmerCounts] = await db.select({
      total: sql<number>`count(*)`,
      active: sql<number>`count(*) filter (where ${schema.farmers.supplyStatus} = 'active')`,
      declining: sql<number>`count(*) filter (where ${schema.farmers.supplyStatus} = 'declining')`,
    }).from(schema.farmers);

    const [complaintCounts] = await db.select({
      open: sql<number>`count(*) filter (where ${schema.complaints.status} = 'open')`,
      inProgress: sql<number>`count(*) filter (where ${schema.complaints.status} = 'in_progress')`,
    }).from(schema.complaints);

    res.json({ farmers: farmerCounts, complaints: complaintCounts });
  });

  return router;
}
