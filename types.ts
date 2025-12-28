
export interface UserProfile {
  role: string;
  experience: string;
  goals: string;
  skills: { name: string; level: number }[];
  learningStyle: string;
  availability: string;
}

export interface CareerSummary {
  current_state: string;
  career_risks: string[];
  career_strengths: string[];
  overall_readiness_score: number;
}

export interface TargetRoleAnalysis {
  role: string;
  fit_score: number;
  why_this_role: string;
  risk_level: 'low' | 'medium' | 'high';
}

export interface CapabilityMap {
  technical: string[];
  domain: string[];
  cognitive: string[];
  communication_leadership: string[];
}

export interface SkillGapMatrixItem {
  skill: string;
  current_level: number;
  expected_level: number;
  gap: number;
  priority: 'critical' | 'high' | 'medium' | 'low';
  rationale: string;
}

export interface RoadmapPhase {
  phase_name: string;
  objective: string;
  skills_to_build: string[];
  recommended_actions: string[];
  success_indicators: string[];
  estimated_time_months: number;
}

export interface CareerArchitectureRoadmap {
  target_role: string;
  estimated_duration_months: number;
  difficulty_level: string;
  phases: RoadmapPhase[];
}

export interface StrategicAdvice {
  what_to_focus_on: string[];
  what_to_avoid: string[];
  career_leverage_moves: string[];
}

export interface CareerAnalysisResponse {
  career_summary: CareerSummary;
  target_roles_analysis: TargetRoleAnalysis[];
  capability_map: CapabilityMap;
  skill_gap_matrix: SkillGapMatrixItem[];
  career_architecture_roadmap: CareerArchitectureRoadmap;
  strategic_advice: StrategicAdvice;
}
