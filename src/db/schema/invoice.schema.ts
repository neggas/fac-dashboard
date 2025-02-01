import {
  pgTable,
  uuid,
  varchar,
  timestamp,
  date,
  pgEnum,
  numeric,
} from "drizzle-orm/pg-core";
import { v4 as uuidv4 } from "uuid";

export const paymentStatusEnum = pgEnum("payment_status", [
  "pending",
  "paid",
  "unpaid",
]);

export const invoices = pgTable("invoices", {
  id: uuid("id")
    .primaryKey()
    .$defaultFn(() => uuidv4()),
  comment: varchar("comment", { length: 255 }),
  amount: numeric("amount", { precision: 10, scale: 2 }).notNull(),
  dueDate: date("due_date").notNull(),
  status: paymentStatusEnum("status").default("pending"),
  createdAt: timestamp("created_at").defaultNow(),
});
