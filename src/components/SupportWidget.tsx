"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start: () => void;
  stop: () => void;
  onresult: (event: SpeechRecognitionEvent) => void;
  onerror: (event: SpeechRecognitionErrorEvent) => void;
  onend: () => void;
}

interface SpeechRecognitionEvent {
  results: {
    [index: number]: {
      [index: number]: {
        transcript: string;
      };
    };
  };
}

interface SpeechRecognitionErrorEvent {
  error: string;
  message?: string;
}

interface AIResponse {
  question: string;
  answer: string;
  keywords?: string[];
}

const supportMessages = [
  {
    id: 1,
    text: "👋 Need help? I'm here to assist you!",
    options: ["About NOVA", "Technology", "Pricing", "Contact Sales", "AI Questions"],
  },
  {
    id: 2,
    category: "About NOVA",
    text: "NOVA Aerospace is pioneering the future of space exploration through advanced propulsion systems and cutting-edge technology.",
    options: ["Learn More", "Go Back"],
  },
  {
    id: 3,
    category: "Technology",
    text: "Our technology stack includes Quantum Propulsion, Neural Navigation, and Plasma Shielding systems.",
    options: ["See Details", "Go Back"],
  },
  {
    id: 4,
    category: "Pricing",
    text: "We offer flexible plans starting from $999/mo for startups to enterprise-grade solutions.",
    options: ["View Plans", "Go Back"],
  },
  {
    id: 5,
    category: "Contact Sales",
    text: "Our sales team is ready to help! We typically respond within 24 hours.",
    options: ["Contact Now", "Go Back"],
  },
  {
    id: 6,
    category: "AI Questions",
    type: "ai-chat",
    text: "Ask me anything about NOVA Aerospace and our technology!",
    options: ["Go Back"],
  },
];

const aiResponses = [
  {
    question: "what is nova",
    answer: "NOVA Aerospace is a pioneering space technology company focused on developing advanced propulsion systems and cutting-edge space exploration solutions. We're revolutionizing space travel through innovative technologies like quantum propulsion and neural navigation systems.",
  },
  {
    question: "how much",
    answer: "Our plans start at $999/month for startups. We offer three tiers:\n\n• Startup: $999/month - Basic propulsion systems and support\n• Business: $2,499/month - Advanced systems + priority support\n• Enterprise: Custom pricing - Full suite with dedicated support\n\nWould you like to know more about any specific plan?",
  },
  {
    question: "quantum propulsion",
    answer: "Quantum propulsion is our revolutionary engine technology that utilizes quantum mechanics principles for unprecedented efficiency in space travel. It achieves 300% better fuel efficiency compared to traditional rocket engines.",
  },
  {
    question: "neural navigation",
    answer: "Neural navigation combines AI and quantum computing to calculate optimal space trajectories in real-time with incredible precision. It reduces navigation errors by 99.9% compared to conventional systems.",
  },
  {
    question: "contact",
    answer: "You can reach our sales team at sales@nova-aerospace.com or call us at +1 (555) 0123-4567. We typically respond within 24 hours on business days.",
  },
  {
    question: "location",
    answer: "Our headquarters is located in Silicon Valley, with research facilities in Houston, Cape Canaveral, and Tokyo. We serve clients globally.",
  },
  {
    question: "support",
    answer: "We offer 24/7 technical support for all our clients. Enterprise clients get dedicated support teams. You can reach support through our portal or via emergency hotline.",
  },
  {
    question: "technology",
    answer: "Our key technologies include:\n\n• Quantum Propulsion Systems\n• Neural Navigation\n• Plasma Shielding\n• AI-Driven Flight Controls\n• Zero-G Manufacturing\n\nWhich technology would you like to learn more about?",
  },
  {
    question: "cost",
    keywords: [
      "cost", "price", "pricing", "plans", "subscription", "how much",
      "prices", "fee", "fees", "charge", "charges", "rate", "rates",
      "package", "packages", "tier", "tiers", "monthly", "annual",
      "cost?", "price?", "pricing?", "how much?",
      // Common combinations
      "nova cost", "nova price", "nova pricing", "nova plans",
      "nova subscription", "nova packages", "nova rates",
      // Questions
      "what does nova cost", "what is the price", "tell me about pricing",
      "show me prices", "show pricing"
    ],
    answer: "Our plans start at $999/month for startups. We offer three tiers:\n\n• Startup: $999/month - Basic propulsion systems and support\n• Business: $2,499/month - Advanced systems + priority support\n• Enterprise: Custom pricing - Full suite with dedicated support\n\nWould you like to know more about any specific plan?"
  },
  {
    question: "nova",
    keywords: ["nova", "company", "about", "what is"],
    answer: "NOVA Aerospace is a pioneering space technology company focused on developing advanced propulsion systems and cutting-edge space exploration solutions. We're revolutionizing space travel through innovative technologies like quantum propulsion and neural navigation systems.",
  },
];

