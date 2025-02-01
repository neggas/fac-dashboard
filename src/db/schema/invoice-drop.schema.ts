import { pgTable, timestamp, uuid } from "drizzle-orm/pg-core";
import { invoices } from "./invoice.schema";

import { v4 as uuidv4 } from "uuid";
import { ribs } from "./ribs.schema";

export const invoiceDrops = pgTable("invoice_drops", {
  id: uuid("id")
    .primaryKey()
    .$defaultFn(() => uuidv4()),
  invoiceId: uuid("invoice_id").references(() => invoices.id),
  ribId: uuid("rib_id").references(() => ribs.id),
  createdAt: timestamp("created_at").defaultNow(),
});
