"use client";
import { motion, AnimatePresence } from 'framer-motion';

type DeleteConfirmationProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  memberName: string;
};

export default function DeleteConfirmation({ isOpen, onClose, onConfirm, memberName }: DeleteConfirmationProps) {
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
              Delete Member
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-gray-300 mb-6"
            >
              Are you sure you want to delete {memberName}? This action cannot be undone.
            </motion.p>
            <motion.div
              className="flex justify-end gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-lg bg-[#131B2E] text-white hover:bg-[#1B2539] 
                         transition-all duration-200 hover:shadow-lg"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  onConfirm();
                  onClose();
                }}
                className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 
                         transition-all duration-200 hover:shadow-lg hover:scale-105"
              >
                Delete
              </button>
            </motion.div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
} 