import { BetaAnalyticsDataClient } from "@google-analytics/data"
import path from "path"

const PROPERTY_ID = "528801813"
const KEY_FILE = path.join(
  process.cwd(),
  "local",
  "kurosawa-307214-2319b8a6e1b1.json",
)

function getClient() {
  return new BetaAnalyticsDataClient({ keyFilename: KEY_FILE })
}

export type SummaryData = {
  users: number
  sessions: number
  pageviews: number
  engagementRate: number
  avgSessionDuration: number
}

export type PageData = {
  path: string
  pageviews: number
  users: number
  avgEngagementTime: number
}

export type TrafficSource = {
  channel: string
  sessions: number
  engagementRate: number
}

export type EventData = {
  name: string
  count: number
  users: number
}

export type DailyData = {
  date: string
  users: number
  sessions: number
}

export async function getSummary(startDate: string, endDate: string): Promise<SummaryData> {
  const client = getClient()
  const [response] = await client.runReport({
    property: `properties/${PROPERTY_ID}`,
    dateRanges: [{ startDate, endDate }],
    metrics: [
      { name: "totalUsers" },
      { name: "sessions" },
      { name: "screenPageViews" },
      { name: "engagementRate" },
      { name: "averageSessionDuration" },
    ],
  })

  const row = response.rows?.[0]
  return {
    users: Number(row?.metricValues?.[0]?.value ?? 0),
    sessions: Number(row?.metricValues?.[1]?.value ?? 0),
    pageviews: Number(row?.metricValues?.[2]?.value ?? 0),
    engagementRate: Number(row?.metricValues?.[3]?.value ?? 0),
    avgSessionDuration: Number(row?.metricValues?.[4]?.value ?? 0),
  }
}

export async function getPageData(startDate: string, endDate: string): Promise<PageData[]> {
  const client = getClient()
  const [response] = await client.runReport({
    property: `properties/${PROPERTY_ID}`,
    dateRanges: [{ startDate, endDate }],
    dimensions: [{ name: "pagePath" }],
    metrics: [
      { name: "screenPageViews" },
      { name: "totalUsers" },
      { name: "averageSessionDuration" },
    ],
    orderBys: [{ metric: { metricName: "screenPageViews" }, desc: true }],
    limit: 20,
  })

  return (response.rows ?? []).map((row) => ({
    path: row.dimensionValues?.[0]?.value ?? "",
    pageviews: Number(row.metricValues?.[0]?.value ?? 0),
    users: Number(row.metricValues?.[1]?.value ?? 0),
    avgEngagementTime: Number(row.metricValues?.[2]?.value ?? 0),
  }))
}

export async function getTrafficSources(startDate: string, endDate: string): Promise<TrafficSource[]> {
  const client = getClient()
  const [response] = await client.runReport({
    property: `properties/${PROPERTY_ID}`,
    dateRanges: [{ startDate, endDate }],
    dimensions: [{ name: "sessionDefaultChannelGroup" }],
    metrics: [
      { name: "sessions" },
      { name: "engagementRate" },
    ],
    orderBys: [{ metric: { metricName: "sessions" }, desc: true }],
  })

  return (response.rows ?? []).map((row) => ({
    channel: row.dimensionValues?.[0]?.value ?? "",
    sessions: Number(row.metricValues?.[0]?.value ?? 0),
    engagementRate: Number(row.metricValues?.[1]?.value ?? 0),
  }))
}

export async function getEvents(startDate: string, endDate: string): Promise<EventData[]> {
  const client = getClient()
  const [response] = await client.runReport({
    property: `properties/${PROPERTY_ID}`,
    dateRanges: [{ startDate, endDate }],
    dimensions: [{ name: "eventName" }],
    metrics: [
      { name: "eventCount" },
      { name: "totalUsers" },
    ],
    orderBys: [{ metric: { metricName: "eventCount" }, desc: true }],
  })

  return (response.rows ?? []).map((row) => ({
    name: row.dimensionValues?.[0]?.value ?? "",
    count: Number(row.metricValues?.[0]?.value ?? 0),
    users: Number(row.metricValues?.[1]?.value ?? 0),
  }))
}

export async function getDailyData(startDate: string, endDate: string): Promise<DailyData[]> {
  const client = getClient()
  const [response] = await client.runReport({
    property: `properties/${PROPERTY_ID}`,
    dateRanges: [{ startDate, endDate }],
    dimensions: [{ name: "date" }],
    metrics: [
      { name: "totalUsers" },
      { name: "sessions" },
    ],
    orderBys: [{ dimension: { dimensionName: "date" } }],
  })

  return (response.rows ?? []).map((row) => {
    const raw = row.dimensionValues?.[0]?.value ?? ""
    const formatted = raw.length === 8
      ? `${raw.slice(0, 4)}-${raw.slice(4, 6)}-${raw.slice(6, 8)}`
      : raw
    return {
      date: formatted,
      users: Number(row.metricValues?.[0]?.value ?? 0),
      sessions: Number(row.metricValues?.[1]?.value ?? 0),
    }
  })
}
