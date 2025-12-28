
import React from 'react';
import { 
  Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer, 
  BarChart, Bar, XAxis, YAxis, Tooltip as ReTooltip, CartesianGrid, Legend,
  Area, AreaChart
} from 'recharts';
import { 
  Target, Zap, Compass, ArrowUpRight, CheckCircle2, 
  AlertCircle, Briefcase, TrendingUp, Calendar, Map,
  ShieldAlert, Award, Brain, MessageSquare, ListTodo, Avoid
} from 'lucide-react';
import { CareerAnalysisResponse } from '../types';

interface DashboardProps {
  data: CareerAnalysisResponse;
}

export const Dashboard: React.FC<DashboardProps> = ({ data }) => {
  const radarData = data.skill_gap_matrix.map(item => ({
    skill: item.skill,
    current: item.current_level,
    required: item.expected_level
  }));

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'critical': return 'text-red-400 border-red-400/30 bg-red-400/10';
      case 'high': return 'text-orange-400 border-orange-400/30 bg-orange-400/10';
      case 'medium': return 'text-yellow-400 border-yellow-400/30 bg-yellow-400/10';
      default: return 'text-blue-400 border-blue-400/30 bg-blue-400/10';
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk.toLowerCase()) {
      case 'high': return 'text-red-400 bg-red-400/10';
      case 'medium': return 'text-yellow-400 bg-yellow-400/10';
      default: return 'text-emerald-400 bg-emerald-400/10';
    }
  };

  return (
    <div className="space-y-8 pb-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* 1. Executive Summary & Readiness */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 glass p-8 rounded-2xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-indigo-500/20 rounded-lg">
              <Compass className="w-5 h-5 text-indigo-400" />
            </div>
            <h2 className="text-xl font-bold">System State Analysis</h2>
          </div>
          <p className="text-slate-300 leading-relaxed text-lg italic">
            "{data.career_summary.current_state}"
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <div>
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> System Strengths
              </h3>
              <ul className="space-y-2">
                {data.career_summary.career_strengths.map((s, i) => (
                  <li key={i} className="text-sm text-slate-400 flex items-start gap-2">
                    <div className="w-1 h-1 rounded-full bg-emerald-400 mt-2 shrink-0" />
                    {s}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                <ShieldAlert className="w-3.5 h-3.5 text-red-400" /> System Risks
              </h3>
              <ul className="space-y-2">
                {data.career_summary.career_risks.map((r, i) => (
                  <li key={i} className="text-sm text-slate-400 flex items-start gap-2">
                    <div className="w-1 h-1 rounded-full bg-red-400 mt-2 shrink-0" />
                    {r}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="glass p-8 rounded-2xl flex flex-col items-center justify-center text-center space-y-4">
          <div className="relative w-32 h-32 flex items-center justify-center">
             <svg className="w-full h-full transform -rotate-90">
                <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-slate-800" />
                <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="8" fill="transparent" 
                  strokeDasharray={364.4}
                  strokeDashoffset={364.4 * (1 - data.career_summary.overall_readiness_score / 100)}
                  className="text-indigo-500 transition-all duration-1000 ease-out" />
             </svg>
             <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-black text-white">{data.career_summary.overall_readiness_score}</span>
                <span className="text-[10px] text-slate-500 uppercase font-bold">Readiness</span>
             </div>
          </div>
          <p className="text-xs text-slate-400 leading-tight">Current system capability vs. market demand benchmarks.</p>
        </div>
      </div>

      {/* 2. Target Vectors (Roles) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {data.target_roles_analysis.map((item, i) => (
          <div key={i} className="glass p-6 rounded-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4">
               <div className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${getRiskColor(item.risk_level)}`}>
                 {item.risk_level} Risk
               </div>
            </div>
            <h3 className="text-lg font-bold text-white mb-2">{item.role}</h3>
            <div className="flex items-center gap-2 mb-4">
              <div className="h-1.5 flex-1 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-indigo-500 transition-all duration-1000" style={{ width: `${item.fit_score}%` }} />
              </div>
              <span className="text-xs font-mono text-indigo-400">{item.fit_score}% Fit</span>
            </div>
            <p className="text-sm text-slate-400 mb-4">{item.why_this_role}</p>
          </div>
        ))}
      </div>

      {/* 3. Detailed Capability Decomposition */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="glass p-8 rounded-2xl">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Brain className="w-5 h-5 text-indigo-400" /> Capability Matrix
          </h3>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                <PolarGrid stroke="#334155" />
                <PolarAngleAxis dataKey="skill" tick={{ fill: '#94a3b8', fontSize: 10 }} />
                <Radar name="Current" dataKey="current" stroke="#6366f1" fill="#6366f1" fillOpacity={0.4} />
                <Radar name="Required" dataKey="required" stroke="#f472b6" fill="#f472b6" fillOpacity={0.1} />
                <Legend iconType="circle" />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="glass p-5 rounded-2xl">
            <h4 className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-3">Technical Stack</h4>
            <div className="flex flex-wrap gap-1.5">
              {data.capability_map.technical.map((s, i) => <span key={i} className="px-2 py-0.5 rounded bg-slate-800 text-[11px] text-slate-300">{s}</span>)}
            </div>
          </div>
          <div className="glass p-5 rounded-2xl">
            <h4 className="text-[10px] font-black text-purple-400 uppercase tracking-widest mb-3">Domain Depth</h4>
            <div className="flex flex-wrap gap-1.5">
              {data.capability_map.domain.map((s, i) => <span key={i} className="px-2 py-0.5 rounded bg-slate-800 text-[11px] text-slate-300">{s}</span>)}
            </div>
          </div>
          <div className="glass p-5 rounded-2xl">
            <h4 className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-3">Cognitive Patterns</h4>
            <div className="flex flex-wrap gap-1.5">
              {data.capability_map.cognitive.map((s, i) => <span key={i} className="px-2 py-0.5 rounded bg-slate-800 text-[11px] text-slate-300">{s}</span>)}
            </div>
          </div>
          <div className="glass p-5 rounded-2xl">
            <h4 className="text-[10px] font-black text-emerald-400 uppercase tracking-widest mb-3">Leadership & Comm</h4>
            <div className="flex flex-wrap gap-1.5">
              {data.capability_map.communication_leadership.map((s, i) => <span key={i} className="px-2 py-0.5 rounded bg-slate-800 text-[11px] text-slate-300">{s}</span>)}
            </div>
          </div>
        </div>
      </div>

      {/* 4. Gap Prioritization */}
      <div className="glass p-8 rounded-2xl">
        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
          <Target className="w-5 h-5 text-red-400" /> Gap Matrix & Prioritization
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-700">
                <th className="pb-4 text-xs font-bold text-slate-500 uppercase">Capability</th>
                <th className="pb-4 text-xs font-bold text-slate-500 uppercase">Gap Delta</th>
                <th className="pb-4 text-xs font-bold text-slate-500 uppercase">Priority</th>
                <th className="pb-4 text-xs font-bold text-slate-500 uppercase">Rationale</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {data.skill_gap_matrix.map((item, i) => (
                <tr key={i} className="group hover:bg-slate-800/20 transition-colors">
                  <td className="py-4">
                    <div className="font-semibold text-white">{item.skill}</div>
                    <div className="text-[10px] text-slate-500 uppercase">LVL {item.current_level} → {item.expected_level}</div>
                  </td>
                  <td className="py-4">
                    <span className="text-red-400 font-mono">-{item.gap} pts</span>
                  </td>
                  <td className="py-4">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase border ${getPriorityColor(item.priority)}`}>
                      {item.priority}
                    </span>
                  </td>
                  <td className="py-4 text-sm text-slate-400 italic">
                    {item.rationale}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 5. Career Architecture Roadmap */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
           <div className="flex items-center gap-3">
             <div className="p-2 bg-purple-500/20 rounded-lg">
               <Map className="w-6 h-6 text-purple-400" />
             </div>
             <h3 className="text-2xl font-bold">Career Architecture: {data.career_architecture_roadmap.target_role}</h3>
           </div>
           <div className="px-4 py-2 rounded-xl bg-slate-800 border border-slate-700 flex items-center gap-4">
             <div className="text-center">
                <div className="text-[10px] text-slate-500 font-bold uppercase">Estimated Duration</div>
                <div className="text-lg font-black text-indigo-400">{data.career_architecture_roadmap.estimated_duration_months} Months</div>
             </div>
             <div className="w-px h-8 bg-slate-700" />
             <div className="text-center">
                <div className="text-[10px] text-slate-500 font-bold uppercase">Difficulty</div>
                <div className="text-lg font-black text-purple-400">{data.career_architecture_roadmap.difficulty_level}</div>
             </div>
           </div>
        </div>

        <div className="relative border-l-2 border-slate-700 ml-4 pl-8 space-y-12">
          {data.career_architecture_roadmap.phases.map((phase, i) => (
            <div key={i} className="relative">
              <div className="absolute -left-10 top-2 w-4 h-4 rounded-full bg-slate-700 border-4 border-slate-900 z-10" />
              <div className="glass p-8 rounded-3xl space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <span className="text-xs font-bold text-indigo-400 uppercase tracking-tighter">Phase {i + 1} • {phase.estimated_time_months} Months</span>
                    <h4 className="text-2xl font-bold text-white">{phase.phase_name}</h4>
                    <p className="text-slate-400 mt-2">{phase.objective}</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-indigo-500/5 border border-indigo-500/10 min-w-[200px]">
                    <h5 className="text-[10px] font-black text-indigo-300 uppercase mb-3">Success Indicators</h5>
                    <ul className="space-y-1.5">
                      {phase.success_indicators.map((si, ii) => (
                        <li key={ii} className="text-[11px] text-indigo-200/70 flex items-center gap-2">
                          <CheckCircle2 className="w-3 h-3 text-indigo-500" /> {si}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h5 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                       <Award className="w-4 h-4 text-purple-400" /> Delta Acquisition
                    </h5>
                    <div className="flex flex-wrap gap-2">
                      {phase.skills_to_build.map((skill, si) => (
                        <span key={si} className="text-xs bg-purple-500/10 text-purple-300 px-3 py-1 rounded-full border border-purple-500/20">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                       <ListTodo className="w-4 h-4 text-indigo-400" /> Recommended Actions
                    </h5>
                    <ul className="space-y-3">
                      {phase.recommended_actions.map((action, ai) => (
                        <li key={ai} className="text-sm text-slate-300 flex items-start gap-3">
                          <div className="w-5 h-5 rounded bg-slate-800 flex items-center justify-center shrink-0 mt-0.5">
                             <ArrowUpRight className="w-3 h-3 text-indigo-400" />
                          </div>
                          {action}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 6. Strategic Advice (Final) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-12">
         <div className="glass p-8 rounded-3xl bg-indigo-500/5 border-indigo-500/20">
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2 text-indigo-100">
               <TrendingUp className="w-5 h-5 text-indigo-400" /> Core Focus Area
            </h3>
            <ul className="space-y-4">
               {data.strategic_advice.what_to_focus_on.map((item, i) => (
                 <li key={i} className="text-sm text-slate-300 flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-indigo-500 mt-1.5 shrink-0" />
                    {item}
                 </li>
               ))}
            </ul>
         </div>

         <div className="glass p-8 rounded-3xl bg-red-500/5 border-red-500/20">
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2 text-red-100">
               <ShieldAlert className="w-5 h-5 text-red-400" /> Strategic Anti-Patterns
            </h3>
            <ul className="space-y-4">
               {data.strategic_advice.what_to_avoid.map((item, i) => (
                 <li key={i} className="text-sm text-slate-300 flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-red-500 mt-1.5 shrink-0" />
                    {item}
                 </li>
               ))}
            </ul>
         </div>

         <div className="glass p-8 rounded-3xl bg-emerald-500/5 border-emerald-500/20">
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2 text-emerald-100">
               <Zap className="w-5 h-5 text-emerald-400" /> High-Leverage Moves
            </h3>
            <ul className="space-y-4">
               {data.strategic_advice.career_leverage_moves.map((item, i) => (
                 <li key={i} className="text-sm text-slate-300 flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                    {item}
                 </li>
               ))}
            </ul>
         </div>
      </div>
    </div>
  );
};
