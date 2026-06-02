export interface HSResult {
  code: string;        // e.g. "8471.30"
  description: string; // e.g. "Portable automatic data processing machines..."
  confidence: number;  // 0–100
  chapter: string;     // e.g. "Chapter 84 – Nuclear reactors, boilers..."
  notes?: string;      // optional duty/compliance note
}

export interface ClassifyRequest {
  description: string;
}

export interface ClassifyResponse {
  results: HSResult[];
  query: string;
  disclaimer: string;
}

export interface ApiError {
  error: string;
}
