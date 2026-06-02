import { NextRequest, NextResponse } from "next/server";
import { classifyProduct } from "@/lib/classify";
import { ClassifyResponse, ApiError } from "@/lib/types";

export const runtime = "edge";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const description: string = (body.description ?? "").trim();

    if (!description) {
      return NextResponse.json<ApiError>(
        { error: "Product description is required." },
        { status: 400 }
      );
    }

    if (description.length > 500) {
      return NextResponse.json<ApiError>(
        { error: "Description too long. Keep it under 500 characters." },
        { status: 400 }
      );
    }

    const results = await classifyProduct(description);

    return NextResponse.json<ClassifyResponse>({
      results,
      query: description,
      disclaimer:
        "These classifications are AI-generated estimates for research purposes only. Always verify with a licensed customs broker before filing.",
    });
  } catch (err: unknown) {
    console.error("[classify]", err);
    const message =
      err instanceof Error ? err.message : "Classification failed.";
    return NextResponse.json<ApiError>({ error: message }, { status: 500 });
  }
}
