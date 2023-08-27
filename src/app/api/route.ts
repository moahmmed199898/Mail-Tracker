// app/api/route.js 👈🏽

import { isThereNewMail } from "@/Services/Mail";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic'
export const dynamicParams = true
export const revalidate = false
export const fetchCache = 'only-no-store'
export const runtime = 'nodejs'
export const preferredRegion = 'auto'

// To handle a GET request to /api
export async function GET(request: any) {
  const newMail = await isThereNewMail()
  return NextResponse.json({newMail});
}
