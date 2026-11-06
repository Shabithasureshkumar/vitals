export type TimeRange = 'Day' | 'Week' | 'Month';

export type VitalStatus = 'Normal' | 'Borderline' | 'Critical' | 'Moderate' | 'Good' | 'Optimal' | 'Elevated' | 'Low';

export interface VitalMetric {
  id: string;
  name: string;
  value: string | number;
  unit: string;
  status: VitalStatus;
  trendText: string;
  trendDirection: 'up' | 'down' | 'neutral';
  trendType?: 'positive' | 'negative' | 'neutral' | 'warning';
  iconType: 'heart' | 'bp' | 'oxygen' | 'temp' | 'weight' | 'glucose' | 'activity' | 'sleep';
  deviceVisualType: 'heart-3d' | 'bp-monitor' | 'oximeter' | 'thermometer' | 'scale' | 'glucometer' | 'runner' | 'sleep-moon';
  secondaryValue?: number; // e.g. steps progress 84%
  color: string;
}

export interface VitalReading {
  id: string;
  date: string;
  time: string;
  value: string | number;
  numericValue?: number;
  unit: string;
  status: VitalStatus;
  source: string;
  notes?: string;
}

export interface MetricDetailConfig {
  id: string;
  name: string;
  unit: string;
  currentValue: string | number;
  status: VitalStatus;
  trendText: string;
  trendDirection: 'up' | 'down' | 'neutral';
  iconType: VitalMetric['iconType'];
  deviceVisualType: VitalMetric['deviceVisualType'];
  targetRange: string;
  normalMin?: number;
  normalMax?: number;
  averageValue: string | number;
  lowestValue: string | number;
  highestValue: string | number;
  inRangePercent: number;
  variationAnalysis: {
    status: 'Optimal' | 'Normal' | 'Mild Fluctuation' | 'Borderline';
    description: string;
  };
  empathyNote: {
    title: string;
    message: string;
    sentiment: 'encouraging' | 'supportive' | 'alert';
  };
  aiRecommendations: string[];
  readings: VitalReading[];
}

export interface ConnectedDevice {
  id: string;
  name: string;
  type: 'bp' | 'watch' | 'oximeter' | 'scale' | 'glucose';
  status: 'active' | 'syncing' | 'offline';
  lastSynced: string;
  batteryLevel?: number;
}

export interface ChecklistItem {
  id: string;
  title: string;
  subtitle?: string;
  completed: boolean;
  time?: string;
}

export interface AISynthesisData {
  title: string;
  subtitle: string;
  lastUpdated: string;
  keyInsights: string[];
  observation: string;
  recommendation: string;
}

export interface PatientInfo {
  name: string;
  role: string;
  avatarUrl: string;
  patientName?: string;
  age?: number;
  bloodType?: string;
}
