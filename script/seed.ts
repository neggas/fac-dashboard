import db from "@/db";
import { users } from "@/db/schema/user.schema";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcryptjs";

async function seed() {
  const hashedPassword = await bcrypt.hash("admin123", 10); // Change le mot de passe si besoin

  await db.insert(users).values({
    id: uuidv4(),
    name: "Admin",
    email: "admin@example.com",
    password: hashedPassword,
    role: "admin",
    createdAt: new Date(),
  });

  console.log("✅ Admin user created!");
  process.exit(0);
}

seed().catch((err) => {
  console.error("❌ Error seeding database:", err);
  process.exit(1);
});
