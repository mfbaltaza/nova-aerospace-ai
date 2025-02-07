"use client";
import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import MemberModal from '@/components/MemberModal';
import DeleteConfirmation from '@/components/DeleteConfirmation';
import type { TeamMember } from '@/types/TeamMember';

// Sample data - in a real app, this would come from an API
const missionData = Array.from({ length: 30 }, (_, i) => ({
  date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toLocaleDateString(),
  success: Math.floor(Math.random() * 100),
  efficiency: 75 + Math.random() * 20,
  resources: 80 + Math.random() * 15,
}));

// Update the teamMembers data to include more fields
const initialTeamMembers: TeamMember[] = [
  { 
    id: 1, 
    name: 'Sarah Connor', 
    role: 'Mission Specialist', 
    status: 'active',
    email: 'sarah.connor@nova.space',
    department: 'Operations'
  },
  { id: 2, name: 'John Smith', role: 'Engineer', status: 'away' },
  { id: 3, name: 'Maria Garcia', role: 'Data Analyst', status: 'active' },
  // Add more team members as needed
];

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(initialTeamMembers);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<TeamMember | undefined>();

  const handleAddMember = (memberData: Omit<TeamMember, 'id'>) => {
    const newMember = {
      ...memberData,
      id: Math.max(0, ...teamMembers.map(m => m.id)) + 1,
    };
    setTeamMembers([...teamMembers, newMember]);
  };

  const handleEditMember = (memberData: Omit<TeamMember, 'id'>) => {
    if (!selectedMember) return;
    const updatedMembers = teamMembers.map(member =>
      member.id === selectedMember.id ? { ...memberData, id: member.id } : member
    );
    setTeamMembers(updatedMembers);
  };

  const handleDeleteMember = () => {
    if (!selectedMember) return;
    const updatedMembers = teamMembers.filter(member => member.id !== selectedMember.id);
    setTeamMembers(updatedMembers);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Background Effects */}
      <div className="fixed inset-0 bg-[url('/stars.png')] opacity-30" />
      <div className="fixed inset-0 bg-gradient-to-b from-purple-900/20 via-black to-black" />
      
      {/* Content */}
      <div className="relative">
        {/* Header */}
        <header className="border-b border-white/10 bg-black/50 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-600 to-blue-600 animate-pulse" />
                <h1 className="text-2xl font-bold">Mission Control</h1>
              </div>
              <nav className="flex gap-4">
                <button 
                  onClick={() => setActiveTab('overview')}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    activeTab === 'overview' 
                      ? 'bg-white/10 text-white' 
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Overview
                </button>
                <button 
                  onClick={() => setActiveTab('team')}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    activeTab === 'team' 
                      ? 'bg-white/10 text-white' 
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Team
                </button>
              </nav>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 py-8">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { title: 'Mission Success Rate', value: '94%', trend: '+2.5%' },
                  { title: 'Resource Efficiency', value: '87%', trend: '+1.2%' },
                  { title: 'Active Missions', value: '12', trend: '+3' },
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-6 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm
                      hover:border-purple-500/50 transition-all group"
                  >
                    <h3 className="text-gray-400 text-sm mb-2">{stat.title}</h3>
                    <div className="flex items-end gap-2">
                      <div className="text-3xl font-bold">{stat.value}</div>
                      <div className="text-green-500 text-sm">{stat.trend}</div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Mission Success Chart */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-6 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm"
                >
                  <h3 className="text-xl font-bold mb-4">Mission Success Trend</h3>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={missionData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                        <XAxis 
                          dataKey="date" 
                          stroke="#ffffff60"
                          tick={{ fill: '#ffffff60' }}
                        />
                        <YAxis 
                          stroke="#ffffff60"
                          tick={{ fill: '#ffffff60' }}
                        />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: '#000',
                            border: '1px solid rgba(255,255,255,0.1)',
                            borderRadius: '8px'
                          }}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="success" 
                          stroke="#8b5cf6" 
                          strokeWidth={2}
                          dot={false}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </motion.div>

                {/* Resource Usage Chart */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="p-6 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm"
                >
                  <h3 className="text-xl font-bold mb-4">Resource Utilization</h3>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={missionData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                        <XAxis 
                          dataKey="date" 
                          stroke="#ffffff60"
                          tick={{ fill: '#ffffff60' }}
                        />
                        <YAxis 
                          stroke="#ffffff60"
                          tick={{ fill: '#ffffff60' }}
                        />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: '#000',
                            border: '1px solid rgba(255,255,255,0.1)',
                            borderRadius: '8px'
                          }}
                        />
                        <Area
                          type="monotone"
                          dataKey="resources"
                          stroke="#3b82f6"
                          fill="url(#colorResources)"
                          strokeWidth={2}
                        />
                        <defs>
                          <linearGradient id="colorResources" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </motion.div>
              </div>
            </div>
          )}

          {activeTab === 'team' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Team Members</h2>
                <button 
                  onClick={() => setIsAddModalOpen(true)}
                  className="px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 transition-colors"
                >
                  Add Member
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {teamMembers.map((member) => (
                  <motion.div
                    key={member.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-6 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm
                      hover:border-purple-500/50 transition-all group"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-bold mb-1">{member.name}</h3>
                        <p className="text-sm text-gray-400">{member.role}</p>
                        {member.email && (
                          <p className="text-sm text-gray-500 mt-1">{member.email}</p>
                        )}
                        {member.department && (
                          <p className="text-sm text-gray-500">{member.department}</p>
                        )}
                      </div>
                      <div className="flex flex-col gap-2">
                        <div className={`w-2 h-2 rounded-full ${
                          member.status === 'active' ? 'bg-green-500' : 'bg-yellow-500'
                        }`} />
                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              setSelectedMember(member);
                              setIsEditModalOpen(true);
                            }}
                            className="p-1 hover:text-purple-400 transition-colors"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => {
                              setSelectedMember(member);
                              setIsDeleteModalOpen(true);
                            }}
                            className="p-1 hover:text-red-400 transition-colors"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <MemberModal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                onSubmit={handleAddMember}
                title="Add Team Member"
              />

              <MemberModal
                isOpen={isEditModalOpen}
                onClose={() => {
                  setIsEditModalOpen(false);
                  setSelectedMember(undefined);
                }}
                onSubmit={handleEditMember}
                member={selectedMember}
                title="Edit Team Member"
              />

              <DeleteConfirmation
                isOpen={isDeleteModalOpen}
                onClose={() => {
                  setIsDeleteModalOpen(false);
                  setSelectedMember(undefined);
                }}
                onConfirm={handleDeleteMember}
                memberName={selectedMember?.name || ''}
              />
            </motion.div>
          )}
        </main>
      </div>
    </div>
  );
} 