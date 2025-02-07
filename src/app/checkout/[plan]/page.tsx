"use client";
import { useState, use, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Image from 'next/image';
import confetti from 'canvas-confetti';

type Step = 'details' | 'payment' | 'confirmation';

interface CheckoutPageProps {
  params: Promise<{ plan: string }>;
}

interface Timer {
  [Symbol.dispose](): void;
  ref(): Timer;
  unref(): Timer;
}

const steps = [
  {
    number: 1,
    title: 'Details',
    description: 'Basic information',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    )
  },
  {
    number: 2,
    title: 'Payment',
    description: 'Secure checkout',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
          d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
      </svg>
    )
  },
  {
    number: 3,
    title: 'Confirmation',
    description: 'Ready for launch',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
          d="M5 13l4 4L19 7" />
      </svg>
    )
  }
];

export default function CheckoutPage({ params }: CheckoutPageProps) {
  const router = useRouter();
  const { plan } = use(params);
  const [currentStep, setCurrentStep] = useState<Step>('details');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    company: '',
    cardNumber: '',
    expiry: '',
    cvc: '',
  });
  const [showInvoice, setShowInvoice] = useState(false);
  
  const decodedPlan = decodeURIComponent(plan);
  const planDetails = {
    Startup: {
      name: "Startup",
      price: "$999/mo",
      features: [
        "Access to Quantum Propulsion API",
        "Basic mission support",
        "5 team members",
        "Community access",
        "Email support"
      ]
    },
    Enterprise: {
      name: "Enterprise",
      price: "$4,999/mo",
      features: [
        "Full technology stack access",
        "Priority mission control",
        "Unlimited team members",
        "24/7 support",
        "Custom integration",
        "Dedicated account manager"
      ]
    }
  }[decodedPlan];

  const invoiceNumber = `INV-${Date.now().toString().slice(-6)}`;
  const invoiceDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const handleDetailsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentStep('payment');
  };

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 1500));
    setLoading(false);
    setCurrentStep('confirmation');
  };

  useEffect(() => {
    if (currentStep === 'confirmation') {
      // Trigger confetti
      const duration = 3 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

      function randomInRange(min: number, max: number) {
        return Math.random() * (max - min) + min;
      }

      const interval: Timer = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          clearInterval(interval as unknown as NodeJS.Timeout);
          return;
        }

        const particleCount = 50 * (timeLeft / duration);
        
        // Since they fall down, start a bit higher than random
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
        });
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
        });
      }, 250);

      return () => clearInterval(interval as unknown as NodeJS.Timeout);
    }
  }, [currentStep]);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Enhanced Background Effects */}
      <div className="fixed inset-0 bg-[url('/stars.png')] opacity-30" />
      <div className="fixed inset-0 bg-gradient-to-b from-purple-900/20 via-black to-black" />
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/10 via-transparent to-transparent" />

      {/* Header */}
      <nav className="fixed top-0 w-full z-50 bg-black/50 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 h-16">
          <div className="flex items-center justify-between h-full">
            <button 
              onClick={() => router.push('/#pricing')}
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors group"
            >
              <svg className="w-5 h-5 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Pricing
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-600 to-blue-600 animate-pulse" />
              <span className="font-bold">NOVA</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="relative pt-32 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Enhanced Steps */}
          <div className="flex justify-between mb-16">
            {steps.map((step, i) => (
              <div key={step.title} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div className={`
                    w-14 h-14 rounded-full flex items-center justify-center border-2 mb-2
                    transition-all duration-300 group
                    ${currentStep === step.title.toLowerCase()
                      ? 'bg-gradient-to-r from-purple-600 to-blue-600 border-transparent scale-110'
                      : 'bg-white/5 border-white/10'}
                  `}>
                    <div className="text-lg">{step.icon}</div>
                  </div>
                  <div className="text-center">
                    <div className={`font-medium ${
                      currentStep === step.title.toLowerCase() ? 'text-white' : 'text-gray-400'
                    }`}>
                      {step.title}
                    </div>
                    <div className="text-sm text-gray-500">{step.description}</div>
                  </div>
                </div>
                {i < steps.length - 1 && (
                  <div className="w-24 h-[2px] bg-gradient-to-r from-white/10 via-purple-500/20 to-white/10 mx-4 mt-[-20px]" />
                )}
              </div>
            ))}
          </div>

          {/* Only show plan summary if not in confirmation step */}
          {currentStep !== 'confirmation' && (
            <div className="mb-8 p-8 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm
              hover:border-purple-500/50 transition-all group">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-2xl font-bold mb-2">{planDetails.name} Plan</h3>
                  <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-500 
                    text-transparent bg-clip-text animate-pulse">
                    {planDetails.price}
                  </div>
                </div>
                <div className="relative w-16 h-16">
                  <div className="absolute inset-0 bg-gradient-to-tr from-purple-600 to-blue-600 rounded-full opacity-20 
                    group-hover:opacity-30 transition-opacity animate-pulse" />
                  <Image
                    src="/rocket-badge.png"
                    alt="Plan Icon"
                    width={64}
                    height={64}
                    className="relative z-10 transform group-hover:scale-110 transition-transform"
                  />
                </div>
              </div>
              <ul className="grid grid-cols-2 gap-4">
                {planDetails.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm text-gray-400">
                    <svg className="w-5 h-5 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Content */}
          <div className="space-y-6 backdrop-blur-sm">
            {currentStep === 'details' && (
              <motion.form
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                onSubmit={handleDetailsSubmit}
                className="space-y-6"
              >
                <h2 className="text-2xl font-bold">Your Details</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Email</label>
                    <input
                      type="email"
                      required
                      className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Full Name</label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Company (Optional)</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    />
                  </div>
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

            {currentStep === 'payment' && (
              <motion.form
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                onSubmit={handlePaymentSubmit}
                className="space-y-6"
              >
                <h2 className="text-2xl font-bold">Payment Details</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Card Number</label>
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
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Expiry Date</label>
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
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">CVC</label>
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
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 px-6 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium 
                    hover:from-purple-700 hover:to-blue-700 transition-all disabled:opacity-50"
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Processing...
                    </span>
                  ) : `Pay ${planDetails.price}`}
                </button>
              </motion.form>
            )}

            {currentStep === 'confirmation' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ 
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                    delay: 0.3 
                  }}
                  className="w-32 h-32 mx-auto mb-8 relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600/30 to-blue-600/30 rounded-full animate-pulse" />
                  <div className="absolute inset-2 bg-gradient-to-r from-purple-600/50 to-blue-600/50 rounded-full animate-pulse delay-75" />
                  <div className="absolute inset-4 bg-gradient-to-r from-purple-600/70 to-blue-600/70 rounded-full animate-pulse delay-150" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg className="w-16 h-16 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-500 
                    text-transparent bg-clip-text">
                    Welcome Aboard!
                  </h2>
                  <p className="text-gray-400 mb-8 max-w-md mx-auto">
                    Your journey with NOVA Aerospace begins now. Check your inbox for login credentials and next steps.
                  </p>

                  <div className="flex flex-col items-center gap-4">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => router.push('/dashboard')}
                      className="px-8 py-3 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium 
                        hover:from-purple-700 hover:to-blue-700 transition-all"
                    >
                      Launch Dashboard
                    </motion.button>
                    
                    <button
                      onClick={() => setShowInvoice(true)}
                      className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      View Invoice
                    </button>

                    <button
                      onClick={() => router.push('/')}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      Return to Homepage
                    </button>
                  </div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="mt-12 grid grid-cols-3 gap-6 max-w-lg mx-auto"
                  >
                    {[
                      { icon: "🚀", text: "Setup Guide" },
                      { icon: "📚", text: "Documentation" },
                      { icon: "💬", text: "Community" }
                    ].map((item, index) => (
                      <button
                        key={index}
                        className="p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all border border-white/10
                          hover:border-purple-500/50"
                      >
                        <div className="text-2xl mb-2">{item.icon}</div>
                        <div className="text-sm text-gray-400">{item.text}</div>
                      </button>
                    ))}
                  </motion.div>
                </motion.div>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Add Invoice Modal */}
      {showInvoice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowInvoice(false)} />
          <div className="relative bg-white text-black max-w-2xl w-full rounded-lg shadow-xl overflow-hidden">
            <div className="p-8 max-h-[80vh] overflow-y-auto">
              {/* Invoice Header */}
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h2 className="text-3xl font-bold text-gray-800">INVOICE</h2>
                  <p className="text-gray-600">#{invoiceNumber}</p>
                </div>
                <button 
                  onClick={() => setShowInvoice(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Company Details */}
              <div className="flex justify-between mb-8">
                <div>
                  <h3 className="font-bold mb-1">NOVA Aerospace</h3>
                  <p className="text-sm text-gray-600">
                    123 Space Station<br />
                    Lunar Colony, Moon<br />
                    contact@nova-aerospace.com
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">
                    Date: {invoiceDate}<br />
                    Due Date: {invoiceDate}
                  </p>
                </div>
              </div>

              {/* Bill To */}
              <div className="mb-8">
                <h3 className="font-bold mb-1">Bill To:</h3>
                <p className="text-sm text-gray-600">
                  {formData.name}<br />
                  {formData.company && `${formData.company}<br />`}
                  {formData.email}
                </p>
              </div>

              {/* Invoice Items */}
              <table className="w-full mb-8">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-2">Description</th>
                    <th className="text-right py-2">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="py-4">
                      <p className="font-medium">{planDetails.name} Plan</p>
                      <p className="text-sm text-gray-600">Monthly Subscription</p>
                    </td>
                    <td className="text-right py-4">{planDetails.price}</td>
                  </tr>
                </tbody>
                <tfoot className="border-t border-gray-200">
                  <tr>
                    <td className="py-4 font-bold">Total</td>
                    <td className="text-right py-4 font-bold">{planDetails.price}</td>
                  </tr>
                </tfoot>
              </table>

              {/* Footer */}
              <div className="text-center text-sm text-gray-600 border-t border-gray-200 pt-8">
                <p>Thank you for your business!</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Trust Indicators */}
      <div className="fixed bottom-0 w-full bg-black/50 backdrop-blur-md border-t border-white/10">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-center gap-8">
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            Secure Checkout
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            24/7 Support
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <svg className="w-5 h-5 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Instant Access
          </div>
        </div>
      </div>
    </div>
  );
} 