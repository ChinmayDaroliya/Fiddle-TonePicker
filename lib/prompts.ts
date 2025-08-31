import { ToneCell } from "./types"

export const TONE_MATRIX: ToneCell[][] = [
      [
    { formality: 'formal', verbosity: 'concise', label: 'Formal & Concise' },
    { formality: 'neutral', verbosity: 'concise', label: 'Neutral & Concise' },
    { formality: 'casual', verbosity: 'concise', label: 'Casual & Concise' }
  ],
  [
    { formality: 'formal', verbosity: 'neutral', label: 'Formal & Balanced' },
    { formality: 'neutral', verbosity: 'neutral', label: 'Neutral & Balanced' },
    { formality: 'casual', verbosity: 'neutral', label: 'Casual & Balanced' }
  ],
  [
    { formality: 'formal', verbosity: 'elaborate', label: 'Formal & Elaborate' },
    { formality: 'neutral', verbosity: 'elaborate', label: 'Neutral & Elaborate' },
    { formality: 'casual', verbosity: 'elaborate', label: 'Casual & Elaborate' }
  ]
];

export function generatePrompt(
  text: string,
  formality: 'formal' | 'neutral' | 'casual',
  verbosity: 'concise' | 'neutral' | 'elaborate'
): string {
  const formalityInstructions = {
    formal: 'Use formal language, professional tone, and proper grammar',
    neutral: 'Use standard, clear language with moderate formality',
    casual: 'Use casual, conversational language and informal tone'
  };

  const verbosityInstructions = {
    concise: 'Be brief and to the point, remove unnecessary words',
    neutral: 'Maintain balanced length, neither too brief nor too wordy',
    elaborate: 'Expand with additional details, examples, and explanations'
  };

  return `Rewrite the following text to be ${formality} and ${verbosity}.

Instructions:
- ${formalityInstructions[formality]}
- ${verbosityInstructions[verbosity]}
- Preserve the original meaning and intent
- Keep the same language as the input
- Return only the rewritten text, no additional commentary

Text to rewrite: "${text}"`;
}