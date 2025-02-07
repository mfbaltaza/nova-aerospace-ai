"use client";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { TeamMember } from '@/types/TeamMember';

type MemberStatus = 'active' | 'away';

type EditedMember = {
  id: string;
  name: string;
  email: string;
  department: string;
  status: MemberStatus;
  role: string;
};

type MemberModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (member: Omit<TeamMember, 'id'>) => void;
  member?: TeamMember;
  title: string;
};

export default function MemberModal({ isOpen, onClose, onSubmit, member, title }: MemberModalProps) {
  const [editedMember, setEditedMember] = useState<EditedMember>({
    id: '',
    name: '',
    email: '',
    department: '',
    status: 'active',
    role: ''
  });

  useEffect(() => {
    if (member) {
      setEditedMember({
        id: member.id.toString(),
        name: member.name || '',
        email: member.email || '',
        department: member.department || '',
        status: member.status as MemberStatus,
        role: member.role || ''
      });
    }
  }, [member]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editedMember.name && editedMember.role) {
      const { ...submitMember } = editedMember;
      onSubmit(submitMember);
      onClose();
    }
  };

  const handleInputChange = (field: keyof EditedMember) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setEditedMember({ ...editedMember, [field]: e.target.value });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative bg-[#0B1120] rounded-xl p-6 w-full max-w-md border border-gray-800 shadow-xl"
          >
            <motion.h2 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xl font-bold mb-4 text-white"
            >
              {title}
            </motion.h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              {(['name', 'role', 'email', 'department'] as const).map((field, index) => (
                <motion.div
                  key={field}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <label className="block text-sm mb-1 text-white capitalize">{field}</label>
                  <input
                    type={field === 'email' ? 'email' : 'text'}
                    value={editedMember[field]}
                    onChange={handleInputChange(field)}
                    className="w-full bg-[#131B2E] rounded-lg px-4 py-2 text-white border border-gray-800 
                             focus:border-purple-500 focus:outline-none transition-all duration-200
                             hover:border-gray-700"
                    required={field === 'name' || field === 'role'}
                  />
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <label className="block text-sm mb-1 text-white">Status</label>
                <select
                  value={editedMember.status}
                  onChange={handleInputChange('status')}
                  className="w-full bg-[#131B2E] rounded-lg px-4 py-2 text-white border border-gray-800 
                           focus:border-purple-500 focus:outline-none transition-all duration-200
                           hover:border-gray-700"
                >
                  <option value="active">Active</option>
                  <option value="away">Away</option>
                </select>
              </motion.div>

              <motion.div 
                className="flex justify-end gap-3 mt-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-lg bg-[#131B2E] text-white hover:bg-[#1B2539] 
                           transition-all duration-200 hover:shadow-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700 
                           transition-all duration-200 hover:shadow-lg hover:scale-105"
                >
                  {member ? 'Update Member' : 'Add Member'}
                </button>
              </motion.div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
} 