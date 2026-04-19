'use server';
/**
 * @fileOverview An AI agent that generates educational hints about a country.
 *
 * - educationalHintGeneration - A function that handles the educational hint generation process.
 * - EducationalHintGenerationInput - The input type for the educationalHintGeneration function.
 * - EducationalHintGenerationOutput - The return type for the educationalHintGeneration function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const EducationalHintGenerationInputSchema = z.object({
  countryName: z
    .string()
    .describe("The name of the country for which to generate a hint."),
});
export type EducationalHintGenerationInput = z.infer<
  typeof EducationalHintGenerationInputSchema
>;

const EducationalHintGenerationOutputSchema = z.object({
  hint: z.string().describe("An educational hint about the country."),
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
  prompt: `You are a fun, educational, and helpful AI assistant for a flag quiz game. Your goal is to provide a rich hint about the given country without directly revealing its name.

Generate an interesting, short hint (2-3 sentences) about the country named {{{countryName}}}.

CRITICAL: Your hint MUST focus on identifiable landmarks (e.g., famous buildings, natural wonders) and world-famous cuisine (e.g., iconic dishes, drinks, or ingredients) that help the player identify the country.

Ensure the hint is educational and engaging, and does NOT directly state the country's name or its capital city.

Here's an example of a good hint for 'France': "This country is renowned for its iconic Eiffel Tower and the artistic treasures found in the Louvre. Food lovers flock here for buttery croissants, world-class cheeses, and exquisite baguettes."

Here's an example of a good hint for 'Italy': "Home to the ancient Colosseum and the leaning tower of Pisa, this nation is a global leader in art and history. It is the birthplace of pizza and pasta, and it's famous for its rich gelato and espresso culture."

Hint for {{{countryName}}}:`,
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
