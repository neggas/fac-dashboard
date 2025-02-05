import {
  pgTable,
  varchar,
  integer,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import type { AdapterAccount } from "next-auth/adapters";
import { users } from "./user.schema";
import { v4 as uuidv4 } from "uuid";

export const accounts = pgTable("account", {
  id: uuid("id")
    .primaryKey()
    .$defaultFn(() => uuidv4()),

  userId: uuid("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  type: varchar("type").$type<AdapterAccount>().notNull(),
  provider: varchar("provider").notNull(),
  providerAccountId: varchar("providerAccountId").notNull(),
  refresh_token: varchar("refresh_token"),
  access_token: varchar("access_token"),
  expires_at: integer("expires_at"),
  token_type: varchar("token_type"),
  scope: varchar("scope"),
  id_token: varchar("id_token"),
  session_state: varchar("session_state"),
  createdAt: timestamp("created_at").defaultNow(),
});
