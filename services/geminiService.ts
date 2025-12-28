
import { GoogleGenAI, Type } from "@google/genai";
import { UserProfile, CareerAnalysisResponse } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

const ANALYSIS_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    career_summary: {
      type: Type.OBJECT,
      properties: {
        current_state: { type: Type.STRING },
        career_risks: { type: Type.ARRAY, items: { type: Type.STRING } },
        career_strengths: { type: Type.ARRAY, items: { type: Type.STRING } },
        overall_readiness_score: { type: Type.NUMBER }
      },
      required: ["current_state", "career_risks", "career_strengths", "overall_readiness_score"]
    },
    target_roles_analysis: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          role: { type: Type.STRING },
          fit_score: { type: Type.NUMBER },
          why_this_role: { type: Type.STRING },
          risk_level: { type: Type.STRING, enum: ["low", "medium", "high"] }
        },
        required: ["role", "fit_score", "why_this_role", "risk_level"]
      }
    },
    capability_map: {
      type: Type.OBJECT,
      properties: {
        technical: { type: Type.ARRAY, items: { type: Type.STRING } },
        domain: { type: Type.ARRAY, items: { type: Type.STRING } },
        cognitive: { type: Type.ARRAY, items: { type: Type.STRING } },
        communication_leadership: { type: Type.ARRAY, items: { type: Type.STRING } }
      },
      required: ["technical", "domain", "cognitive", "communication_leadership"]
    },
    skill_gap_matrix: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          skill: { type: Type.STRING },
          current_level: { type: Type.NUMBER },
          expected_level: { type: Type.NUMBER },
          gap: { type: Type.NUMBER },
          priority: { type: Type.STRING, enum: ["critical", "high", "medium", "low"] },
          rationale: { type: Type.STRING }
        },
        required: ["skill", "current_level", "expected_level", "gap", "priority", "rationale"]
      }
    },
    career_architecture_roadmap: {
      type: Type.OBJECT,
      properties: {
        target_role: { type: Type.STRING },
        estimated_duration_months: { type: Type.NUMBER },
        difficulty_level: { type: Type.STRING },
        phases: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              phase_name: { type: Type.STRING },
              objective: { type: Type.STRING },
              skills_to_build: { type: Type.ARRAY, items: { type: Type.STRING } },
              recommended_actions: { type: Type.ARRAY, items: { type: Type.STRING } },
              success_indicators: { type: Type.ARRAY, items: { type: Type.STRING } },
              estimated_time_months: { type: Type.NUMBER }
            },
            required: ["phase_name", "objective", "skills_to_build", "recommended_actions", "success_indicators", "estimated_time_months"]
          }
        }
      },
      required: ["target_role", "estimated_duration_months", "difficulty_level", "phases"]
    },
    strategic_advice: {
      type: Type.OBJECT,
      properties: {
        what_to_focus_on: { type: Type.ARRAY, items: { type: Type.STRING } },
        what_to_avoid: { type: Type.ARRAY, items: { type: Type.STRING } },
        career_leverage_moves: { type: Type.ARRAY, items: { type: Type.STRING } }
      },
      required: ["what_to_focus_on", "what_to_avoid", "career_leverage_moves"]
    }
  },
  required: ["career_summary", "target_roles_analysis", "capability_map", "skill_gap_matrix", "career_architecture_roadmap", "strategic_advice"]
};

export async function analyzeCareer(profile: UserProfile): Promise<CareerAnalysisResponse> {
  const prompt = `
    As an AI Career Architect and Capability Strategist, analyze the following profile:
    - Current Role: ${profile.role}
    - Experience: ${profile.experience}
    - Career Goals: ${profile.goals}
    - Capability Signals: ${profile.skills.map(s => `${s.name} (${s.level}/10)`).join(', ')}
    - Learning Constraints: ${profile.learningStyle}, ${profile.availability} hrs/week

    System Thinking Directive:
    - Model this career as a system.
    - Provide structured, evidence-driven analysis.
    - Be trade-off aware and market-oriented.
    - Be direct and professional. Assume the user can handle uncomfortable truths.
    - Prioritize clarity over positivity.
    - Write like a senior architect advising a peer.

    Analyze current state, infer suitable target roles, decompose capabilities (Technical, Domain, Cognitive, Comm/Leadership), matrix the skill gaps, and architect a realistic phased roadmap.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: ANALYSIS_SCHEMA,
        thinkingConfig: { thinkingBudget: 2500 }
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    return parsed as CareerAnalysisResponse;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Failed to architect career roadmap. Please verify system connection.");
  }
}
