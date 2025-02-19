import { pgTable, text, serial, integer, boolean, decimal, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  isAdmin: boolean("is_admin").default(false),
});

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  price: decimal("price").notNull(),
  image: text("image").notNull(),
  category: text("category").notNull(),
  isAvailable: boolean("is_available").default(true).notNull(),
  rating: integer("rating").notNull(),
});

export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  customerName: text("customer_name").notNull(),
  phone: text("phone").notNull(),
  totalAmount: decimal("total_amount").notNull(),
  status: text("status").notNull().default('pending'),
  items: text("items").notNull(), // JSON string of ordered items
  createdAt: timestamp("created_at").defaultNow(),
});

export const notifications = pgTable("notifications", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  title: text("title").notNull(),
  message: text("message").notNull(),
  isRead: boolean("is_read").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const testimonials = pgTable("testimonials", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  comment: text("comment").notNull(),
  rating: integer("rating").notNull(),
  isApproved: boolean("is_approved").default(false),
});

export const hampers = pgTable("hampers", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  totalPrice: decimal("total_price").notNull(),
  items: text("items").notNull(), // JSON string of included products and quantities
  userId: integer("user_id").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).omit({ id: true });
export const insertProductSchema = createInsertSchema(products).omit({ id: true });
export const insertOrderSchema = createInsertSchema(orders).omit({ id: true });
export const insertTestimonialSchema = createInsertSchema(testimonials).omit({ id: true });
export const insertNotificationSchema = createInsertSchema(notifications).omit({ id: true });
export const insertHamperSchema = createInsertSchema(hampers).omit({ id: true });

export type User = typeof users.$inferSelect;
export type Product = typeof products.$inferSelect;
export type Order = typeof orders.$inferSelect;
export type Testimonial = typeof testimonials.$inferSelect;
export type Notification = typeof notifications.$inferSelect;
export type Hamper = typeof hampers.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type InsertProduct = z.infer<typeof insertProductSchema>;
export type InsertOrder = z.infer<typeof insertOrderSchema>;
export type InsertTestimonial = z.infer<typeof insertTestimonialSchema>;
export type InsertNotification = z.infer<typeof insertNotificationSchema>;
export type InsertHamper = z.infer<typeof insertHamperSchema>;