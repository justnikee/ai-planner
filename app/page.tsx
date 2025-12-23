"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import {
  Mic,
  ArrowRight,
  Zap,
  CheckCircle,
  Shield,
  Activity,
  Layers,
  Cpu,
  Menu,
  X
} from "lucide-react";

export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-cyan-500/30 overflow-x-hidden">

      {/* 1. Sticky Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800" : "bg-transparent py-4"}`}>
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 to-violet-600 flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300">
              <span className="font-bold text-white text-lg">K</span>
            </div>
            <span className="text-xl font-bold tracking-tight text-white group-hover:text-cyan-400 transition-colors">Kārya</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="#features" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">Features</Link>
            <Link href="#how-it-works" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">How it Works</Link>
            <Link href="#philosophy" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">Philosophy</Link>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <Link href="/login" className="text-sm font-medium text-zinc-300 hover:text-white transition-colors">Log in</Link>
            <Link
              href="/signup"
              className="px-5 py-2.5 rounded-full bg-white text-zinc-950 text-sm font-bold hover:bg-zinc-200 transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_-5px_rgba(255,255,255,0.3)]"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-zinc-400 hover:text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Nav */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-zinc-900 border-b border-zinc-800 p-6 flex flex-col gap-4 animate-in slide-in-from-top-4">
            <Link href="#features" onClick={() => setMobileMenuOpen(false)} className="text-zinc-400 hover:text-white">Features</Link>
            <Link href="#how-it-works" onClick={() => setMobileMenuOpen(false)} className="text-zinc-400 hover:text-white">How it Works</Link>
            <Link href="/login" onClick={() => setMobileMenuOpen(false)} className="text-zinc-400 hover:text-white">Log in</Link>
            <Link
              href="/signup"
              onClick={() => setMobileMenuOpen(false)}
              className="text-center px-5 py-3 rounded-xl bg-white text-zinc-950 font-bold"
            >
              Get Started
            </Link>
          </div>
        )}
      </header>


      <main className="pt-24 md:pt-32">

        {/* 2. Hero Section */}
        <section className="px-6 max-w-7xl mx-auto mb-24 md:mb-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="max-w-2xl animate-in slide-in-from-bottom-8 duration-700 fade-in">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-medium text-cyan-400 mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                </span>
                Agentic AI Task Planner
              </div>

              <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-6 leading-[1.1]">
                Execute, <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-500">Don't Overthink.</span>
              </h1>

              <p className="text-xl text-zinc-400 mb-8 max-w-lg leading-relaxed">
                Kārya turns your natural language into organized action. Speak your intent, and let AI handle the structure. Simplicity is the ultimate sophistication.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/dashboard"
                  className="px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-600 to-violet-600 text-white font-bold text-lg hover:shadow-[0_0_40px_-10px_rgba(139,92,246,0.3)] transition-all hover:scale-[1.02] flex items-center justify-center gap-2 group"
                >
                  Start Planning
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <div className="px-8 py-4 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 font-medium flex items-center justify-center gap-2">
                  <span className="text-sm">Press 'K' to focus</span>
                </div>
              </div>
            </div>

            {/* Chat Visual */}
            <div className="relative animate-in slide-in-from-right-8 duration-1000 fade-in delay-200">
              <div className="absolute -top-20 -right-20 w-72 h-72 bg-violet-600/20 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-cyan-600/20 rounded-full blur-3xl"></div>

              <div className="relative bg-zinc-900/40 backdrop-blur-xl border border-zinc-800 rounded-2xl p-6 shadow-2xl">
                <div className="space-y-4">
                  {/* User Message */}
                  <div className="flex justify-end">
                    <div className="bg-zinc-800 text-zinc-200 px-4 py-3 rounded-2xl rounded-tr-none max-w-[80%] shadow-lg">
                      <p className="font-medium">Remind me to call Mom tomorrow at 6pm</p>
                    </div>
                  </div>

                  {/* AI Processing */}
                  <div className="flex justify-start items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-violet-600 flex items-center justify-center">
                      <Zap size={14} className="text-white" />
                    </div>
                    <div className="text-xs text-zinc-500 font-mono animate-pulse">Processing intent...</div>
                  </div>

                  {/* AI Response Card */}
                  <div className="flex justify-start">
                    <div className="bg-zinc-950/80 border border-zinc-800 text-zinc-200 p-4 rounded-2xl rounded-tl-none w-full max-w-[85%] shadow-lg">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                          <span className="font-bold text-lg">M</span>
                        </div>
                        <div>
                          <h4 className="font-bold text-white">Call Mom</h4>
                          <p className="text-xs text-zinc-400">Tomorrow, 6:00 PM</p>
                        </div>
                        <div className="ml-auto">
                          <span className="px-2 py-1 rounded text-[10px] font-bold bg-zinc-800 text-zinc-400 uppercase tracking-wider">Personal</span>
                        </div>
                      </div>
                      <div className="flex gap-2 mt-2">
                        <button className="flex-1 py-2 rounded-lg bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-500 transition-colors">Confirm</button>
                        <button className="flex-1 py-2 rounded-lg bg-zinc-800 text-zinc-400 text-xs font-bold hover:bg-zinc-700 transition-colors">Edit</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Problem Section */}
        <section className="py-24 bg-zinc-900/30 border-y border-zinc-800/50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">The Modern Productivity Paradox</h2>
              <p className="text-lg text-zinc-400">
                We spend more time managing our todo lists than actually doing the work.
                Complex menus, endless tags, and rigid structures are killing your flow.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-8 rounded-2xl bg-zinc-950 border border-zinc-800 hover:border-red-500/30 transition-colors group">
                <div className="mb-4 text-red-500/60 group-hover:text-red-500 transition-colors">
                  <Layers size={32} />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Complexity Overload</h3>
                <p className="text-sm text-zinc-500">Too many fields to fill out just to add a simple reminder. Friction destroys habit.</p>
              </div>
              <div className="p-8 rounded-2xl bg-zinc-950 border border-zinc-800 hover:border-red-500/30 transition-colors group">
                <div className="mb-4 text-red-500/60 group-hover:text-red-500 transition-colors">
                  <Activity size={32} />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Context Switching</h3>
                <p className="text-sm text-zinc-500">Jumping between tools to manage timelines breaks your deep work focus state.</p>
              </div>
              <div className="p-8 rounded-2xl bg-zinc-950 border border-zinc-800 hover:border-red-500/30 transition-colors group">
                <div className="mb-4 text-red-500/60 group-hover:text-red-500 transition-colors">
                  <X size={32} />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Rigid Systems</h3>
                <p className="text-sm text-zinc-500">Most planners force you into their methodology instead of adapting to yours.</p>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Solution & 5. How it Works */}
        <section id="how-it-works" className="py-24 bg-zinc-950 relative overflow-hidden">
          {/* Background Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-cyan-900/10 rounded-full blur-[120px] pointer-events-none"></div>

          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="text-center mb-20">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Designed for <span className="text-cyan-400">Flow</span></h2>
              <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
                Kārya gets out of your way. It understands natural language and context, so you can capture thoughts at the speed of light.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
              {/* Connecting Line (Desktop) */}
              <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-zinc-800 via-cyan-500/50 to-zinc-800 z-0"></div>

              {/* Step 1 */}
              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="w-24 h-24 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-6 shadow-xl shadow-cyan-900/20 group hover:scale-105 transition-transform duration-300">
                  <Mic className="text-cyan-400 w-10 h-10 group-hover:animate-pulse" />
                </div>
                <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-sm font-bold text-white">1</div>
                <h3 className="text-xl font-bold text-white mb-3">Speak or Type</h3>
                <p className="text-sm text-zinc-400 leading-relaxed max-w-xs">
                  "Draft the Q3 report by Friday" <br />
                  Just say what you need to do naturally.
                </p>
              </div>

              {/* Step 2 */}
              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="w-24 h-24 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-6 shadow-xl shadow-violet-900/20 group hover:scale-105 transition-transform duration-300">
                  <Cpu className="text-violet-400 w-10 h-10 group-hover:rotate-180 transition-transform duration-700" />
                </div>
                <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-sm font-bold text-white">2</div>
                <h3 className="text-xl font-bold text-white mb-3">AI Processing</h3>
                <p className="text-sm text-zinc-400 leading-relaxed max-w-xs">
                  Our engine parses dates, times, categories, and priority instantly.
                </p>
              </div>

              {/* Step 3 */}
              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="w-24 h-24 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-6 shadow-xl shadow-emerald-900/20 group hover:scale-105 transition-transform duration-300">
                  <CheckCircle className="text-emerald-400 w-10 h-10" />
                </div>
                <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-sm font-bold text-white">3</div>
                <h3 className="text-xl font-bold text-white mb-3">Actionable Task</h3>
                <p className="text-sm text-zinc-400 leading-relaxed max-w-xs">
                  The task is added to your secure planner, ready for execution.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 6. Feature Grid */}
        <section id="features" className="py-24 px-6 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <div className="group p-8 rounded-2xl bg-zinc-900/50 border border-zinc-800 hover:bg-zinc-900 hover:border-zinc-700 transition-all duration-300">
              <div className="w-12 h-12 rounded-lg bg-zinc-800 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Mic className="text-cyan-400 w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Voice Command</h3>
              <p className="text-zinc-400 text-sm">Capture tasks hands-free. Perfect for when you're on the move or brainstorming.</p>
            </div>

            {/* Feature 2 */}
            <div className="group p-8 rounded-2xl bg-zinc-900/50 border border-zinc-800 hover:bg-zinc-900 hover:border-zinc-700 transition-all duration-300">
              <div className="w-12 h-12 rounded-lg bg-zinc-800 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Zap className="text-yellow-400 w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Smart Parsing</h3>
              <p className="text-zinc-400 text-sm">Dates, times, and recurring schedules are detected automatically from your text.</p>
            </div>

            {/* Feature 3 */}
            <div className="group p-8 rounded-2xl bg-zinc-900/50 border border-zinc-800 hover:bg-zinc-900 hover:border-zinc-700 transition-all duration-300">
              <div className="w-12 h-12 rounded-lg bg-zinc-800 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Shield className="text-violet-400 w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Private by Default</h3>
              <p className="text-zinc-400 text-sm">Your data is encrypted. We don't sell your productivity patterns to advertisers.</p>
            </div>

            {/* Feature 4 */}
            <div className="group p-8 rounded-2xl bg-zinc-900/50 border border-zinc-800 hover:bg-zinc-900 hover:border-zinc-700 transition-all duration-300">
              <div className="w-12 h-12 rounded-lg bg-zinc-800 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Layers className="text-pink-400 w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Minimal UI</h3>
              <p className="text-zinc-400 text-sm">No clutter. Only what you need, when you need it. A zen garden for your tasks.</p>
            </div>

            {/* Feature 5 */}
            <div className="group p-8 rounded-2xl bg-zinc-900/50 border border-zinc-800 hover:bg-zinc-900 hover:border-zinc-700 transition-all duration-300">
              <div className="w-12 h-12 rounded-lg bg-zinc-800 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Activity className="text-emerald-400 w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Productivity Insights</h3>
              <p className="text-zinc-400 text-sm">Visualize your completion rates and peak productivity hours without judgment.</p>
            </div>

            {/* Feature 6 */}
            <div className="group p-8 rounded-2xl bg-zinc-900/50 border border-zinc-800 hover:bg-zinc-900 hover:border-zinc-700 transition-all duration-300">
              <div className="w-12 h-12 rounded-lg bg-zinc-800 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Cpu className="text-blue-400 w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Context Aware</h3>
              <p className="text-zinc-400 text-sm">Kārya knows your project structures and suggests where tasks belong.</p>
            </div>
          </div>
        </section>

        {/* 7. Trust / Philosophy */}
        <section id="philosophy" className="py-24 bg-zinc-900/20 border-t border-zinc-800">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold text-white mb-8">Built for Control, Not Engagement</h2>
            <p className="text-lg text-zinc-400 leading-relaxed mb-10">
              Most apps want you to stay in them as long as possible. We want the opposite.
              <br /><br />
              Kārya is built to be a <span className="text-cyan-400 font-medium">high-velocity tool</span>.
              Get in, dump your brain, get out, and execute. No gamification tricks, no social feeds, no distractions.
              Just pure, unadulterated focus.
            </p>
            <div className="flex justify-center gap-8 text-zinc-500 text-sm font-mono uppercase tracking-widest">
              <span className="flex items-center gap-2"><Shield size={14} /> E2E Encrypted</span>
              <span className="flex items-center gap-2"><Cpu size={14} /> Local First</span>
              <span className="flex items-center gap-2"><Zap size={14} /> No Ads</span>
            </div>
          </div>
        </section>

        {/* 8. Tech Credibility */}
        <section className="py-12 border-t border-zinc-900 bg-zinc-950">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <p className="text-zinc-600 text-sm font-semibold uppercase tracking-widest mb-6">Powered by modern infrastructure</p>
            <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
              <span className="text-xl font-bold text-zinc-300">OpenAI</span>
              <span className="text-xl font-bold text-zinc-300">Next.js</span>
              <span className="text-xl font-bold text-zinc-300">Supabase</span>
              <span className="text-xl font-bold text-zinc-300">Vercel</span>
            </div>
          </div>
        </section>

        {/* 9. CTA Section */}
        <section className="py-32 px-6">
          <div className="max-w-5xl mx-auto bg-gradient-to-b from-zinc-900 to-zinc-950 border border-zinc-800 rounded-3xl p-12 md:p-20 text-center relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 via-violet-500 to-cyan-500"></div>
            <div className="absolute -top-[200px] -left-[200px] w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[100px] group-hover:bg-cyan-500/20 transition-colors duration-700"></div>

            <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-8 relative z-10">
              Ready to reclaim your <br /> mental bandwidth?
            </h2>
            <p className="text-xl text-zinc-400 mb-10 max-w-xl mx-auto relative z-10">
              Join thousands of professionals who have switched to context-aware planning.
            </p>

            <div className="relative z-10">
              <Link
                href="/signup"
                className="inline-flex items-center gap-3 px-10 py-5 rounded-full bg-white text-zinc-950 text-lg font-bold hover:bg-zinc-200 transition-all hover:scale-105 active:scale-95 shadow-[0_0_30px_-5px_rgba(255,255,255,0.4)]"
              >
                Get Started for Free
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>

      </main>

      {/* 10. Footer */}
      <footer className="bg-zinc-950 border-t border-zinc-900 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-gradient-to-tr from-cyan-500 to-violet-600 flex items-center justify-center">
              <span className="font-bold text-white text-xs">K</span>
            </div>
            <span className="text-lg font-bold text-zinc-300">Kārya</span>
          </div>

          <div className="flex gap-8 text-sm text-zinc-500">
            <Link href="#" className="hover:text-white transition-colors">Privacy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms</Link>
            <Link href="#" className="hover:text-white transition-colors">Twitter</Link>
            <Link href="#" className="hover:text-white transition-colors">GitHub</Link>
          </div>

          <div className="text-sm text-zinc-600">
            &copy; {new Date().getFullYear()} Kārya Inc. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
