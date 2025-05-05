import { pgTable, text, serial, integer, numeric, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
}).extend({
  username: z.string().min(3, "Username must be at least 3 characters").nonempty("Username is required"),
  password: z.string().min(6, "Password must be at least 6 characters").nonempty("Password is required")
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Products
export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  price: numeric("price", { precision: 10, scale: 2 }).notNull(),
  image: text("image").notNull(),
  category: text("category").notNull(),
  featured: integer("featured").default(0),
  rating: numeric("rating", { precision: 3, scale: 1 }).default("0"),
  reviewCount: integer("review_count").default(0),
  badge: text("badge"),
});

export const insertProductSchema = createInsertSchema(products).omit({
  id: true,
});

export type InsertProduct = z.infer<typeof insertProductSchema>;
export type Product = typeof products.$inferSelect;

// Orders
export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  userId: integer("user_id"),
  total: numeric("total", { precision: 10, scale: 2 }).notNull(),
  status: text("status").notNull().default("pending"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertOrderSchema = createInsertSchema(orders).omit({
  id: true,
  createdAt: true,
});

export type InsertOrder = z.infer<typeof insertOrderSchema>;
export type Order = typeof orders.$inferSelect;

// Order Items
export const orderItems = pgTable("order_items", {
  id: serial("id").primaryKey(),
  orderId: integer("order_id").notNull(),
  productId: integer("product_id").notNull(),
  quantity: integer("quantity").notNull(),
  price: numeric("price", { precision: 10, scale: 2 }).notNull(),
});

export const insertOrderItemSchema = createInsertSchema(orderItems).omit({
  id: true,
});

export type InsertOrderItem = z.infer<typeof insertOrderItemSchema>;
export type OrderItem = typeof orderItems.$inferSelect;

// Cart schema for client side
export const cartItemSchema = z.object({
  id: z.number(),
  name: z.string(),
  price: z.number(),
  quantity: z.number(),
  image: z.string(),
});

export type CartItem = z.infer<typeof cartItemSchema>;

// Checkout schema
export const checkoutSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Valid email is required"),
  cardNumber: z.string().min(13, "Valid card number is required").max(19),
  expDate: z.string().min(4, "Valid expiration date is required"),
  cvv: z.string().min(3, "Valid CVV is required").max(4),
  items: z.array(cartItemSchema),
  subtotal: z.number(),
  tax: z.number(),
  total: z.number(),
});

export type CheckoutFormData = z.infer<typeof checkoutSchema>;
