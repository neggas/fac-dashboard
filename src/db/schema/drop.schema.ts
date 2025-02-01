import { pgTable, uuid, varchar, timestamp } from "drizzle-orm/pg-core";
import { users } from "./user.schema";
import { v4 as uuidv4 } from "uuid";

export const drops = pgTable("drops", {
  id: uuid("id")
    .primaryKey()
    .$defaultFn(() => uuidv4()),
  userId: uuid("user_id")
    .references(() => users.id)
    .unique(),
  name: varchar("name", { length: 255 }),
  createdAt: timestamp("created_at").defaultNow(),
});
