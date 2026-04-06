import Anthropic from "@anthropic-ai/sdk";
import { NextRequest } from "next/server";

export const maxDuration = 60;

const ALLOWED_TYPES = ["application/pdf", "image/jpeg", "image/png", "image/jpg"];
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export interface ExtractedBid {
  contractor_name: string;
  project_type: string;
  items: {
    description: string;
    quantity: number;
    unit: string;
    unit_price: number;
    total: number;
  }[];
  subtotal: number;
  tax: number;
  grand_total: number;
  notes: string[];
}

export interface ExtractionResult {
  contractors: ExtractedBid[];
}

const EXTRACTION_PROMPT = `Extract all line items from this contractor bid/estimate/quote. Return JSON with this exact structure:
{
  "contractor_name": "string (contractor or company name, or 'Unknown Contractor' if not found)",
  "project_type": "string (e.g. Kitchen Remodel, Roof Repair)",
  "items": [
    {
      "description": "string",
      "quantity": number,
      "unit": "string (e.g. each, sqft, lf, hours)",
      "unit_price": number,
      "total": number
    }
  ],
  "subtotal": number,
  "tax": number,
  "grand_total": number,
  "notes": ["string"]
}

Rules:
- Return ONLY valid JSON, no markdown, no explanation
- If quantity or unit_price are unclear, estimate from the total
- If tax is not shown, use 0
- If subtotal equals grand_total, set tax to 0
- All numeric values must be numbers (not strings)
- If any field is unclear, make your best estimate and add a note`;

export async function POST(request: NextRequest) {
  const client = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY,
  });

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return Response.json({ error: "Invalid request body" }, { status: 400 });
  }

  const files = formData.getAll("files") as File[];

  if (!files || files.length < 2) {
    return Response.json({ error: "At least 2 files are required" }, { status: 400 });
  }

  // Validate files
  for (const file of files) {
    if (file.size > MAX_FILE_SIZE) {
      return Response.json(
        { error: `File "${file.name}" exceeds 10MB limit` },
        { status: 400 }
      );
    }
    const type = file.type || "application/octet-stream";
    if (!ALLOWED_TYPES.includes(type)) {
      return Response.json(
        { error: `File "${file.name}" must be a PDF, JPG, or PNG` },
        { status: 400 }
      );
    }
  }

  try {
    const contractors: ExtractedBid[] = await Promise.all(
      files.map(async (file) => {
        const bytes = await file.arrayBuffer();
        const base64 = Buffer.from(bytes).toString("base64");
        const fileType = file.type || "application/pdf";

        let contentBlock: Anthropic.MessageParam["content"];

        if (fileType === "application/pdf") {
          contentBlock = [
            {
              type: "document",
              source: {
                type: "base64",
                media_type: "application/pdf",
                data: base64,
              },
            } as Anthropic.DocumentBlockParam,
            { type: "text", text: EXTRACTION_PROMPT },
          ];
        } else {
          const imgType = fileType as "image/jpeg" | "image/png" | "image/gif" | "image/webp";
          contentBlock = [
            {
              type: "image",
              source: {
                type: "base64",
                media_type: imgType,
                data: base64,
              },
            } as Anthropic.ImageBlockParam,
            { type: "text", text: EXTRACTION_PROMPT },
          ];
        }

        const response = await client.messages.create({
          model: "claude-sonnet-4-0",
          max_tokens: 4096,
          messages: [{ role: "user", content: contentBlock }],
        });

        const textBlock = response.content.find((b) => b.type === "text");
        if (!textBlock || textBlock.type !== "text") {
          throw new Error("No text response from AI");
        }

        let raw = textBlock.text.trim();
        // Strip markdown code fences if present
        raw = raw.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/, "");

        const parsed = JSON.parse(raw) as ExtractedBid;
        // If contractor_name is missing, use filename
        if (!parsed.contractor_name) {
          parsed.contractor_name = file.name.replace(/\.[^.]+$/, "");
        }
        return parsed;
      })
    );

    const result: ExtractionResult = { contractors };
    return Response.json(result);
  } catch (err) {
    if (err instanceof Anthropic.AuthenticationError) {
      return Response.json(
        { error: "API key is invalid. Please configure ANTHROPIC_API_KEY." },
        { status: 401 }
      );
    }
    if (err instanceof Anthropic.RateLimitError) {
      return Response.json(
        { error: "Rate limit reached. Please try again in a moment." },
        { status: 429 }
      );
    }
    if (err instanceof Anthropic.APIError) {
      return Response.json(
        { error: `AI service error: ${err.message}` },
        { status: 502 }
      );
    }
    const message = err instanceof Error ? err.message : "Unexpected error";
    return Response.json({ error: message }, { status: 500 });
  }
}
