import { motion, AnimatePresence } from 'motion/react';
import React, { ReactNode, useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, Sphere, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { 
  ArrowRight, Terminal, MapPin, ShieldCheck, Cpu, Smartphone, 
  Activity, CheckCircle2, Calendar, Lock, MessageSquare, Globe, 
  Database, Code2, Layers, Download, Mail, X, CreditCard, ExternalLink, Zap,
  Briefcase, Check
} from 'lucide-react';

// --- 3D BACKGROUND ---
const FloatingNetwork = () => {
  const groupRef = useRef<THREE.Group>(null);
  const nodesCount = 15;
  
  const nodes = Array.from({ length: nodesCount }).map((_, i) => ({
    position: [
      (Math.random() - 0.5) * 15,
      (Math.random() - 0.5) * 10,
      (Math.random() - 0.5) * 15
    ] as [number, number, number],
    speed: Math.random() * 0.5 + 0.1
  }));

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
      groupRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.5;
    }
  });

  return (
    <group ref={groupRef}>
      {nodes.map((node, i) => (
        <mesh key={i} position={node.position}>
          <boxGeometry args={[0.2, 0.2, 0.2]} />
          <meshStandardMaterial color="#06b6d4" emissive="#06b6d4" emissiveIntensity={0.5} wireframe />
        </mesh>
      ))}
      <gridHelper args={[30, 30, '#8b5cf6', '#ffffff']} position={[0, -5, 0]} material-opacity={0.1} material-transparent />
    </group>
  );
};

const Background3D = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none opacity-60">
      <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
        <fog attach="fog" args={['#050505', 5, 25]} />
        <ambientLight intensity={0.2} />
        <directionalLight position={[10, 10, 5]} intensity={2} color="#8b5cf6" />
        <directionalLight position={[-10, -10, 5]} intensity={2} color="#06b6d4" />
        <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
        <FloatingNetwork />
      </Canvas>
      <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/0 via-[#050505]/60 to-[#050505] pointer-events-none" />
    </div>
  );
};

