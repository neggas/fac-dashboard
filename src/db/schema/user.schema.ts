import { pgTable, uuid, varchar, timestamp, pgEnum } from "drizzle-orm/pg-core";
import { v4 as uuidv4 } from "uuid";

export const UserRole = pgEnum("user_role", ["drop", "admin"]);

export const users = pgTable("users", {
  id: uuid("id")
    .primaryKey()
    .$defaultFn(() => uuidv4()),
  email: varchar("email", { length: 255 }).unique(),
  name: varchar("name", { length: 255 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
  role: UserRole("role").default("drop").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});
