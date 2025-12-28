
import React, { useState } from 'react';
import { 
  Rocket, 
  Sparkles, 
  BrainCircuit, 
  Timer, 
  GraduationCap, 
  MessageSquare,
  ArrowRight,
  RefreshCw,
  Cpu
} from 'lucide-react';
import { UserProfile, CareerAnalysisResponse } from './types';
import { analyzeCareer } from './services/geminiService';
import { SkillInput } from './components/SkillInput';
import { Dashboard } from './components/Dashboard';

const App: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile>({
    role: '',
    experience: '',
    goals: '',
    skills: [],
    learningStyle: 'Practical / Hands-on',
    availability: '10'
  });

  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<CareerAnalysisResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const data = await analyzeCareer(profile);
      setResult(data);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setError(null);
  };

  return (
    <div className="min-h-screen pb-12">
      {/* Header */}
      <header className="sticky top-0 z-50 glass border-b border-slate-800 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-2 rounded-xl shadow-lg shadow-indigo-500/20">
            <Cpu className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-extrabold tracking-tight">Career<span className="text-indigo-400">Architect</span></h1>
            <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">AI Strategy & Optimization</p>
          </div>
        </div>

        {result && (
          <button 
            onClick={handleReset}
            className="text-xs font-semibold text-slate-400 hover:text-white flex items-center gap-2 transition-colors group"
          >
            <RefreshCw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
            Analyze New Profile
          </button>
        )}
      </header>

      <main className="max-w-6xl mx-auto px-6 pt-12">
        {!result ? (
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12 animate-in fade-in slide-in-from-top-4 duration-700">
              <h2 className="text-4xl font-black mb-4">Architect Your <span className="gradient-text">Future Self.</span></h2>
              <p className="text-slate-400 text-lg">
                Upload your professional blueprint and let our neural engine map your 
                ideal trajectory through the complex tech landscape.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="glass p-8 rounded-3xl space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-300 flex items-center gap-2">
                    <Rocket className="w-4 h-4 text-indigo-400" />
                    Current Role
                  </label>
                  <input
                    required
                    type="text"
                    value={profile.role}
                    onChange={(e) => setProfile({ ...profile, role: e.target.value })}
                    placeholder="e.g. Junior Web Developer"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all placeholder-slate-600 text-sm"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-300 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-indigo-400" />
                    Experience
                  </label>
                  <input
                    required
                    type="text"
                    value={profile.experience}
                    onChange={(e) => setProfile({ ...profile, experience: e.target.value })}
                    placeholder="e.g. 2 years in SaaS startups"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all placeholder-slate-600 text-sm"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-300 flex items-center gap-2">
                  <BrainCircuit className="w-4 h-4 text-indigo-400" />
                  Primary Career Goals
                </label>
                <textarea
                  required
                  rows={3}
                  value={profile.goals}
                  onChange={(e) => setProfile({ ...profile, goals: e.target.value })}
                  placeholder="e.g. Transition to Senior AI Engineer or CTO within 3 years..."
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all placeholder-slate-600 text-sm resize-none"
                />
              </div>

              <SkillInput 
                skills={profile.skills} 
                onSkillsChange={(skills) => setProfile({ ...profile, skills })} 
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-700/50">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-300 flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-indigo-400" />
                    Learning Style
                  </label>
                  <select
                    value={profile.learningStyle}
                    onChange={(e) => setProfile({ ...profile, learningStyle: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 transition-all text-sm appearance-none"
                  >
                    <option>Practical / Hands-on</option>
                    <option>Theoretical / Academic</option>
                    <option>Visual / Conceptual</option>
                    <option>Mentorship / Social</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-300 flex items-center gap-2">
                    <Timer className="w-4 h-4 text-indigo-400" />
                    Availability (hrs/week)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={profile.availability}
                    onChange={(e) => setProfile({ ...profile, availability: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 transition-all text-sm"
                  />
                </div>
              </div>

              <button
                disabled={isLoading}
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all transform active:scale-[0.98] shadow-lg shadow-indigo-600/20"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    Analyzing Capability Matrix...
                  </>
                ) : (
                  <>
                    Generate Architect's Roadmap
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>

              {error && (
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm flex items-start gap-3">
                  <MessageSquare className="w-5 h-5 shrink-0" />
                  {error}
                </div>
              )}
            </form>
          </div>
        ) : (
          <Dashboard data={result} />
        )}
      </main>

      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 z-[60] bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-6">
          <div className="max-w-md w-full text-center space-y-6">
            <div className="relative w-24 h-24 mx-auto">
              <div className="absolute inset-0 border-4 border-indigo-500/20 rounded-full" />
              <div className="absolute inset-0 border-t-4 border-indigo-500 rounded-full animate-spin" />
              <div className="absolute inset-4 bg-indigo-500/10 rounded-full flex items-center justify-center">
                <BrainCircuit className="w-8 h-8 text-indigo-400 animate-pulse" />
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-white">Synthesizing Strategy</h3>
              <p className="text-slate-400 text-sm">
                The Architect is currently processing market data, evaluating skill hierarchies, and designing your growth trajectory. 
                <br/><span className="italic opacity-60 mt-2 block">"The best way to predict the future is to architect it."</span>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
