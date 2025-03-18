import { NextResponse } from "next/server";
import { mockData } from "@/components/mock/customer";

export async function GET() {
  return NextResponse.json(mockData);
}
