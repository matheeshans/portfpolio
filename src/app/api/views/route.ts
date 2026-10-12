import { NextResponse } from "next/server";
import { eq, sql } from "drizzle-orm";
import { assertDb, hasDatabase } from "@/db";
import { pageViews } from "@/db/schema";

export const dynamic = "force-dynamic";

const SLUG = "portfolio";

/** Increments and returns the visit counter. */
export async function POST() {
  if (!hasDatabase) {
    return NextResponse.json({ ok: true, count: 0, disabled: true });
  }

  try {
    const db = assertDb();
    const [row] = await db
      .insert(pageViews)
      .values({ slug: SLUG, count: 1 })
      .onConflictDoUpdate({
        target: pageViews.slug,
        set: {
          count: sql`${pageViews.count} + 1`,
          updatedAt: new Date(),
        },
      })
      .returning({ count: pageViews.count });

    return NextResponse.json({ ok: true, count: row.count });
  } catch (error) {
    console.error("Failed to increment page views", error);
    return NextResponse.json(
      { ok: false, error: "Database not configured." },
      { status: 500 },
    );
  }
}

/** Reads the visit counter without incrementing. */
export async function GET() {
  if (!hasDatabase) {
    return NextResponse.json({ ok: true, count: 0, disabled: true });
  }

  try {
    const db = assertDb();
    const [row] = await db
      .select({ count: pageViews.count })
      .from(pageViews)
      .where(eq(pageViews.slug, SLUG))
      .limit(1);

    return NextResponse.json({ ok: true, count: row?.count ?? 0 });
  } catch (error) {
    console.error("Failed to read page views", error);
    return NextResponse.json(
      { ok: false, error: "Database not configured." },
      { status: 500 },
    );
  }
}