export default function SupportWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMessage, setCurrentMessage] = useState(supportMessages[0]);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatHistory, setChatHistory] = useState<Array<{type: string; text: string}>>([]);
  const [isListening, setIsListening] = useState(false);
  const [isSpeechSupported] = useState(() => 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isSpeechSupported) {
      // Initialize speech recognition
      const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event: SpeechRecognitionEvent) => {
        const transcript = Array.from(event.results)
          .map((result) => result[0])
          .map(result => result.transcript)
          .join('');

        setChatInput(transcript);
      };

      recognitionRef.current.onerror = (event: SpeechRecognitionErrorEvent) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [isSpeechSupported]);

  const toggleListening = () => {
    if (!recognitionRef.current) return;

    if (isListening) {
      recognitionRef.current.stop();
    } else {
      setChatInput('');
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory]);

  const handleOptionClick = (option: string) => {
    if (option === "Go Back") {
      setCurrentMessage(supportMessages[0]);
      setChatHistory([]);
      setIsExpanded(false);
      return;
    }

    const messageMap: { [key: string]: number } = {
      "About NOVA": 1,
      Technology: 2,
      Pricing: 3,
      "Contact Sales": 4,
      "AI Questions": 5,
    };

    if (messageMap[option]) {
      setCurrentMessage(supportMessages[messageMap[option]]);
      if (option === "AI Questions") {
        setChatHistory([{ type: "system", text: "Ask me anything about NOVA Aerospace!" }]);
      }
    }

    if (option === "Contact Now") {
      // You can integrate this with your ContactModal
      console.log("Opening contact modal...");
    }
  };

  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    // Add user message to chat
    setChatHistory(prev => [...prev, { type: "user", text: chatInput }]);

    // Enhanced matching logic
    const userQuestion = chatInput.toLowerCase().replace(/[^\w\s]/g, ''); // Remove punctuation
    const questionWords = new Set(userQuestion.split(/\s+/));
    
    // Find the best matching response
    const response = aiResponses.reduce((bestMatch: { response: AIResponse | null; score: number }, current) => {
      // Check keyword matches first
      const keywordMatches = current.keywords?.filter(keyword => 
        questionWords.has(keyword) || userQuestion.includes(keyword)
      ).length || 0;

      // Check question matches
      const questionMatch = userQuestion.includes(current.question.toLowerCase()) ? 
        current.question.split(' ').length : 0;

      // Score based on match strength
      const currentScore = Math.max(keywordMatches, questionMatch);
      const bestScore = bestMatch?.score || 0;

      return currentScore > bestScore ? 
        { response: current, score: currentScore } : 
        bestMatch;
    }, { response: null, score: 0 });

    setTimeout(() => {
      setChatHistory(prev => [...prev, { 
        type: "system", 
        text: response.response?.answer || "I'm not sure about that. Could you please ask about NOVA, our technology, pricing, or support?"
      }]);
    }, 500);

    setChatInput("");
  };

  const widgetSize = isExpanded ? "w-96 h-[600px]" : "w-80";

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && !isMinimized && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className={`absolute bottom-20 right-0 ${widgetSize} bg-black border border-white/10 rounded-xl shadow-2xl overflow-hidden transition-all duration-300`}
          >
            {/* Chat Header */}
            <div className="p-4 bg-white/5 border-b border-white/10 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="font-medium">Support</span>
              </div>
              <div className="flex items-center gap-2">
                {currentMessage.type === "ai-chat" && (
                  <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {isExpanded ? <MinimizeIcon /> : <ExpandIcon />}
                  </button>
                )}
                <button
                  onClick={() => setIsMinimized(true)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <MinimizeIcon />
                </button>
              </div>
            </div>

            {/* Chat Content */}
            <div className={`flex flex-col ${isExpanded ? 'h-[calc(600px-64px)]' : 'h-[400px]'}`}>
              <div className="flex-1 p-4 overflow-y-auto">
                {currentMessage.type === "ai-chat" ? (
                  <div className="space-y-4">
                    {chatHistory.map((msg, idx) => (
                      <div
                        key={idx}
                        className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-[80%] p-3 rounded-lg text-sm ${
                            msg.type === "user"
                              ? "bg-purple-600"
                              : "bg-white/5"
                          }`}
                        >
                          {msg.text}
                        </div>
                      </div>
                    ))}
                    <div ref={chatEndRef} />
                  </div>
                ) : (
                  <>
                    <div className="mb-4">
                      <div className="bg-white/5 rounded-lg p-3 text-sm">
                        {currentMessage.text}
                      </div>
                    </div>
                    <div className="space-y-2">
                      {currentMessage.options.map((option) => (
                        <button
                          key={option}
                          onClick={() => handleOptionClick(option)}
                          className="w-full p-2 text-sm text-left rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* Chat Input */}
              {currentMessage.type === "ai-chat" && (
                <form
                  onSubmit={handleChatSubmit}
                  className="p-4 border-t border-white/10 bg-white/5"
                >
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      placeholder="Type your question..."
                      className="flex-1 bg-white/5 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    {isSpeechSupported && (
                      <button
                        type="button"
                        onClick={toggleListening}
                        className={`p-2 rounded-lg text-sm transition-colors ${
                          isListening 
                            ? 'bg-blue-600 hover:bg-blue-700' 
                            : 'bg-white/5 hover:bg-white/10'
                        }`}
                        title={isListening ? 'Stop listening' : 'Start voice input'}
                      >
                        <MicrophoneIcon isListening={isListening} />
                      </button>
                    )}
                    <button
                      type="submit"
                      className="p-2 rounded-lg text-sm bg-purple-600 hover:bg-purple-700 transition-colors"
                    >
                      <SendIcon />
                    </button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Support Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => {
          setIsOpen(!isOpen);
          setIsMinimized(false);
        }}
        className="w-14 h-14 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow"
      >
        {isOpen ? <CloseIcon /> : <SupportIcon />}
      </motion.button>

      {/* Minimized Indicator */}
      {isMinimized && (
        <div className="absolute bottom-20 right-4 bg-white/5 rounded-full px-4 py-2 text-sm">
          Support minimized
        </div>
      )}
    </div>
  );
}

function SupportIcon() {
  return (
    <svg
      className="w-6 h-6 text-white"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
      />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      className="w-6 h-6 text-white"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  );
}

function MinimizeIcon() {
  return (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M20 12H4"
      />
    </svg>
  );
}

function ExpandIcon() {
  return (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
      />
    </svg>
  );
}

function MicrophoneIcon({ isListening }: { isListening: boolean }) {
  return (
    <svg
      className={`w-5 h-5 ${isListening ? 'animate-pulse' : ''}`}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 18.5a6.5 6.5 0 006.5-6.5h-13a6.5 6.5 0 006.5 6.5zm3.5-6.5a3.5 3.5 0 11-7 0V7a3.5 3.5 0 117 0v5z"
      />
    </svg>
  );
}

function SendIcon() {
  return (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
      />
    </svg>
  );
}

declare global {
  interface Window {
    webkitSpeechRecognition: any;
    SpeechRecognition: any;
  }
} 