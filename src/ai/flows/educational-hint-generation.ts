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

Generate an interesting, short hint (2-3 sentences) about the culture, famous landmarks, food, or well-known facts of the country named {{{countryName}}}.

Ensure the hint is educational and engaging, and does not directly state the country's name or any obvious identifiers that would make the answer too easy. Focus on unique aspects.

Here's an example of a good hint for 'France': "This country is renowned for its exquisite pastries, iconic Eiffel Tower, and the artistic treasures found in the Louvre Museum. It's also famous for its annual cycling race."

Here's an example of a good hint for 'Japan': "This island nation is a land of ancient traditions and futuristic cities, home to cherry blossoms, bullet trains, and delicious sushi. Many also practice the art of origami here."

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
