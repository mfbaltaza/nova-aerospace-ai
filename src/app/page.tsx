"use client";
import { useState } from "react";
import Image from "next/image";
import ContactModal from "@/components/ContactModal";
import DetailModal from '@/components/DetailModal';
import PricingModal from '@/components/PricingModal';

export default function Home() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [selectedTech, setSelectedTech] = useState<number | null>(null);
  const [selectedMission, setSelectedMission] = useState<number | null>(null);
  const [selectedCareer, setSelectedCareer] = useState<number | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<number | null>(null);

  const handleContactClick = () => {
    setIsContactModalOpen(true);
  };

  // Technology Data
  const technologies = [
    {
      title: "Quantum Propulsion",
      description: "Revolutionary engine technology utilizing quantum mechanics for unprecedented efficiency",
      icon: "🚀",
      features: [
        "Zero-point energy harvesting",
        "Quantum entanglement drive",
        "Spacetime manipulation chamber",
      ],
      stats: [
        { label: "Thrust Output", value: "1.2M Newtons" },
        { label: "Efficiency", value: "99.99%" },
        { label: "Mass Ratio", value: "1:120" },
      ],
      image: "/quantum-engine.jpg"
    },
    {
      title: "Neural Navigation",
      description: "AI-powered navigation systems for precise interplanetary trajectories",
      icon: "🧠",
      features: [
        "Quantum computing core",
        "Real-time trajectory optimization",
        "Autonomous decision making",
      ],
      stats: [
        { label: "Processing Power", value: "1.5 PFLOPS" },
        { label: "Accuracy", value: "±0.0001°" },
        { label: "Response Time", value: "<1ms" },
      ],
      image: "/neural-nav.jpg"
    },
    {
      title: "Plasma Shielding",
      description: "Advanced protection systems against cosmic radiation and space debris",
      icon: "🛡️",
      features: [
        "Magnetohydrodynamic barrier",
        "Adaptive field modulation",
        "Self-repairing matrix",
      ],
      stats: [
        { label: "Shield Strength", value: "50 TPa" },
        { label: "Power Draw", value: "15 MW" },
        { label: "Response Time", value: "0.1ms" },
      ],
      image: "/plasma-shield.jpg"
    }
  ];

  // Mission Data
  const missions = [
    {
      title: "Project Aurora",
      description: "Leading-edge Mars colonization support mission focused on establishing sustainable human presence on the red planet.",
      status: "In Progress",
      completion: 75,
      features: [
        "Automated resource extraction",
        "Habitat construction systems",
        "Life support implementation",
      ],
      stats: [
        { label: "Mission Duration", value: "5 Years" },
        { label: "Team Size", value: "250+" },
        { label: "Budget", value: "$2.5B" },
      ],
      image: "/aurora-mission.jpg"
    },
    // ... other mission items
  ];

  // Career Data
  const careers = [
    {
      title: "Propulsion Engineers",
      description: "Join our cutting-edge propulsion team to develop next-generation space engines.",
      requirements: [
        "PhD in Aerospace Engineering or related field",
        "5+ years experience in propulsion systems",
        "Quantum mechanics background preferred",
      ],
      location: "Houston, TX",
      type: "Full-time",
      image: "/engineering-lab.jpg"
    },
    // ... other career items
  ];

  // Pricing Data
  const pricingPlans = [
    {
      name: "Startup",
      price: "$999/mo",
      features: [
        "Access to Quantum Propulsion API",
        "Basic mission support",
        "5 team members",
        "Community access",
        "Email support"
      ],
      highlighted: false
    },
    {
      name: "Enterprise",
      price: "$4,999/mo",
      features: [
        "Full technology stack access",
        "Priority mission control",
        "Unlimited team members",
        "24/7 support",
        "Custom integration",
        "Dedicated account manager"
      ],
      highlighted: true
    },
    {
      name: "Custom",
      price: "Contact us",
      features: [
        "Custom technology development",
        "Full mission management",
        "Hardware integration",
        "On-site support",
        "Strategic partnership",
        "Custom SLAs"
      ],
      highlighted: false
    }
  ];

  return (
    <div className="bg-black text-white min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/50 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-tr from-purple-600 to-blue-600" />
              <span className="font-bold text-lg sm:text-xl">NOVA</span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8 text-sm text-gray-300">
              <a href="#about" className="hover:text-white transition-colors">
                About
              </a>
              <a href="#technology" className="hover:text-white transition-colors">
                Technology
              </a>
              <a href="#missions" className="hover:text-white transition-colors">
                Missions
              </a>
              <a href="#careers" className="hover:text-white transition-colors">
                Careers
              </a>
              <a href="#pricing" className="hover:text-white transition-colors">
                Pricing
              </a>
              <button
                onClick={handleContactClick}
                className="px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
              >
                Contact Us
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={handleContactClick}
              className="md:hidden px-3 py-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-sm"
            >
              Contact
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-black to-black" />
        
        {/* Content */}
        <div className="relative text-center max-w-7xl mx-auto space-y-6 sm:space-y-8">
          <h1 className="text-5xl sm:text-7xl md:text-9xl font-bold tracking-tight bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent px-4">
            NOVA
            <br className="sm:hidden" />
            <span className="sm:ml-2">AEROSPACE</span>
          </h1>
          <p className="text-lg sm:text-2xl md:text-3xl text-gray-400 max-w-4xl mx-auto px-4 leading-relaxed">
            Pioneering the next frontier of space exploration through
            advanced propulsion systems
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center mt-8 sm:mt-16 px-4">
            <button className="w-full sm:w-auto px-8 sm:px-12 py-4 text-lg sm:text-xl bg-white text-black rounded-full font-medium hover:bg-opacity-90 transition-all">
              Explore Our Tech
            </button>
            <button className="w-full sm:w-auto px-8 sm:px-12 py-4 text-lg sm:text-xl bg-transparent border border-white/20 rounded-full font-medium hover:bg-white/5 transition-all">
              Contact Us
            </button>
          </div>
        </div>

        {/* Status Bar */}
        <div className="absolute bottom-20 sm:bottom-24 w-full px-4">
          <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-2 sm:gap-12 text-sm sm:text-base text-gray-400">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse" />
              Systems Online
            </div>
            <div>EST. 2024</div>
            <div>ISO 9001:2015</div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div 
          className="absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer hover:opacity-75 transition-opacity"
          onClick={() => {
            document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          <svg
            className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400 animate-bounce"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-900/10 to-black" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
                Pushing the boundaries of what's possible
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed">
                At NOVA Aerospace, we're not just dreaming about the future of
                space travel – we're building it. Our team of world-class
                engineers and scientists are developing revolutionary propulsion
                technologies that will make interplanetary travel a reality.
              </p>
              <div className="grid grid-cols-2 gap-8 pt-8">
                <div className="space-y-2">
                  <div className="text-4xl font-bold text-purple-400">15+</div>
                  <div className="text-gray-500">Patents Filed</div>
                </div>
                <div className="space-y-2">
                  <div className="text-4xl font-bold text-purple-400">98%</div>
                  <div className="text-gray-500">Efficiency Rating</div>
                </div>
                <div className="space-y-2">
                  <div className="text-4xl font-bold text-purple-400">24/7</div>
                  <div className="text-gray-500">Operation Time</div>
                </div>
                <div className="space-y-2">
                  <div className="text-4xl font-bold text-purple-400">500+</div>
                  <div className="text-gray-500">Team Members</div>
                </div>
              </div>
            </div>
            <div className="relative group">
              <div className="relative rounded-2xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-purple-600/20 to-blue-600/20 group-hover:opacity-75 transition-opacity" />
                <Image
                  src="/rocket-engine.jpg"
                  alt="Advanced Rocket Engine"
                  width={600}
                  height={400}
                  className="object-cover w-full h-[500px]"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-black p-4 rounded-lg">
                <div className="text-sm font-mono">
                  <div className="text-purple-400">// Next-Gen Propulsion</div>
                  <div className="text-gray-400">Status: Operational</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section id="technology" className="relative py-32 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Our Technology
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Cutting-edge innovations that define the future of space
              exploration
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {technologies.map((tech, index) => (
              <div
                key={index}
                className="group relative p-8 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
              >
                <div className="text-4xl mb-4">{tech.icon}</div>
                <h3 className="text-xl font-bold mb-4">{tech.title}</h3>
                <p className="text-gray-400">{tech.description}</p>
                <div className="mt-8 flex items-center justify-between">
                  <div className="h-[2px] flex-grow bg-gradient-to-r from-purple-600/50 to-blue-600/50" />
                  <button 
                    onClick={() => setSelectedTech(index)}
                    className="group/button flex items-center gap-2 ml-4 text-sm text-purple-400 hover:text-purple-300 transition-colors"
                  >
                    Learn More
                    <span className="inline-block transition-transform group-hover/button:translate-x-1">→</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Missions Section */}
      <section id="missions" className="relative py-32">
        <div className="absolute inset-0 bg-[url('/mission-bg.jpg')] bg-cover bg-center opacity-20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Active Missions
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Current projects pushing the boundaries of space exploration
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {missions.map((mission, index) => (
              <div
                key={index}
                className="relative bg-white/5 rounded-lg p-6 hover:bg-white/10 transition-all"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold">{mission.title}</h3>
                  <span className="px-3 py-1 rounded-full text-sm bg-purple-500/20 text-purple-400">
                    {mission.status}
                  </span>
                </div>
                <p className="text-gray-400 mb-6">{mission.description}</p>
                <div className="space-y-4">
                  <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-purple-600 to-blue-600"
                      style={{ width: `${mission.completion}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">{mission.completion}% Complete</span>
                    <button 
                      onClick={() => setSelectedMission(index)}
                      className="group/button flex items-center gap-2 text-sm text-purple-400 hover:text-purple-300 transition-colors"
                    >
                      Learn More
                      <span className="inline-block transition-transform group-hover/button:translate-x-1">→</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Careers Section */}
      <section id="careers" className="relative py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Join Our Team
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Help us shape the future of space exploration
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {careers.map((career, index) => (
              <div
                key={index}
                className="group relative p-8 rounded-2xl border border-white/10 hover:bg-white/5 transition-all"
              >
                <h3 className="text-xl font-bold mb-4">{career.title}</h3>
                <p className="text-gray-400 mb-8">{career.description}</p>
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <span className="flex items-center gap-1">
                      <span>📍</span> {career.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <span>💼</span> {career.type}
                    </span>
                  </div>
                  <button 
                    onClick={() => setSelectedCareer(index)}
                    className="group/button flex items-center gap-2 text-sm text-purple-400 hover:text-purple-300 transition-colors"
                  >
                    Learn More
                    <span className="inline-block transition-transform group-hover/button:translate-x-1">→</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="relative py-32">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-900/20 to-black" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Pricing Plans</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Choose the perfect plan for your space exploration needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <div
                key={index}
                className={`relative p-8 rounded-2xl border ${
                  plan.highlighted
                    ? 'border-purple-500 bg-purple-900/20'
                    : 'border-white/10 bg-white/5'
                } hover:border-purple-500/50 transition-all group`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full 
                    bg-gradient-to-r from-purple-600 to-blue-600 text-sm font-medium">
                    Most Popular
                  </div>
                )}

                <div className="mb-8">
                  <h3 className="text-2xl font-bold mb-4">{plan.name}</h3>
                  <div className="text-4xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-blue-500 
                    text-transparent bg-clip-text">
                    {plan.price}
                  </div>
                  <ul className="space-y-4">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-2 text-gray-400">
                        <svg className="w-5 h-5 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => plan.name !== 'Custom' ? setSelectedPlan(index) : handleContactClick()}
                  className={`w-full py-3 px-6 rounded-lg transition-all ${
                    plan.highlighted
                      ? 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700'
                      : 'bg-white/5 hover:bg-white/10 border border-white/10'
                  }`}
                >
                  {plan.name === 'Custom' ? 'Contact Sales' : 'Get Started'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-20 bg-black border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-600 to-blue-600" />
                <span className="font-bold text-lg">NOVA</span>
              </div>
              <p className="text-gray-400 text-sm">
                Pioneering the future of space exploration
              </p>
            </div>

            {[
              {
                title: "Company",
                links: ["About", "Careers", "Press", "News"],
              },
              {
                title: "Technology",
                links: ["Research", "Development", "Patents", "Labs"],
              },
              {
                title: "Connect",
                links: ["Twitter", "LinkedIn", "Instagram", "Contact"],
              },
            ].map((column, index) => (
              <div key={index} className="space-y-4">
                <h4 className="font-bold">{column.title}</h4>
                <ul className="space-y-2">
                  {column.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <a
                        href="#"
                        className="text-gray-400 hover:text-white transition-colors text-sm"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-20 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gray-400 text-sm">
              © 2024 NOVA Aerospace. All rights reserved.
            </div>
            <div className="flex gap-4 text-gray-400 text-sm">
              <a href="#" className="hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Terms of Service
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
      {selectedTech !== null && (
        <DetailModal
          isOpen={selectedTech !== null}
          onClose={() => setSelectedTech(null)}
          data={technologies[selectedTech]}
          variant="technology"
        />
      )}
      {selectedMission !== null && (
        <DetailModal
          isOpen={selectedMission !== null}
          onClose={() => setSelectedMission(null)}
          data={missions[selectedMission]}
          variant="mission"
        />
      )}
      {selectedCareer !== null && (
        <DetailModal
          isOpen={selectedCareer !== null}
          onClose={() => setSelectedCareer(null)}
          data={careers[selectedCareer]}
          variant="career"
        />
      )}
      {selectedPlan !== null && (
        <PricingModal
          isOpen={selectedPlan !== null}
          onClose={() => setSelectedPlan(null)}
          plan={pricingPlans[selectedPlan]}
        />
      )}
    </div>
  );
}
