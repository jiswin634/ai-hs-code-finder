import OpenAI from "openai";
import { HSResult } from "./types";

const client = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
  defaultHeaders: {
    "HTTP-Referer": "http://localhost:3000",
    "X-Title": "HS Code Finder",
  },
});

const SYSTEM_PROMPT = `
You are an expert customs classification specialist.

Given a product description, return the top 5 most likely HS codes ranked by confidence.

Return ONLY valid JSON array.

Each item must have:
- code
- description
- confidence
- chapter
- notes
`;

export async function classifyProduct(
  description: string
): Promise<HSResult[]> {
  const completion = await client.chat.completions.create({
    model: "openai/gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: SYSTEM_PROMPT,
      },
      {
        role: "user",
        content: `Product: ${description}`,
      },
    ],
  });

  const raw = completion.choices[0]?.message?.content ?? "[]";

console.log("RAW:", raw);

try {
  const cleaned = raw
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  return JSON.parse(cleaned);
} catch (e) {
  console.log("PARSE ERROR:", e);
  console.log("RAW RESPONSE:", raw);
  return [];
}
}