import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PricingModalProps {
  isOpen: boolean;
  onClose: () => void;
  plan: {
    name: string;
    price: string;
    features: string[];
  };
}

export default function PricingModal({ isOpen, onClose, plan }: PricingModalProps) {
  const [step, setStep] = useState<'details' | 'payment' | 'confirmation'>('details');
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    company: '',
    cardNumber: '',
    expiry: '',
    cvc: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('payment');
  };

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate payment processing
    setTimeout(() => {
      setStep('confirmation');
    }, 1500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/80 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-xl bg-black border border-white/10 rounded-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="relative p-6 border-b border-white/10">
              <h3 className="text-xl font-bold">{plan.name} Plan</h3>
              <button
                onClick={onClose}
                className="absolute right-6 top-6 text-gray-400 hover:text-white"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              {step === 'details' && (
                <motion.form
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  onSubmit={handleSubmit}
                  className="space-y-4"
                >
                  <div className="space-y-2">
                    <label className="text-sm text-gray-400">Email</label>
                    <input
                      type="email"
                      required
                      className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-gray-400">Full Name</label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-gray-400">Company (Optional)</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                      placeholder="Company Name"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3 px-6 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium 
                      hover:from-purple-700 hover:to-blue-700 transition-all"
                  >
                    Continue to Payment
                  </button>
                </motion.form>
              )}

              {step === 'payment' && (
                <motion.form
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  onSubmit={handlePayment}
                  className="space-y-4"
                >
                  <div className="space-y-2">
                    <label className="text-sm text-gray-400">Card Number</label>
                    <input
                      type="text"
                      required
                      maxLength={19}
                      className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                      placeholder="1234 5678 9012 3456"
                      value={formData.cardNumber}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
                        setFormData({ ...formData, cardNumber: value });
                      }}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm text-gray-400">Expiry Date</label>
                      <input
                        type="text"
                        required
                        maxLength={5}
                        className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                        placeholder="MM/YY"
                        value={formData.expiry}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, '').replace(/(\d{2})(\d)/, '$1/$2');
                          setFormData({ ...formData, expiry: value });
                        }}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm text-gray-400">CVC</label>
                      <input
                        type="text"
                        required
                        maxLength={3}
                        className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                        placeholder="123"
                        value={formData.cvc}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, '');
                          setFormData({ ...formData, cvc: value });
                        }}
                      />
                    </div>
                  </div>
                  <div className="pt-4">
                    <button
                      type="submit"
                      className="w-full py-3 px-6 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium 
                        hover:from-purple-700 hover:to-blue-700 transition-all"
                    >
                      Pay {plan.price}
                    </button>
                  </div>
                </motion.form>
              )}

              {step === 'confirmation' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                >
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center">
                    <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Payment Successful!</h3>
                  <p className="text-gray-400 mb-6">
                    Thank you for choosing {plan.name}. You'll receive a confirmation email shortly.
                  </p>
                  <button
                    onClick={onClose}
                    className="px-6 py-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
                  >
                    Close
                  </button>
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 