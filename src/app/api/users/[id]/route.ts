import { eq } from "drizzle-orm";
import { users } from "@/db/schema/user.schema";
import db from "@/db";

export const DELETE = async (
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) => {
  const { id } = await params;

  try {
    const deletedUser = await db.delete(users).where(eq(users.id, id));
    return new Response(JSON.stringify(deletedUser), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Failed to delete user", details: error }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};
