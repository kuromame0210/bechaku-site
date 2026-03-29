import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"

const REPORTS_DIR = path.join(process.cwd(), "local", "reports")

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const file = searchParams.get("file")

  if (file) {
    const filePath = path.join(REPORTS_DIR, file)
    if (!filePath.startsWith(REPORTS_DIR) || !fs.existsSync(filePath)) {
      return NextResponse.json({ error: "Not found" }, { status: 404 })
    }
    const content = fs.readFileSync(filePath, "utf-8")
    return NextResponse.json({ content })
  }

  if (!fs.existsSync(REPORTS_DIR)) {
    return NextResponse.json({ files: [] })
  }

  const files = fs
    .readdirSync(REPORTS_DIR)
    .filter((f) => f.endsWith(".md"))
    .sort()
    .reverse()

  return NextResponse.json({ files })
}
