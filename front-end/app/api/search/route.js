import { fetchSearchResults } from "@/lib/search";
import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q") || "";

  if (!query.trim()) {
    return NextResponse.json({ results: [] });
  }

  try {
    const results = await fetchSearchResults(query, 6);
    return NextResponse.json({ results });
  } catch (error) {
    console.error("API /api/search error:", error);
    return NextResponse.json({ results: [], error: "Failed to search" }, { status: 500 });
  }
}
