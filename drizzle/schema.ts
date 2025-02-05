import { pgTable, unique, uuid, varchar, timestamp, foreignKey, integer, numeric, date, boolean, pgEnum } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"

export const paymentStatus = pgEnum("payment_status", ['pending', 'paid', 'unpaid'])
export const userRole = pgEnum("user_role", ['drop', 'admin'])


export const users = pgTable("users", {
	id: uuid().primaryKey().notNull(),
	email: varchar({ length: 255 }),
	name: varchar({ length: 255 }).notNull(),
	password: varchar({ length: 255 }).notNull(),
	role: userRole().default('drop').notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow(),
}, (table) => [
	unique("users_email_unique").on(table.email),
	unique("users_name_unique").on(table.name),
]);

export const account = pgTable("account", {
	id: uuid().primaryKey().notNull(),
	userId: uuid().notNull(),
	type: varchar().notNull(),
	provider: varchar().notNull(),
	providerAccountId: varchar().notNull(),
	refreshToken: varchar("refresh_token"),
	accessToken: varchar("access_token"),
	expiresAt: integer("expires_at"),
	tokenType: varchar("token_type"),
	scope: varchar(),
	idToken: varchar("id_token"),
	sessionState: varchar("session_state"),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow(),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "account_userId_users_id_fk"
		}).onDelete("cascade"),
]);

export const drops = pgTable("drops", {
	id: uuid().primaryKey().notNull(),
	userId: uuid("user_id"),
	name: varchar({ length: 255 }),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow(),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "drops_user_id_users_id_fk"
		}),
	unique("drops_user_id_unique").on(table.userId),
]);

export const invoices = pgTable("invoices", {
	id: uuid().primaryKey().notNull(),
	comment: varchar({ length: 255 }),
	amount: numeric({ precision: 10, scale:  2 }).notNull(),
	dueDate: date("due_date").notNull(),
	status: paymentStatus().default('pending'),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow(),
});

export const invoiceDrops = pgTable("invoice_drops", {
	id: uuid().primaryKey().notNull(),
	invoiceId: uuid("invoice_id"),
	ribId: uuid("rib_id"),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow(),
}, (table) => [
	foreignKey({
			columns: [table.invoiceId],
			foreignColumns: [invoices.id],
			name: "invoice_drops_invoice_id_invoices_id_fk"
		}),
	foreignKey({
			columns: [table.ribId],
			foreignColumns: [ribs.id],
			name: "invoice_drops_rib_id_ribs_id_fk"
		}),
]);

export const ribs = pgTable("ribs", {
	id: uuid().primaryKey().notNull(),
	dropId: uuid("drop_id").notNull(),
	rib: varchar({ length: 255 }).notNull(),
	bankName: varchar("bank_name", { length: 255 }).notNull(),
	isValid: boolean("is_valid").default(true),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow(),
}, (table) => [
	foreignKey({
			columns: [table.dropId],
			foreignColumns: [drops.id],
			name: "ribs_drop_id_drops_id_fk"
		}),
	unique("ribs_rib_unique").on(table.rib),
]);
