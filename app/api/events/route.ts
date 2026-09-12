import { NextResponse } from "next/server";
import pool from "@/lib/db";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const event = await request.json();

    if (
      typeof event.event !== "string" ||
      typeof event.timestamp !== "string"
    ) {
      return NextResponse.json(
        { success: false, error: "Invalid event payload" },
        { status: 400 }
      );
    }

    await pool.query(
      `INSERT INTO analytics_events
        (event_name, event_timestamp, properties)
       VALUES ($1, $2, $3::jsonb)`,
      [
        event.event,
        event.timestamp,
        JSON.stringify(event.properties ?? {}),
      ]
    );

    console.log("Analytics event saved:", event.event);

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error("Analytics API error:", error);

    return NextResponse.json(
      { success: false, error: "Failed to save analytics event" },
      { status: 500 }
    );
  }
}