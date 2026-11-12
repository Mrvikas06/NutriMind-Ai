export const dynamic = "force-dynamic";

export async function GET() {
  return Response.json({
    status: "ok",
    service: "nutrimind-ai",
    timestamp: new Date().toISOString(),
  });
}
