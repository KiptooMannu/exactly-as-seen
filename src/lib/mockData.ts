import type { Farmer, Delivery, Interaction, Complaint, ExtensionVisit, StaffMetric } from '@/types/farmer';

export const mockFarmers: Farmer[] = [
  { id: '1', farmerId: 'FRM-001', name: 'James Kipchoge', nationalId: '12345678', phone: '0712345678', route: 'Kericho North', village: 'Kapkatet', totalFarmArea: 5.2, teaHectarage: 3.8, teaVariety: 'TRFK 6/8', yearOfPlanting: 2010, gapScore: 85, avgMonthlySupply: 1200, qualityGradeTrend: 'improving', supplyStatus: 'active', loyaltyTier: 'gold' },
  { id: '2', farmerId: 'FRM-002', name: 'Mary Wanjiku', nationalId: '23456789', phone: '0723456789', route: 'Nandi Hills', village: 'Chemase', totalFarmArea: 3.0, teaHectarage: 2.1, teaVariety: 'TRFK 31/8', yearOfPlanting: 2015, gapScore: 92, avgMonthlySupply: 800, qualityGradeTrend: 'stable', supplyStatus: 'active', loyaltyTier: 'platinum' },
  { id: '3', farmerId: 'FRM-003', name: 'Peter Omondi', nationalId: '34567890', phone: '0734567890', route: 'Bomet Central', village: 'Silibwet', totalFarmArea: 8.0, teaHectarage: 5.5, teaVariety: 'Purple Tea', yearOfPlanting: 2008, gapScore: 68, avgMonthlySupply: 450, qualityGradeTrend: 'declining', supplyStatus: 'declining', loyaltyTier: 'silver' },
  { id: '4', farmerId: 'FRM-004', name: 'Grace Chebet', nationalId: '45678901', phone: '0745678901', route: 'Kericho South', village: 'Litein', totalFarmArea: 2.5, teaHectarage: 1.8, teaVariety: 'TRFK 6/8', yearOfPlanting: 2018, gapScore: 78, avgMonthlySupply: 600, qualityGradeTrend: 'improving', supplyStatus: 'active', loyaltyTier: 'gold' },
  { id: '5', farmerId: 'FRM-005', name: 'Samuel Rotich', nationalId: '56789012', phone: '0756789012', route: 'Nandi Hills', village: 'Kapsabet', totalFarmArea: 12.0, teaHectarage: 8.0, teaVariety: 'TRFK 31/8', yearOfPlanting: 2005, gapScore: 55, avgMonthlySupply: 200, qualityGradeTrend: 'declining', supplyStatus: 'seasonal', loyaltyTier: 'bronze' },
  { id: '6', farmerId: 'FRM-006', name: 'Alice Jepkosgei', nationalId: '67890123', phone: '0767890123', route: 'Bomet Central', village: 'Longisa', totalFarmArea: 4.0, teaHectarage: 3.0, teaVariety: 'TRFK 6/8', yearOfPlanting: 2012, gapScore: 90, avgMonthlySupply: 1500, qualityGradeTrend: 'stable', supplyStatus: 'active', loyaltyTier: 'platinum' },
];

export const mockDeliveries: Delivery[] = [
  { id: '1', date: '2026-03-14', farmerId: '1', farmerName: 'James Kipchoge', kg: 45, qualityGrade: 'A', buyingCenter: 'Kapkatet BC', clerkId: '1' },
  { id: '2', date: '2026-03-14', farmerId: '2', farmerName: 'Mary Wanjiku', kg: 32, qualityGrade: 'A', buyingCenter: 'Chemase BC', clerkId: '1' },
  { id: '3', date: '2026-03-13', farmerId: '4', farmerName: 'Grace Chebet', kg: 28, qualityGrade: 'B', buyingCenter: 'Litein BC', clerkId: '2' },
  { id: '4', date: '2026-03-13', farmerId: '6', farmerName: 'Alice Jepkosgei', kg: 55, qualityGrade: 'A', buyingCenter: 'Longisa BC', clerkId: '2' },
  { id: '5', date: '2026-03-12', farmerId: '3', farmerName: 'Peter Omondi', kg: 15, qualityGrade: 'C', buyingCenter: 'Silibwet BC', clerkId: '1' },
];

