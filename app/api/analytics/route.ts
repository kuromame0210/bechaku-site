import { NextResponse } from "next/server"
import {
  getSummary,
  getPageData,
  getTrafficSources,
  getEvents,
  getDailyData,
} from "@/lib/ga4-report"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const startDate = searchParams.get("start") ?? "28daysAgo"
  const endDate = searchParams.get("end") ?? "today"

  try {
    const [summary, pages, traffic, events, daily] = await Promise.all([
      getSummary(startDate, endDate),
      getPageData(startDate, endDate),
      getTrafficSources(startDate, endDate),
      getEvents(startDate, endDate),
      getDailyData(startDate, endDate),
    ])

    return NextResponse.json({ summary, pages, traffic, events, daily })
  } catch (error) {
    console.error("Analytics API error:", error)
    return NextResponse.json(
      { error: "Failed to fetch analytics data" },
      { status: 500 },
    )
  }
}
