export type TeamMember = {
  id: number;
  name: string;
  role: string;
  status: 'active' | 'away';
  email?: string;
  department?: string;
}; 