CREATE TYPE "public"."payment_status" AS ENUM('pending', 'paid', 'unpaid');--> statement-breakpoint
CREATE TABLE "drops" (
	"id" uuid PRIMARY KEY NOT NULL,
	"user_id" uuid,
	"name" varchar(255),
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "drops_user_id_unique" UNIQUE("user_id")
);
--> statement-breakpoint
CREATE TABLE "invoice_drops" (
	"id" uuid PRIMARY KEY NOT NULL,
	"invoice_id" uuid,
	"rib_id" uuid,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "invoices" (
	"id" uuid PRIMARY KEY NOT NULL,
	"comment" varchar(255),
	"amount" numeric(10, 2) NOT NULL,
	"due_date" date NOT NULL,
	"status" "payment_status" DEFAULT 'pending',
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "ribs" (
	"id" uuid PRIMARY KEY NOT NULL,
	"drop_id" uuid NOT NULL,
	"rib" varchar(255) NOT NULL,
	"bank_name" varchar(255) NOT NULL,
	"is_valid" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "ribs_rib_unique" UNIQUE("rib")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY NOT NULL,
	"email" varchar(255) NOT NULL,
	"password" varchar(255) NOT NULL,
	"role" varchar(50) NOT NULL,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "drops" ADD CONSTRAINT "drops_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "invoice_drops" ADD CONSTRAINT "invoice_drops_invoice_id_invoices_id_fk" FOREIGN KEY ("invoice_id") REFERENCES "public"."invoices"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "invoice_drops" ADD CONSTRAINT "invoice_drops_rib_id_ribs_id_fk" FOREIGN KEY ("rib_id") REFERENCES "public"."ribs"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ribs" ADD CONSTRAINT "ribs_drop_id_drops_id_fk" FOREIGN KEY ("drop_id") REFERENCES "public"."drops"("id") ON DELETE no action ON UPDATE no action;