export const mockInteractions: Interaction[] = [
  { id: '1', date: '2026-03-14', farmerId: '1', farmerName: 'James Kipchoge', type: 'buying_center', notes: 'Discussed fertilizer application schedule. Farmer pleased with recent payments.', officerId: '1' },
  { id: '2', date: '2026-03-13', farmerId: '3', farmerName: 'Peter Omondi', type: 'farm_visit', notes: 'Farm visit to assess declining supply. Found pest infestation on 2 hectares.', officerId: '2' },
  { id: '3', date: '2026-03-12', farmerId: '5', farmerName: 'Samuel Rotich', type: 'follow_up', notes: 'Follow up on pruning advice given last month. Farmer partially implemented.', officerId: '2' },
  { id: '4', date: '2026-03-11', farmerId: '2', farmerName: 'Mary Wanjiku', type: 'campaign', notes: 'Invited to GAP compliance workshop. Confirmed attendance.', officerId: '1' },
];

export const mockComplaints: Complaint[] = [
  { id: '1', date: '2026-03-13', farmerId: '3', farmerName: 'Peter Omondi', issueType: 'payment_delay', description: 'February payment not yet received.', status: 'open', resolution: '' },
  { id: '2', date: '2026-03-10', farmerId: '5', farmerName: 'Samuel Rotich', issueType: 'fertilizer', description: 'Did not receive allocated fertilizer this quarter.', status: 'in_progress', resolution: 'Coordinating with supply team.' },
  { id: '3', date: '2026-03-05', farmerId: '1', farmerName: 'James Kipchoge', issueType: 'pest', description: 'Red spider mites affecting quality of leaves.', status: 'resolved', resolution: 'Extension officer visited and recommended Abamectin spray. Farmer applied successfully.' },
];

export const mockVisits: ExtensionVisit[] = [
  { id: '1', date: '2026-03-13', farmerId: '3', farmerName: 'Peter Omondi', purpose: 'Pest assessment', observations: 'Red spider mites on 2 hectares. Bushes showing stress.', adviceType: 'Pest Management', recommendedAction: 'Apply Abamectin spray, improve drainage.', followUpDate: '2026-03-27', followUpOutcome: '', officerId: '2' },
  { id: '2', date: '2026-03-10', farmerId: '5', farmerName: 'Samuel Rotich', purpose: 'Pruning guidance', observations: 'Overgrown bushes, poor plucking table.', adviceType: 'Agronomic', recommendedAction: 'Carry out level pruning by end of March.', followUpDate: '2026-04-10', followUpOutcome: '', officerId: '2' },
  { id: '3', date: '2026-03-06', farmerId: '2', farmerName: 'Mary Wanjiku', purpose: 'GAP compliance check', observations: 'Excellent farm management. Records well kept.', adviceType: 'Certification', recommendedAction: 'Proceed with RA certification application.', followUpDate: '2026-04-01', followUpOutcome: '', officerId: '1' },
];

export const mockStaffMetrics: StaffMetric[] = [
  { id: '1', name: 'John Kiptoo', role: 'clerk', volumeHandled: 15200, complaintResolutionDays: 3.2, farmerRetention: 94, visitFrequency: 0, adviceFollowUp: 0 },
  { id: '2', name: 'Sarah Chepng\'eno', role: 'clerk', volumeHandled: 12800, complaintResolutionDays: 2.1, farmerRetention: 97, visitFrequency: 0, adviceFollowUp: 0 },
  { id: '3', name: 'David Langat', role: 'extension_officer', volumeHandled: 0, complaintResolutionDays: 0, farmerRetention: 0, visitFrequency: 18, adviceFollowUp: 82 },
  { id: '4', name: 'Nancy Jeptoo', role: 'extension_officer', volumeHandled: 0, complaintResolutionDays: 0, farmerRetention: 0, visitFrequency: 22, adviceFollowUp: 91 },
];

export const buyingCenters = ['Kapkatet BC', 'Chemase BC', 'Litein BC', 'Longisa BC', 'Silibwet BC', 'Kapsabet BC'];
export const routes = ['Kericho North', 'Kericho South', 'Nandi Hills', 'Bomet Central'];
export const teaVarieties = ['TRFK 6/8', 'TRFK 31/8', 'TRFK 301/3', 'Purple Tea', 'Clone 12/12'];
export const interactionTypes = [
  { value: 'farm_visit', label: 'Farm Visit' },
  { value: 'buying_center', label: 'Buying Center Discussion' },
  { value: 'complaint', label: 'Complaint' },
  { value: 'follow_up', label: 'Follow-up Visit' },
  { value: 'campaign', label: 'Campaign Activity' },
];
export const complaintTypes = [
  { value: 'payment_delay', label: 'Payment Delay' },
  { value: 'fertilizer', label: 'Fertilizer Issues' },
  { value: 'pest', label: 'Pest Infestation' },
  { value: 'weather', label: 'Weather Damage' },
  { value: 'service', label: 'Service Dissatisfaction' },
  { value: 'competitor', label: 'Competitor Influence' },
];
