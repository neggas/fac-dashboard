import { relations } from "drizzle-orm/relations";
import { users, account, drops, invoices, invoiceDrops, ribs } from "./schema";

export const accountRelations = relations(account, ({one}) => ({
	user: one(users, {
		fields: [account.userId],
		references: [users.id]
	}),
}));

export const usersRelations = relations(users, ({many}) => ({
	accounts: many(account),
	drops: many(drops),
}));

export const dropsRelations = relations(drops, ({one, many}) => ({
	user: one(users, {
		fields: [drops.userId],
		references: [users.id]
	}),
	ribs: many(ribs),
}));

export const invoiceDropsRelations = relations(invoiceDrops, ({one}) => ({
	invoice: one(invoices, {
		fields: [invoiceDrops.invoiceId],
		references: [invoices.id]
	}),
	rib: one(ribs, {
		fields: [invoiceDrops.ribId],
		references: [ribs.id]
	}),
}));

export const invoicesRelations = relations(invoices, ({many}) => ({
	invoiceDrops: many(invoiceDrops),
}));

export const ribsRelations = relations(ribs, ({one, many}) => ({
	invoiceDrops: many(invoiceDrops),
	drop: one(drops, {
		fields: [ribs.dropId],
		references: [drops.id]
	}),
}));