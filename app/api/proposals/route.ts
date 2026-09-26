import { searchProposals } from "@/lib/proposales";

export async function GET() {
  try {
    const proposals = await searchProposals();

    return Response.json({
      proposals,
    });
  } catch (error) {
    console.error("Failed to fetch proposals:", error);

    return Response.json(
      {
        error: "Failed to fetch proposals",
      },
      {
        status: 500,
      }
    );
  }
}