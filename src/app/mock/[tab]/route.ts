import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { NextRequest, NextResponse } from "next/server";

const tabToFile = {
  home: "11-Eduai Trips - Home.html",
  flights: "12-Eduai Trips - Domestic & Inter.html",
  hotels: "13-Eduai Trips - Domestic & Inter.html",
  packages: "14-Eduai Trips - Packages.html",
  payment: "15-Eduai Trips - Payment (PayU In.html",
  dashboard: "16-Eduai Trips - Integrated Custo.html",
  about: "17-Eduai Trips - About Us.html",
  terms: "18-Eduai Trips - Terms & Conditio.html",
  login: "10-Eduai Trips - Login (Mobile +.html",
} as const;

type TabKey = keyof typeof tabToFile;

export async function GET(
  _request: NextRequest,
  context: { params: Promise<{ tab: string }> },
) {
  const params = await context.params;
  const tab = params.tab as TabKey;
  const fileName = tabToFile[tab];

  if (!fileName) {
    return new NextResponse("Screen not found", { status: 404 });
  }

  try {
    const filePath = join(process.cwd(), "resources", fileName);
    const html = await readFile(filePath, "utf8");

    return new NextResponse(html, {
      headers: {
        "content-type": "text/html; charset=utf-8",
        "cache-control": "no-store",
      },
    });
  } catch {
    return new NextResponse("Unable to load screen", { status: 500 });
  }
}
