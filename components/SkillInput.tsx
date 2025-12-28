
import React from 'react';
import { Plus, Trash2, Award } from 'lucide-react';

interface SkillInputProps {
  skills: { name: string; level: number }[];
  onSkillsChange: (skills: { name: string; level: number }[]) => void;
}

export const SkillInput: React.FC<SkillInputProps> = ({ skills, onSkillsChange }) => {
  const addSkill = () => {
    onSkillsChange([...skills, { name: '', level: 5 }]);
  };

  const removeSkill = (index: number) => {
    onSkillsChange(skills.filter((_, i) => i !== index));
  };

  const updateSkill = (index: number, field: 'name' | 'level', value: string | number) => {
    const newSkills = [...skills];
    newSkills[index] = { ...newSkills[index], [field]: value };
    onSkillsChange(newSkills);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="text-sm font-semibold text-slate-300 flex items-center gap-2">
          <Award className="w-4 h-4 text-indigo-400" />
          Skill Assessment (1-10)
        </label>
        <button
          type="button"
          onClick={addSkill}
          className="text-xs font-medium text-indigo-400 hover:text-indigo-300 flex items-center gap-1 transition-colors"
        >
          <Plus className="w-3 h-3" /> Add Skill
        </button>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {skills.map((skill, index) => (
          <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-slate-800/50 border border-slate-700">
            <input
              type="text"
              placeholder="e.g. React, Python"
              value={skill.name}
              onChange={(e) => updateSkill(index, 'name', e.target.value)}
              className="flex-1 bg-transparent border-none focus:ring-0 text-sm placeholder-slate-500"
            />
            <div className="flex items-center gap-3 w-32">
              <input
                type="range"
                min="1"
                max="10"
                value={skill.level}
                onChange={(e) => updateSkill(index, 'level', parseInt(e.target.value))}
                className="w-full accent-indigo-500"
              />
              <span className="text-xs font-mono text-indigo-300 w-4">{skill.level}</span>
            </div>
            <button
              type="button"
              onClick={() => removeSkill(index)}
              className="text-slate-500 hover:text-red-400 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
        {skills.length === 0 && (
          <p className="text-xs text-slate-500 italic text-center py-4">
            No skills added yet. Add skills to help the AI architect your path.
          </p>
        )}
      </div>
    </div>
  );
};
