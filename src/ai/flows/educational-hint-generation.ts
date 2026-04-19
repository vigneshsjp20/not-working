'use server';
/**
 * @fileOverview An AI agent that generates educational hints and fun rewards about a country.
 *
 * - educationalHintGeneration - A function that handles the generation process.
 * - EducationalHintGenerationInput - The input type for the function.
 * - EducationalHintGenerationOutput - The return type for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const EducationalHintGenerationInputSchema = z.object({
  countryName: z
    .string()
    .describe("The name of the country for which to generate content."),
});
export type EducationalHintGenerationInput = z.infer<
  typeof EducationalHintGenerationInputSchema
>;

const EducationalHintGenerationOutputSchema = z.object({
  hint: z.string().describe("An educational hint about the country."),
  rewardSentence: z.string().describe("A fun, playful reward sentence for getting the answer right, written in a personal 'we' style."),
});
export type EducationalHintGenerationOutput = z.infer<
  typeof EducationalHintGenerationOutputSchema
>;

export async function educationalHintGeneration(
  input: EducationalHintGenerationInput
): Promise<EducationalHintGenerationOutput> {
  return educationalHintGenerationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'educationalHintGenerationPrompt',
  input: {schema: EducationalHintGenerationInputSchema},
  output: {schema: EducationalHintGenerationOutputSchema},
  prompt: `You are a fun, educational, and highly romantic AI assistant for a flag quiz game. 

Your goal is to provide two things for the country named {{{countryName}}}:

1. A rich hint about the country without directly revealing its name. Focus on identifiable landmarks and world-famous cuisine. 
   - Good hint example: "This country is renowned for its iconic Eiffel Tower and the artistic treasures found in the Louvre. Food lovers flock here for buttery croissants and world-class cheeses."

2. A "rewardSentence". This is a short, deeply romantic and playful sentence (1 sentence) suggesting an activity for "us" (the user and you) to do there. 
   - CRITICAL: The rewardSentence MUST be unique and tailored specifically to what {{{countryName}}} is most romantic or famous for. It should feel like a dream date invitation.
   - Examples of rewardSentence:
     - For Italy: "We'll share a single strand of spaghetti under the moonlight in Venice, just like a scene from a movie! 🍝🚣‍♀️❤️"
     - For Japan: "I can't wait to walk hand-in-hand with you under the glowing cherry blossoms in Kyoto! 🌸👫💕"
     - For Brazil: "We'll lose ourselves in the rhythm of the samba, dancing closer and closer at the Rio Carnival! 💃🕺🔥"
     - For France: "Let's share the most romantic kiss of our lives right at the top of the Eiffel Tower as the city lights twinkle below us! 💋🗼✨"
     - For Greece: "We'll watch the most beautiful sunset in the world from a blue-domed roof in Santorini, just the two of us. 🌅🇬🇷💍"

The rewardSentence should sound personal, like you are the user's adventurous and loving partner (Ree 🌍❤️). Make it feel like an invitation to create a romantic memory together.

Hint and reward for {{{countryName}}}:`,
});

const educationalHintGenerationFlow = ai.defineFlow(
  {
    name: 'educationalHintGenerationFlow',
    inputSchema: EducationalHintGenerationInputSchema,
    outputSchema: EducationalHintGenerationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
