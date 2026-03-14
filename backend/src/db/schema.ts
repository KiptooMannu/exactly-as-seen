import { pgTable, uuid, text, integer, real, date, timestamp, pgEnum } from 'drizzle-orm/pg-core';

// ==================== ENUMS ====================

export const userRoleEnum = pgEnum('user_role', ['clerk', 'extension_officer', 'admin']);
export const supplyStatusEnum = pgEnum('supply_status', ['active', 'seasonal', 'declining', 'inactive']);
export const qualityTrendEnum = pgEnum('quality_trend', ['improving', 'stable', 'declining']);
export const loyaltyTierEnum = pgEnum('loyalty_tier', ['platinum', 'gold', 'silver', 'bronze']);
export const qualityGradeEnum = pgEnum('quality_grade', ['A', 'B', 'C', 'D']);
export const interactionTypeEnum = pgEnum('interaction_type', ['farm_visit', 'buying_center', 'complaint', 'follow_up', 'campaign']);
export const complaintStatusEnum = pgEnum('complaint_status', ['open', 'in_progress', 'resolved']);
export const issueTypeEnum = pgEnum('issue_type', ['payment_delay', 'fertilizer', 'pest', 'weather', 'service', 'competitor']);

// ==================== TABLES ====================

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  role: userRoleEnum('role').notNull().default('clerk'),
  createdAt: timestamp('created_at').defaultNow(),
});

export const farmers = pgTable('farmers', {
  id: uuid('id').primaryKey().defaultRandom(),
  farmerId: text('farmer_id').notNull().unique(), // e.g. FRM-001
  name: text('name').notNull(),
  nationalId: text('national_id').notNull(),
  phone: text('phone').notNull(),
  route: text('route').notNull(),
  village: text('village'),
  totalFarmArea: real('total_farm_area'),   // hectares
  teaHectarage: real('tea_hectarage'),
  teaVariety: text('tea_variety'),
  yearOfPlanting: integer('year_of_planting'),
  gapScore: integer('gap_score').default(0),
  avgMonthlySupply: real('avg_monthly_supply').default(0),
  qualityGradeTrend: qualityTrendEnum('quality_grade_trend').default('stable'),
  supplyStatus: supplyStatusEnum('supply_status').default('active'),
  loyaltyTier: loyaltyTierEnum('loyalty_tier').default('bronze'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const deliveries = pgTable('deliveries', {
  id: uuid('id').primaryKey().defaultRandom(),
  date: date('date').notNull(),
  farmerId: uuid('farmer_id').notNull().references(() => farmers.id),
  kg: real('kg').notNull(),
  qualityGrade: qualityGradeEnum('quality_grade').notNull(),
  buyingCenter: text('buying_center').notNull(),
  clerkId: uuid('clerk_id').notNull().references(() => users.id),
  createdAt: timestamp('created_at').defaultNow(),
});

export const interactions = pgTable('interactions', {
  id: uuid('id').primaryKey().defaultRandom(),
  date: date('date').notNull(),
  farmerId: uuid('farmer_id').notNull().references(() => farmers.id),
  type: interactionTypeEnum('type').notNull(),
  notes: text('notes'),
  officerId: uuid('officer_id').notNull().references(() => users.id),
  createdAt: timestamp('created_at').defaultNow(),
});

export const complaints = pgTable('complaints', {
  id: uuid('id').primaryKey().defaultRandom(),
  date: date('date').notNull(),
  farmerId: uuid('farmer_id').notNull().references(() => farmers.id),
  issueType: issueTypeEnum('issue_type').notNull(),
  description: text('description'),
  status: complaintStatusEnum('status').notNull().default('open'),
  resolution: text('resolution'),
  clerkId: uuid('clerk_id').references(() => users.id),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const extensionVisits = pgTable('extension_visits', {
  id: uuid('id').primaryKey().defaultRandom(),
  date: date('date').notNull(),
  farmerId: uuid('farmer_id').notNull().references(() => farmers.id),
  purpose: text('purpose').notNull(),
  observations: text('observations'),
  adviceType: text('advice_type'),
  recommendedAction: text('recommended_action'),
  followUpDate: date('follow_up_date'),
  followUpOutcome: text('follow_up_outcome'),
  officerId: uuid('officer_id').notNull().references(() => users.id),
  createdAt: timestamp('created_at').defaultNow(),
});
