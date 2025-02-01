import {
  boolean,
  pgTable,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { v4 as uuidv4 } from "uuid";
import { drops } from "./drop.schema";

export const ribs = pgTable("ribs", {
  id: uuid("id")
    .primaryKey()
    .$defaultFn(() => uuidv4()),
  dropId: uuid("drop_id")
    .references(() => drops.id)
    .notNull(),
  rib: varchar("rib", { length: 255 }).notNull().unique(),
  bankName: varchar("bank_name", { length: 255 }).notNull(),
  isValid: boolean("is_valid").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});
