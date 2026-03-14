export type UserRole = 'clerk' | 'extension_officer' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface Farmer {
  id: string;
  farmerId: string;
  name: string;
  nationalId: string;
  phone: string;
  route: string;
  village: string;
  totalFarmArea: number;
  teaHectarage: number;
  teaVariety: string;
  yearOfPlanting: number;
  gapScore: number;
  avgMonthlySupply: number;
  qualityGradeTrend: 'improving' | 'stable' | 'declining';
  supplyStatus: 'active' | 'seasonal' | 'declining' | 'inactive';
  loyaltyTier: 'platinum' | 'gold' | 'silver' | 'bronze';
}

export interface Delivery {
  id: string;
  date: string;
  farmerId: string;
  farmerName: string;
  kg: number;
  qualityGrade: 'A' | 'B' | 'C' | 'D';
  buyingCenter: string;
  clerkId: string;
}

export interface Interaction {
  id: string;
  date: string;
  farmerId: string;
  farmerName: string;
  type: 'farm_visit' | 'buying_center' | 'complaint' | 'follow_up' | 'campaign';
  notes: string;
  officerId: string;
}

export interface Complaint {
  id: string;
  date: string;
  farmerId: string;
  farmerName: string;
  issueType: 'payment_delay' | 'fertilizer' | 'pest' | 'weather' | 'service' | 'competitor';
  description: string;
  status: 'open' | 'in_progress' | 'resolved';
  resolution: string;
}

export interface ExtensionVisit {
  id: string;
  date: string;
  farmerId: string;
  farmerName: string;
  purpose: string;
  observations: string;
  adviceType: string;
  recommendedAction: string;
  followUpDate: string;
  followUpOutcome: string;
  officerId: string;
}

export interface StaffMetric {
  id: string;
  name: string;
  role: UserRole;
  volumeHandled: number;
  complaintResolutionDays: number;
  farmerRetention: number;
  visitFrequency: number;
  adviceFollowUp: number;
}
