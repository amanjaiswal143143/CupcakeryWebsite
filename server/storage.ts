import { Product, InsertProduct, Order, InsertOrder, Testimonial, InsertTestimonial } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";
import { products, orders, testimonials } from "@shared/schema";

export interface IStorage {
  // Products
  getProducts(): Promise<Product[]>;
  getProduct(id: number): Promise<Product | undefined>;
  createProduct(product: InsertProduct): Promise<Product>;
  updateProduct(id: number, product: Partial<InsertProduct>): Promise<Product | undefined>;
  deleteProduct(id: number): Promise<boolean>;

  // Orders
  getOrders(): Promise<Order[]>;
  createOrder(order: InsertOrder): Promise<Order>;
  updateOrderStatus(id: number, status: string): Promise<Order | undefined>;

  // Testimonials
  getTestimonials(approved?: boolean): Promise<Testimonial[]>;
  createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial>;
  approveTestimonial(id: number): Promise<Testimonial | undefined>;
}

export class DatabaseStorage implements IStorage {
  // Product methods
  async getProducts(): Promise<Product[]> {
    return await db.select().from(products);
  }

  async getProduct(id: number): Promise<Product | undefined> {
    const [product] = await db.select().from(products).where(eq(products.id, id));
    return product;
  }

  async createProduct(product: InsertProduct): Promise<Product> {
    const [newProduct] = await db.insert(products).values(product).returning();
    return newProduct;
  }

  async updateProduct(id: number, product: Partial<InsertProduct>): Promise<Product | undefined> {
    const [updated] = await db
      .update(products)
      .set(product)
      .where(eq(products.id, id))
      .returning();
    return updated;
  }

  async deleteProduct(id: number): Promise<boolean> {
    const [deleted] = await db
      .delete(products)
      .where(eq(products.id, id))
      .returning();
    return !!deleted;
  }

  // Order methods
  async getOrders(): Promise<Order[]> {
    return await db.select().from(orders);
  }

  async createOrder(order: InsertOrder): Promise<Order> {
    const [newOrder] = await db.insert(orders).values(order).returning();
    return newOrder;
  }

  async updateOrderStatus(id: number, status: string): Promise<Order | undefined> {
    const [updated] = await db
      .update(orders)
      .set({ status })
      .where(eq(orders.id, id))
      .returning();
    return updated;
  }

  // Testimonial methods
  async getTestimonials(approved?: boolean): Promise<Testimonial[]> {
    if (approved !== undefined) {
      return await db
        .select()
        .from(testimonials)
        .where(eq(testimonials.isApproved, approved));
    }
    return await db.select().from(testimonials);
  }

  async createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial> {
    const [newTestimonial] = await db
      .insert(testimonials)
      .values(testimonial)
      .returning();
    return newTestimonial;
  }

  async approveTestimonial(id: number): Promise<Testimonial | undefined> {
    const [updated] = await db
      .update(testimonials)
      .set({ isApproved: true })
      .where(eq(testimonials.id, id))
      .returning();
    return updated;
  }
}

export const storage = new DatabaseStorage();