// --- ANIMATION WRAPPER ---
const FadeIn = ({ children, delay = 0, className = "" }: { children: ReactNode, delay?: number, className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.7, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
    className={className}
  >
    {children}
  </motion.div>
);

// --- MODAL SYSTEM ---
type OrderStep = 'form' | 'summary' | 'payment';
type ServiceType = 'AI Automation Systems' | 'Mobile App UI (React Native)' | 'Web Dashboard / SaaS UI' | 'Local AI Setup' | 'Custom Feature' | 'Starter Plan' | 'Pro Plan' | 'Enterprise Plan';

const OrderModal = ({ isOpen, onClose, defaultService }: { isOpen: boolean, onClose: () => void, defaultService?: ServiceType | null }) => {
  const [step, setStep] = useState<OrderStep>('form');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: defaultService || 'Custom AI Workflow Builds',
    description: '',
    budget: '$500 - $1,500',
    deadline: '1-2 Weeks'
  });

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      if (defaultService) setFormData(prev => ({ ...prev, service: defaultService }));
    } else {
      document.body.style.overflow = 'auto';
      setTimeout(() => setStep('form'), 300);
    }
    return () => { document.body.style.overflow = 'auto'; };
  }, [isOpen, defaultService]);

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('summary');
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="absolute inset-0 bg-[#050505]/80 backdrop-blur-xl"
            onClick={onClose}
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-2xl bg-[#0a0a0a] border border-white/10 rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(6,182,212,0.15)] flex flex-col max-h-[90vh]"
          >
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b border-white/5 bg-white/[0.02]">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20">
                  <Terminal className="w-4 h-4 text-cyan-400" />
                </div>
                <div>
                  <h3 className="text-white font-display font-semibold tracking-tight leading-none mb-1">System Initialize</h3>
                  <p className="text-[0.65rem] text-neutral-500 font-mono tracking-widest uppercase">New Service Order</p>
                </div>
              </div>
              <button type="button" onClick={onClose} className="p-2 text-neutral-400 hover:text-white bg-white/5 rounded-full transition-colors cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 md:p-8 overflow-y-auto">
              {step === 'form' && (
                <form onSubmit={handleNext} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                       <label className="text-xs font-mono text-neutral-400 uppercase tracking-widest">Name</label>
                       <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500/50 transition-colors" placeholder="John Doe" />
                    </div>
                    <div className="space-y-2">
                       <label className="text-xs font-mono text-neutral-400 uppercase tracking-widest">Email</label>
                       <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500/50 transition-colors" placeholder="john@example.com" />
                    </div>
                  </div>
                  <div className="space-y-2">
                     <label className="text-xs font-mono text-neutral-400 uppercase tracking-widest">Service</label>
                     <select value={formData.service} onChange={e => setFormData({...formData, service: e.target.value as ServiceType})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500/50 transition-colors appearance-none">
                       <option>AI Automation Systems</option>
                       <option>Mobile App UI (React Native)</option>
                       <option>Web Dashboard / SaaS UI</option>
                       <option>Local AI Setup</option>
                       <option>Starter Plan</option>
                       <option>Pro Plan</option>
                       <option>Enterprise Plan</option>
                       <option>Custom AI Workflow Builds</option>
                     </select>
                  </div>
                  <div className="space-y-2">
                     <label className="text-xs font-mono text-neutral-400 uppercase tracking-widest">Project Details</label>
                     <textarea required value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} rows={4} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500/50 transition-colors resize-none" placeholder="Describe your vision..." />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                       <label className="text-xs font-mono text-neutral-400 uppercase tracking-widest">Budget</label>
                       <select value={formData.budget} onChange={e => setFormData({...formData, budget: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500/50 transition-colors appearance-none">
                         <option>$500 - $1,500</option>
                         <option>$1,500 - $3,000</option>
                         <option>$3,000 - $10,000</option>
                         <option>$10,000+</option>
                       </select>
                    </div>
                    <div className="space-y-2">
                       <label className="text-xs font-mono text-neutral-400 uppercase tracking-widest">Deadline</label>
                       <select value={formData.deadline} onChange={e => setFormData({...formData, deadline: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500/50 transition-colors appearance-none">
                         <option>1-2 Weeks</option>
                         <option>2-4 Weeks</option>
                         <option>1-2 Months</option>
                         <option>Flexible</option>
                       </select>
                    </div>
                  </div>
                  <button type="submit" className="w-full bg-white text-black font-semibold rounded-xl py-4 flex items-center justify-center gap-2 hover:bg-neutral-200 transition-colors">
                    Review Order <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}

              {step === 'summary' && (
                <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                  <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 space-y-4">
                    <div className="flex items-center gap-3 text-cyan-400 mb-6 border-b border-white/5 pb-4">
                      <Code2 className="w-5 h-5" />
                      <h4 className="font-display font-semibold">Order Summary</h4>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-[0.65rem] font-mono text-neutral-500 uppercase tracking-widest mb-1">Service</div>
                        <div className="text-white text-sm font-medium">{formData.service}</div>
                      </div>
                      <div>
                        <div className="text-[0.65rem] font-mono text-neutral-500 uppercase tracking-widest mb-1">Client</div>
                        <div className="text-white text-sm font-medium">{formData.name}</div>
                      </div>
                      <div>
                        <div className="text-[0.65rem] font-mono text-neutral-500 uppercase tracking-widest mb-1">Budget</div>
                        <div className="text-white text-sm font-medium">{formData.budget}</div>
                      </div>
                      <div>
                        <div className="text-[0.65rem] font-mono text-neutral-500 uppercase tracking-widest mb-1">Timeline</div>
                        <div className="text-white text-sm font-medium">{formData.deadline}</div>
                      </div>
                    </div>
                  </div>
                  <button type="button" onClick={() => setStep('payment')} className="w-full bg-cyan-500 text-white font-semibold rounded-xl py-4 flex items-center justify-center gap-2 hover:bg-cyan-600 transition-colors shadow-[0_0_20px_rgba(6,182,212,0.3)]">
                    Generate Payment Options
                  </button>
                  <button type="button" onClick={() => setStep('form')} className="w-full text-neutral-400 text-sm hover:text-white transition-colors">
                    Back to Edit
                  </button>
                </div>
              )}

              {step === 'payment' && (
                <div className="space-y-6 animate-in zoom-in-95 duration-500">
                  <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-green-500/10 text-green-400 border border-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Check className="w-8 h-8" />
                    </div>
                    <h4 className="text-xl font-bold text-white font-display">System Ready</h4>
                    <p className="text-sm text-neutral-400">Select how you want to proceed with the transaction.</p>
                  </div>
                  
                  <div className="space-y-3">
                    <a href="https://fiverr.com" target="_blank" rel="noreferrer" className="w-full glass-panel border-green-500/30 hover:bg-green-500/10 text-white rounded-xl py-4 px-6 flex items-center justify-between group transition-all cursor-pointer">
                      <div className="flex items-center gap-3">
                        <ShieldCheck className="w-5 h-5 text-green-400" />
                        <span className="font-semibold">Pay via Fiverr (Secure)</span>
                      </div>
                      <ExternalLink className="w-4 h-4 text-neutral-500 group-hover:text-green-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                    </a>
                    
                    <button type="button" className="w-full glass-panel border-blue-500/30 hover:bg-blue-500/10 text-white rounded-xl py-4 px-6 flex items-center justify-between group transition-all cursor-pointer">
                      <div className="flex items-center gap-3">
                        <CreditCard className="w-5 h-5 text-blue-400" />
                        <span className="font-semibold">Request Invoice (Stripe)</span>
                      </div>
                      <ArrowRight className="w-4 h-4 text-neutral-500 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
                    </button>
                    
                    <a href="https://wa.me/123456789" target="_blank" rel="noreferrer" className="w-full glass-panel border-white/10 hover:bg-white/10 text-white rounded-xl py-4 px-6 flex items-center justify-between group transition-all cursor-pointer">
                      <div className="flex items-center gap-3">
                        <MessageSquare className="w-5 h-5 text-neutral-300" />
                        <span className="font-semibold">Continue on WhatsApp</span>
                      </div>
                      <ArrowRight className="w-4 h-4 text-neutral-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
                    </a>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

// --- CUSTOM CURSOR ---
const CustomCursor = () => {
  const cursorDot = useRef<HTMLDivElement>(null);
  const cursorOutline = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only init if it's a device with a fine pointer (mouse)
    if (!window.matchMedia('(pointer: fine)').matches) return;

    // Use quickTo for optimal animation performance
    const dotX = gsap.quickTo(cursorDot.current, 'x', { duration: 0.1, ease: 'power3.out' });
    const dotY = gsap.quickTo(cursorDot.current, 'y', { duration: 0.1, ease: 'power3.out' });
    const outlineX = gsap.quickTo(cursorOutline.current, 'x', { duration: 0.3, ease: 'power3.out' });
    const outlineY = gsap.quickTo(cursorOutline.current, 'y', { duration: 0.3, ease: 'power3.out' });

    const onMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      dotX(clientX);
      dotY(clientY);
      outlineX(clientX);
      outlineY(clientY);
    };

    const onMouseEnter = () => {
      gsap.to(cursorOutline.current, { scale: 1.5, borderColor: 'rgba(6, 182, 212, 0.8)', duration: 0.3 });
      gsap.to(cursorDot.current, { scale: 0, duration: 0.3 });
    };

    const onMouseLeave = () => {
      gsap.to(cursorOutline.current, { scale: 1, borderColor: 'rgba(6, 182, 212, 0.4)', duration: 0.3 });
      gsap.to(cursorDot.current, { scale: 1, duration: 0.3 });
    };

    const onMouseDown = () => {
      gsap.to(cursorOutline.current, { scale: 0.8, duration: 0.1 });
    };

    const onMouseUp = () => {
      gsap.to(cursorOutline.current, { scale: 1, duration: 0.1 });
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);

    const clickables = document.querySelectorAll('a, button, input, select, textarea, [role="button"]');
    clickables.forEach((el) => {
      el.addEventListener('mouseenter', onMouseEnter);
      el.addEventListener('mouseleave', onMouseLeave);
    });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      clickables.forEach((el) => {
        el.removeEventListener('mouseenter', onMouseEnter);
        el.removeEventListener('mouseleave', onMouseLeave);
      });
    };
  }, []);

  return (
    <div className="hidden sm:block">
      <div 
        ref={cursorOutline} 
        className="fixed top-0 left-0 w-8 h-8 border border-cyan-400/40 rounded-full pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2"
      />
      <div 
        ref={cursorDot} 
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-cyan-400 rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 shadow-[0_0_10px_rgba(6,182,212,0.8)]"
      />
    </div>
  );
};

// --- AI CHATBOT ---
const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'ai', content: string}[]>([
    { role: 'ai', content: 'System initialized. I am Piyumal\'s virtual assistant. Ask me about services, tech stacks, or pricing.' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = input.trim();
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setInput('');
    setIsTyping(true);

    // Mock AI response logic
    setTimeout(() => {
      const lowerMsg = userMsg.toLowerCase();
      let aiResponse = "I can help you build high-end AI systems or mobile apps. Would you like to see the pricing or start a project plan?";
      
      if (lowerMsg.includes('price') || lowerMsg.includes('cost') || lowerMsg.includes('budget')) {
        aiResponse = "Pricing starts at $149 for base setups, $399 for our popular Pro multiview apps, and scales to $999+ for full enterprise AI workflows. Check the Services section for details.";
      } else if (lowerMsg.includes('fiverr')) {
        aiResponse = "Yes, you can hire Piyumal securely on Fiverr! We have a flawless delivery rate. Click the 'Hire on Fiverr' button to view the profile.";
      } else if (lowerMsg.includes('tech') || lowerMsg.includes('stack') || lowerMsg.includes('react')) {
        aiResponse = "The core stack relies on React/Next.js, React Native (Expo) for mobile, and Node.js/Python for AI logic. We also use Three.js for 3D web interfaces to create premium SaaS experiences.";
      } else if (lowerMsg.includes('contact') || lowerMsg.includes('email') || lowerMsg.includes('whatsapp')) {
        aiResponse = "You can reach out directly via email at bachchanhirun@gmail.com, or schedule a booking via Calendly. We also offer WhatsApp consultation for fast alignment.";
      } else if (lowerMsg.includes('automation') || lowerMsg.includes('ai') || lowerMsg.includes('local')) {
        aiResponse = "We build zero-trust local inference nodes (Ollama/DeepSeek) specifically for privacy-sensitive data, as well as complex multi-agent reasoning workflows and automated CRM pipelines.";
      }

      setMessages(prev => [...prev, { role: 'ai', content: aiResponse }]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <>
      {/* Floating Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 lg:bottom-10 lg:right-10 w-14 h-14 bg-cyan-500 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(6,182,212,0.4)] hover:scale-110 active:scale-95 transition-all z-[90] group"
      >
        {isOpen ? <X className="w-6 h-6 text-black" /> : <Terminal className="w-6 h-6 text-black group-hover:animate-pulse" />}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-white border-2 border-cyan-500"></span>
          </span>
        )}
      </button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-24 right-6 lg:bottom-28 lg:right-10 w-80 sm:w-96 glass-panel bg-[#0a0a0a]/95 backdrop-blur-2xl border border-cyan-500/30 rounded-2xl shadow-[0_10px_50px_-10px_rgba(6,182,212,0.2)] z-[90] flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-cyan-500/20 to-transparent p-4 border-b border-white/5 flex items-center gap-3">
              <div className="w-8 h-8 bg-cyan-500/20 border border-cyan-500/40 rounded-full flex items-center justify-center">
                <Cpu className="w-4 h-4 text-cyan-400" />
              </div>
              <div>
                <h4 className="text-white font-display font-medium text-sm">Piyumal AI Assistant</h4>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-[0.6rem] font-mono text-green-500 tracking-widest uppercase">Online</span>
                </div>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 p-4 overflow-y-auto max-h-80 min-h-64 space-y-4 flex flex-col">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] text-sm p-3 rounded-2xl ${
                    msg.role === 'user' 
                      ? 'bg-neutral-800 text-white rounded-br-sm' 
                      : 'bg-cyan-500/10 border border-cyan-500/20 text-cyan-50 rounded-bl-sm'
                  }`}>
                    {msg.content}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-cyan-500/10 border border-cyan-500/20 p-4 rounded-2xl rounded-bl-sm flex gap-1.5 items-center h-10">
                    <motion.div animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0 }} className="w-1.5 h-1.5 bg-cyan-400 rounded-full" />
                    <motion.div animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} className="w-1.5 h-1.5 bg-cyan-400 rounded-full" />
                    <motion.div animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} className="w-1.5 h-1.5 bg-cyan-400 rounded-full" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-3 border-t border-white/5 bg-black/50">
              <form onSubmit={handleSend} className="relative flex items-center">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about AI, specs, or pricing..."
                  className="w-full bg-white/5 border border-white/10 rounded-full pl-4 pr-12 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-500/50 focus:bg-white/10 transition-all font-light placeholder:text-neutral-600"
                />
                <button 
                  type="submit" 
                  disabled={!input.trim()}
                  className="absolute right-1 w-8 h-8 bg-cyan-500 text-black rounded-full flex items-center justify-center hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 transition-all"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// --- MAIN APP ---
export default function App() {
  const [orderModalOpen, setOrderModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<ServiceType | null>(null);

  const openOrder = (service?: ServiceType) => {
    if (service) setSelectedService(service);
    else setSelectedService(null);
    setOrderModalOpen(true);
  };

  return (
    <div className="bg-[#050505] min-h-screen text-neutral-300 overflow-x-hidden font-sans antialiased selection:bg-cyan-500/30 selection:text-white relative">
      <CustomCursor />
      <Background3D />
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-[50] glass-panel border-x-0 border-t-0 bg-[#050505]/60 backdrop-blur-3xl transition-all">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between max-w-7xl">
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-cyan-500/30 group-hover:bg-cyan-500/10 transition-all">
               <Zap className="w-4 h-4 text-white group-hover:text-cyan-400 transition-colors" />
            </div>
            <span className="text-white font-bold font-display tracking-tight text-lg">Piyumal</span>
          </a>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-neutral-400">
            <a href="#about" className="hover:text-white transition-colors">About</a>
            <a href="#builds" className="hover:text-white transition-colors">Builds</a>
            <a href="#services" className="hover:text-cyan-400 transition-colors">Services</a>
          </div>
          <div className="flex items-center gap-4">
            <a href="https://fiverr.com" target="_blank" rel="noreferrer" className="hidden sm:flex text-xs font-bold text-green-400 bg-green-400/10 border border-green-400/20 px-4 py-2 rounded-full hover:bg-green-400/20 transition-colors">
              Fiverr Select
            </a>
            <button type="button" onClick={() => openOrder()} className="bg-white text-black px-5 py-2.5 rounded-full text-sm font-bold hover:bg-neutral-200 hover:scale-105 transition-all cursor-pointer">
              Initialize
            </button>
          </div>
        </div>
      </nav>

      <main className="relative z-10 flex flex-col pt-20">
        
        {/* HERO */}
        <section className="relative min-h-[90vh] flex flex-col justify-center py-20 overflow-hidden">
          <div className="container mx-auto px-6 relative z-10 max-w-7xl">
            <motion.div 
              initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-4xl"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-panel text-[0.65rem] font-mono text-cyan-400 mb-8 border-cyan-500/20 shadow-[0_0_15px_rgba(6,182,212,0.1)] uppercase tracking-widest backdrop-blur-md">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                </span>
                Op-State: Ready & Accepting Orders
              </div>
              
              <h1 className="text-5xl sm:text-7xl md:text-8xl font-bold tracking-tighter text-white mb-6 font-display leading-[1.05]">
                Piyumal Walisundara
              </h1>
              <h2 className="text-2xl md:text-4xl font-medium text-neutral-400 mb-8 font-display">
                <span className="text-gradient">AI Systems Builder</span> & Automation Engineer
              </h2>
              
              <div className="flex flex-col sm:flex-row flex-wrap gap-4 mt-12">
                <button type="button" onClick={() => openOrder()} className="bg-white text-black px-8 py-4 rounded-full font-bold hover:bg-neutral-200 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(255,255,255,0.2)] cursor-pointer">
                  <Zap className="w-5 h-5" /> Order Service
                </button>
                <a href="#services" className="glass-panel hover:bg-white/10 hover:border-cyan-500/30 text-white px-8 py-4 rounded-full font-bold transition-all duration-300 flex items-center justify-center gap-2">
                  <Briefcase className="w-5 h-5" /> View Packages
                </a>
                <a href="https://fiverr.com" target="_blank" rel="noreferrer" className="glass-panel border-green-500/20 hover:bg-green-500/10 text-white px-8 py-4 rounded-full font-bold transition-all duration-300 flex items-center justify-center gap-2 group">
                  <ShieldCheck className="w-5 h-5 text-green-400 group-hover:scale-110 transition-transform" /> Hire on Fiverr
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ABOUT & NOW BUILDING */}
        <section id="about" className="py-24 relative z-10 border-t border-white/[0.05] bg-gradient-to-b from-[#050505]/80 to-[#050505]">
          <div className="container mx-auto px-6 max-w-7xl">
            <FadeIn>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
                
                {/* Identity Card */}
                <div className="lg:col-span-4 h-full">
                  <div className="glass-panel p-6 rounded-[2rem] glow-hover relative overflow-hidden group h-full flex flex-col border border-white/[0.05] bg-[#0a0a0a]">
                    <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-cyan-500/10 to-transparent" />
                    <div className="relative z-10 flex flex-col h-full">
                      <div className="flex justify-between items-start mb-6">
                        <div className="w-24 h-24 rounded-2xl bg-neutral-800 overflow-hidden border border-white/10 ring-4 ring-white/5 relative shadow-2xl">
                           <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200" alt="Profile" className="w-full h-full object-cover grayscale md:grayscale group-hover:grayscale-0 transition-all duration-500" crossOrigin="anonymous"/>
                        </div>
                        <div className="bg-white/5 border border-white/10 px-3 py-1 rounded-full text-[0.65rem] font-mono tracking-widest text-neutral-400 flex items-center gap-2">
                           <MapPin className="w-3 h-3 text-cyan-400" /> SRI LANKA · REMOTE
                        </div>
                      </div>
                      
                      <div className="mb-6">
                        <h3 className="text-white font-bold text-2xl mb-2 font-display">Piyumal Walisundara</h3>
                        <p className="text-neutral-400 text-sm italic">“I build like a researcher, ship like a product team.”</p>
                      </div>
                      
                      <div className="mt-auto space-y-2">
                        {["Evidence-driven dev", "Production-grade UI", "Secure workflow design"].map((skill) => (
                           <div key={skill} className="glass-panel rounded-lg p-3 text-xs flex justify-between items-center bg-white/[0.02]">
                             <span className="text-neutral-400 font-mono uppercase tracking-widest">{skill}</span>
                             <CheckCircle2 className="w-3 h-3 text-cyan-400" />
                           </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Now Building */}
                <div className="lg:col-span-8 flex flex-col h-full space-y-6">
                  <div className="flex justify-between items-end mb-2">
                    <div>
                      <h2 className="text-3xl font-bold text-white font-display mb-2">Now Building</h2>
                      <p className="text-sm text-neutral-500">Active systems and research tracks.</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-grow">
                    {[
                      { status: "RESEARCH", title: "3 IP Research Systems", desc: "Proprietary algorithms.", progress: 85, color: "text-violet-400", bg: "bg-violet-400", border: 'border-violet-500/20' },
                      { status: "ACTIVE", title: "AI Automation Workflows", desc: "Zero-touch process pipelines.", progress: 95, color: "text-cyan-400", bg: "bg-cyan-400", border: 'border-cyan-500/20' },
                      { status: "ITERATING", title: "Mobile UI Systems", desc: "React Native scale patterns.", progress: 70, color: "text-blue-400", bg: "bg-blue-400", border: 'border-blue-500/20' },
                      { status: "SCALING", title: "Local AI Assistants", desc: "Ollama/DeepSeek environment.", progress: 60, color: "text-emerald-400", bg: "bg-emerald-400", border: 'border-emerald-500/20' }
                    ].map((item, i) => (
                      <div key={i} className="glass-panel p-6 rounded-[1.5rem] flex flex-col bg-[#0a0a0a] group hover:bg-[#0f0f0f] transition-all">
                        <div className="flex justify-between items-start mb-4">
                          <div className={`text-[0.6rem] font-mono px-2 py-1 rounded border ${item.border} ${item.color} bg-[currentColor]/10 flex items-center gap-1.5`}>
                             <div className={`w-1 h-1 rounded-full ${item.bg}`} /> {item.status}
                          </div>
                        </div>
                        <h3 className="text-lg font-bold text-white mb-1 font-display">{item.title}</h3>
                        <p className="text-xs text-neutral-400 mb-6 flex-grow">{item.desc}</p>
                        
                        <div className="space-y-1.5 mt-auto">
                          <div className="flex justify-between text-[0.6rem] font-mono tracking-widest text-neutral-500 uppercase">
                            <span>Completeness</span>
                            <span className={item.color}>{item.progress}%</span>
                          </div>
                          <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                            <motion.div 
                              initial={{ width: 0 }} whileInView={{ width: `${item.progress}%` }} viewport={{ once: true }} transition={{ duration: 1 }}
                              className={`h-full ${item.bg} opacity-80`} 
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* SERVICES AND PRICING (MONEY SECTION) */}
        <section id="services" className="py-24 relative z-10 bg-[#050505]">
          <div className="container mx-auto px-6 max-w-7xl">
            <FadeIn>
              <div className="text-center mb-16">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 glass-panel rounded-full text-[0.65rem] font-mono text-cyan-400 mb-6 uppercase tracking-widest shadow-[0_0_15px_rgba(6,182,212,0.1)]">
                  <Database className="w-3 h-3" /> System Offerings
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 font-display">Services & Pricing</h2>
                <p className="text-neutral-500 text-sm max-w-xl mx-auto">Production-ready systems tailored for scale. View base packages or request custom architecture.</p>
              </div>

              {/* Service Capabilities */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
                {[
                  { title: "AI Automation Systems", price: "$500+", desc: "Custom GPT workflows & agents." },
                  { title: "Mobile App UI", price: "$800+", desc: "React Native premium experiences." },
                  { title: "SaaS Dashboards", price: "$1000+", desc: "Web UI tailored for startups." },
                  { title: "Local AI Setup", price: "$1500+", desc: "Ollama/DeepSeek private nodes." },
                ].map((s) => (
                  <div key={s.title} className="glass-panel p-6 rounded-[1.5rem] bg-[#0a0a0a] border border-white/[0.05] hover:border-cyan-500/30 transition-all flex flex-col">
                    <h3 className="text-white font-bold font-display mb-1">{s.title}</h3>
                    <p className="text-[0.7rem] text-neutral-400 mb-4 flex-grow">{s.desc}</p>
                    <div className="flex justify-between items-center mt-auto">
                      <span className="text-cyan-400 font-mono text-sm tracking-widest">{s.price}</span>
                      <button type="button" onClick={() => openOrder(s.title as ServiceType)} className="text-[0.65rem] font-bold text-black bg-white px-3 py-1.5 rounded-full hover:bg-neutral-300 transition-colors uppercase tracking-wider cursor-pointer">
                        Order
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pricing Tiers */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                {/* Starter */}
                <div className="glass-panel p-8 md:p-10 rounded-[2.5rem] bg-[#0a0a0a] border border-white/[0.05] h-full flex flex-col hover:-translate-y-2 transition-transform duration-500">
                   <div className="text-[0.7rem] uppercase tracking-widest font-mono text-neutral-500 mb-4">Starter</div>
                   <div className="flex items-end gap-1 mb-6">
                     <span className="text-4xl font-bold font-display text-white">$149</span>
                     <span className="text-sm text-neutral-500 mb-1">/base</span>
                   </div>
                   <ul className="space-y-4 mb-10 flex-grow font-light text-sm">
                     <li className="flex gap-3 text-neutral-300"><Check className="w-5 h-5 text-cyan-400 shrink-0"/> Single Page/Component</li>
                     <li className="flex gap-3 text-neutral-300"><Check className="w-5 h-5 text-cyan-400 shrink-0"/> Basic Responsive UI</li>
                     <li className="flex gap-3 text-neutral-300"><Check className="w-5 h-5 text-cyan-400 shrink-0"/> Setup & Deployment Docs</li>
                     <li className="flex gap-3 text-neutral-500"><X className="w-5 h-5 shrink-0"/> AI API Integration</li>
                   </ul>
                   <div className="text-xs text-neutral-500 font-mono mb-4 text-center">3-5 Days Delivery</div>
                   <button type="button" onClick={() => openOrder('Starter Plan')} className="w-full glass-panel border-white/10 hover:bg-white/10 text-white font-bold py-4 rounded-xl transition-all cursor-pointer">Order Starter</button>
                </div>
                
                {/* Pro (Highlighted) */}
                <div className="glass-panel p-8 md:p-10 rounded-[2.5rem] bg-[#0f0f0f] border border-cyan-500/30 h-full flex flex-col relative shadow-[0_0_50px_rgba(6,182,212,0.1)] -translate-y-2 lg:-translate-y-4">
                   <div className="absolute top-0 inset-x-0 bg-cyan-500 text-[0.6rem] font-bold text-black uppercase tracking-widest text-center py-1.5 font-mono rounded-t-[2.5rem]">Most Popular</div>
                   <div className="text-[0.7rem] uppercase tracking-widest font-mono text-cyan-400 mb-4 mt-2">Pro</div>
                   <div className="flex items-end gap-1 mb-6">
                     <span className="text-5xl font-bold font-display text-white">$399</span>
                     <span className="text-sm text-neutral-500 mb-1.5">/base</span>
                   </div>
                   <ul className="space-y-4 mb-10 flex-grow font-light text-sm">
                     <li className="flex gap-3 text-neutral-100"><Check className="w-5 h-5 text-cyan-400 shrink-0"/> Full Multiview App</li>
                     <li className="flex gap-3 text-neutral-100"><Check className="w-5 h-5 text-cyan-400 shrink-0"/> Premium Glassmorphism UI</li>
                     <li className="flex gap-3 text-neutral-100"><Check className="w-5 h-5 text-cyan-400 shrink-0"/> Standard AI Integration (OpenAI/Gemini)</li>
                     <li className="flex gap-3 text-neutral-100"><Check className="w-5 h-5 text-cyan-400 shrink-0"/> Custom Animations</li>
                   </ul>
                   <div className="text-xs text-cyan-400/80 font-mono mb-4 text-center">1-2 Weeks Delivery</div>
                   <button type="button" onClick={() => openOrder('Pro Plan')} className="w-full bg-cyan-500 hover:bg-cyan-600 text-white shadow-[0_0_20px_rgba(6,182,212,0.4)] font-bold py-4 rounded-xl transition-all cursor-pointer">Order Pro</button>
                </div>

                {/* Enterprise */}
                <div className="glass-panel p-8 md:p-10 rounded-[2.5rem] bg-[#0a0a0a] border border-white/[0.05] h-full flex flex-col hover:-translate-y-2 transition-transform duration-500">
                   <div className="text-[0.7rem] uppercase tracking-widest font-mono text-violet-400 mb-4">Enterprise</div>
                   <div className="flex items-end gap-1 mb-6">
                     <span className="text-4xl font-bold font-display text-white">$999</span>
                     <span className="text-sm text-neutral-500 mb-1">/base</span>
                   </div>
                   <ul className="space-y-4 mb-10 flex-grow font-light text-sm">
                     <li className="flex gap-3 text-neutral-300"><Check className="w-5 h-5 text-violet-400 shrink-0"/> Custom Local AI Model Integration</li>
                     <li className="flex gap-3 text-neutral-300"><Check className="w-5 h-5 text-violet-400 shrink-0"/> Complex Automation Pipelines</li>
                     <li className="flex gap-3 text-neutral-300"><Check className="w-5 h-5 text-violet-400 shrink-0"/> Database & Auth Setup</li>
                     <li className="flex gap-3 text-neutral-300"><Check className="w-5 h-5 text-violet-400 shrink-0"/> Priority Support & Handoff Session</li>
                   </ul>
                   <div className="text-xs text-neutral-500 font-mono mb-4 text-center">2-4 Weeks Delivery</div>
                   <button type="button" onClick={() => openOrder('Enterprise Plan')} className="w-full glass-panel border-white/10 hover:border-violet-500/50 hover:bg-violet-500/10 text-white font-bold py-4 rounded-xl transition-all cursor-pointer">Order Enterprise</button>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* SELECTED PORTFOLIO */}
        <section id="builds" className="py-24 relative z-10 bg-white/[0.01] border-y border-white/[0.05]">
          <div className="container mx-auto px-6 max-w-7xl">
            <FadeIn>
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-16 font-display text-center">Selected Vault</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  { title: "Local AI Assistant", tech: "Ollama / Next.js", prob: "Sensitive data leaking to public APIs", sol: "On-premise zero-trust local inference UI", impact: "100% Data Privacy" },
                  { title: "WhatsApp Automation", tech: "Twilio / Flowise", prob: "High volume lead drop-off", sol: "AI-driven qualification & CRM routing", impact: "Zero dropped leads" },
                  { title: "Mobile UI System", tech: "React Native / Expo", prob: "Laggy MVP development", sol: "Pre-built 60fps design system core", impact: "3x Faster shipping" },
                  { title: "SaaS Dashboard System", tech: "React / Tailwind / Three.js", prob: "Boring B2B interfaces", sol: "High-end 3D integrated portal framework", impact: "Premium perception shift" }
                ].map((p, i) => (
                  <div key={i} className="glass-panel p-8 rounded-[2rem] bg-[#0a0a0a] border border-white/[0.05] hover:border-cyan-500/30 group transition-all duration-500 flex flex-col">
                    <div className="flex justify-between items-start mb-8">
                      <div>
                        <div className="text-[0.6rem] font-mono text-cyan-400 mb-2 border border-cyan-500/20 bg-cyan-500/5 px-2.5 py-1 rounded w-fit uppercase tracking-widest">{p.tech}</div>
                        <h3 className="text-2xl font-bold text-white font-display">{p.title}</h3>
                      </div>
                    </div>
                    
                    <div className="space-y-4 mb-8 flex-grow">
                      <div className="bg-[#0f0f0f] p-4 rounded-xl border border-white/5">
                         <div className="text-[0.6rem] font-mono text-neutral-500 uppercase tracking-widest mb-1.5">Problem</div>
                         <div className="text-sm text-neutral-300">{p.prob}</div>
                      </div>
                      <div className="bg-cyan-500/5 p-4 rounded-xl border border-cyan-500/10">
                         <div className="text-[0.6rem] font-mono text-cyan-500 uppercase tracking-widest mb-1.5">Solution</div>
                         <div className="text-sm text-cyan-100">{p.sol}</div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-white/10 flex justify-between items-center">
                       <span className="text-xs text-neutral-400">Impact</span>
                       <span className="text-sm font-bold text-white tracking-wide">{p.impact}</span>
                    </div>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </section>

        {/* SECURE CALL TO ACTION */}
        <section className="py-32 relative z-10 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-cyan-900/20 via-transparent to-transparent pointer-events-none" />
          <div className="container mx-auto px-6 max-w-5xl">
            <FadeIn>
              <div className="glass-panel rounded-[3rem] p-10 md:p-20 text-center mx-auto border border-cyan-500/20 bg-[#0a0a0a]/80 shadow-[0_0_100px_rgba(6,182,212,0.1)] relative">
                
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-display tracking-tight leading-tight">
                  Want a system built instead of <br className="hidden md:block"/> just a website?
                </h2>
                
                <p className="text-neutral-400 max-w-xl mx-auto mb-10 leading-relaxed">
                  Lock in a research-grade architecture map and premium UI prototype for your next big AI product.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <button type="button" onClick={() => openOrder()} className="w-full sm:w-auto bg-white text-black px-10 py-5 rounded-full font-bold hover:bg-neutral-200 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center shadow-[0_0_30px_rgba(255,255,255,0.2)] text-lg cursor-pointer">
                    Start Project
                  </button>
                  <a href="https://calendly.com" target="_blank" rel="noreferrer" className="w-full sm:w-auto glass-panel hover:bg-white/10 text-white px-8 py-5 rounded-full font-bold transition-all flex items-center justify-center gap-2 border-white/10 text-lg">
                    <Calendar className="w-5 h-5" /> Book a Call
                  </a>
                </div>

                <div className="mt-12 flex flex-wrap justify-center gap-6 items-center border-t border-white/10 pt-8 opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-700">
                  <div className="flex items-center gap-2 text-[0.65rem] font-bold font-mono text-green-400 uppercase tracking-widest"><ShieldCheck className="w-4 h-4"/> Verified via Fiverr</div>
                  <div className="w-1 h-1 bg-white/20 rounded-full" />
                  <div className="flex items-center gap-2 text-[0.65rem] font-bold font-mono text-blue-400 uppercase tracking-widest"><Lock className="w-4 h-4"/> Secure Workflow Design</div>
                  <div className="w-1 h-1 bg-white/20 rounded-full" />
                  <div className="flex items-center gap-2 text-[0.65rem] font-bold font-mono text-cyan-400 uppercase tracking-widest"><Activity className="w-4 h-4"/> Fast Delivery Systems</div>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

      </main>

      <Footer />
      <OrderModal isOpen={orderModalOpen} onClose={() => setOrderModalOpen(false)} defaultService={selectedService} />
    </div>
  );
}

const Footer = () => {
  return (
    <footer className="border-t border-white/[0.05] bg-[#020202] py-12 relative z-10 w-full">
      <div className="container mx-auto px-6 max-w-7xl flex flex-col md:flex-row justify-between items-center gap-6 text-[0.65rem] font-mono text-neutral-500 uppercase tracking-widest">
        <p>© 2026 Piyumal Walisundara. Prod-01. Build: Success.</p>
        <div className="flex items-center gap-6">
           <a href="https://fiverr.com" className="hover:text-green-400 flex items-center gap-1 transition-colors"><ShieldCheck className="w-3 h-3"/> Fiverr</a>
           <a href="#" className="hover:text-white transition-colors">GitHub</a>
           <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
        </div>
      </div>
    </footer>
  );
}
