import { assertDb, hasDatabase } from "@/db";
import { sql } from "drizzle-orm";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!hasDatabase) {
    return Response.json({
      ok: true,
      database: "not-configured",
      message: "Set DATABASE_URL to enable database-backed features.",
    });
  }

  try {
    const db = assertDb();
    await db.execute(sql`select 1`);
    return Response.json({ ok: true, database: "connected" });
  } catch {
    return Response.json(
      { ok: false, database: "unavailable" },
      { status: 503 },
    );
  }
}
