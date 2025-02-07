import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface DetailItem {
  title: string;
  description: string;
  icon?: string;
  stats?: { label: string; value: string }[];
  features?: string[];
  image?: string;
  status?: string;
  completion?: number;
  requirements?: string[];
  location?: string;
  type?: string;
}

interface DetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: DetailItem;
  variant: 'technology' | 'mission' | 'career';
}

export default function DetailModal({ isOpen, onClose, data, variant }: DetailModalProps) {
  // Handle ESC key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  // Prevent scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/80 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: "spring", duration: 0.5 }}
            onClick={e => e.stopPropagation()}
            className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-black border border-white/10 rounded-2xl"
          >
            {/* Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/20 via-black to-blue-900/20" />
            
            {/* Content */}
            <div className="relative p-8">
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  {data.icon && <span className="text-4xl">{data.icon}</span>}
                  <h2 className="text-2xl font-bold">{data.title}</h2>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-white/5 rounded-full transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Main Content Grid */}
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  {/* Description */}
                  <p className="text-gray-400 leading-relaxed">
                    {data.description}
                  </p>

                  {/* Features/Requirements */}
                  {(data.features || data.requirements) && (
                    <div className="space-y-3">
                      <h3 className="text-lg font-semibold">
                        {variant === 'career' ? 'Requirements' : 'Key Features'}
                      </h3>
                      <ul className="space-y-2">
                        {(data.features || data.requirements)?.map((item, index) => (
                          <li key={index} className="flex items-start gap-2 text-gray-400">
                            <span className="text-purple-400 mt-1">→</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Stats/Specifications */}
                  {data.stats && (
                    <div className="space-y-3">
                      <h3 className="text-lg font-semibold">Specifications</h3>
                      <div className="space-y-2">
                        {data.stats.map((stat, index) => (
                          <div key={index} className="flex justify-between text-sm border-b border-white/5 py-2">
                            <span className="text-gray-400">{stat.label}</span>
                            <span className="text-purple-400 font-mono">{stat.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Mission Status */}
                  {variant === 'mission' && data.completion !== undefined && (
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Completion Status</span>
                        <span className="text-purple-400">{data.completion}%</span>
                      </div>
                      <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${data.completion}%` }}
                          transition={{ duration: 1, ease: "easeOut" }}
                          className="h-full bg-gradient-to-r from-purple-600 to-blue-600"
                        />
                      </div>
                    </div>
                  )}

                  {/* Career Specific */}
                  {variant === 'career' && (
                    <div className="space-y-4">
                      {data.location && (
                        <div className="flex items-center gap-2 text-gray-400">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          {data.location}
                        </div>
                      )}
                      {data.type && (
                        <div className="flex items-center gap-2 text-gray-400">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                          {data.type}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Image Section */}
                {data.image && (
                  <div className="relative h-[300px] rounded-lg overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-tr from-purple-600/20 to-blue-600/20 group-hover:opacity-75 transition-opacity z-10" />
                    <Image
                      src={data.image}
                      alt={data.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      priority
                    />
                  </div>
                )}
              </div>

              {/* Action Button */}
              <div className="mt-8 flex justify-end">
                <button
                  onClick={onClose}
                  className="px-6 py-2 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium 
                    hover:from-purple-700 hover:to-blue-700 transition-all"
                >
                  {variant === 'career' ? 'Apply Now' : 'Close'}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 