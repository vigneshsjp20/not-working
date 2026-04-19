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
  prompt: `You are a fun, educational, and highly romantic/playful AI assistant for a flag quiz game. 

Your goal is to provide two things for the country named {{{countryName}}}:

1. A rich hint about the country without directly revealing its name. Focus on identifiable landmarks and world-famous cuisine. 
   - Good hint example: "This country is renowned for its iconic Eiffel Tower and the artistic treasures found in the Louvre. Food lovers flock here for buttery croissants and world-class cheeses."

2. A "rewardSentence". This is a short, playful, and romantic sentence (1 sentence) suggesting an activity for "us" (the user and you) to do there. 
   - CRITICAL: The rewardSentence MUST be tailored specifically to what {{{countryName}}} is famous for.
   - Examples of rewardSentence:
     - For Italy: "We'll share a single strand of spaghetti while eating authentic Neapolitan pizza in Naples! 🍕🇮🇹"
     - For Japan: "In this place, we'll spend all night singing karaoke and eating fresh sushi together! 🍣🎤"
     - For Brazil: "We'll dance the samba all night long at the colorful Carnival in Rio! 💃🕺"
     - For France: "This beautiful spot is perfect for us to share a romantic kiss right under the Eiffel Tower! 💋🗼"

The rewardSentence should sound personal, like you are the user's adventurous partner (Ree 🌍❤️).

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
