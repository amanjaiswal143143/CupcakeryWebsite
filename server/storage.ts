import { Product, InsertProduct, Order, InsertOrder, Testimonial, InsertTestimonial } from "@shared/schema";

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

export class MemStorage implements IStorage {
  private products: Map<number, Product>;
  private orders: Map<number, Order>;
  private testimonials: Map<number, Testimonial>;
  private currentProductId: number;
  private currentOrderId: number;
  private currentTestimonialId: number;

  constructor() {
    this.products = new Map();
    this.orders = new Map();
    this.testimonials = new Map();
    this.currentProductId = 1;
    this.currentOrderId = 1;
    this.currentTestimonialId = 1;
    
    // Add some sample products
    this.seedProducts();
  }

  private seedProducts() {
    const sampleProducts: InsertProduct[] = [
      {
        name: "Classic Vanilla Cupcake",
        description: "Light and fluffy vanilla cupcake with smooth buttercream frosting",
        price: "3.50",
        image: "https://images.unsplash.com/photo-1599785209707-a456fc1337bb",
        category: "Cupcakes",
        isAvailable: true,
      },
      // Add more sample products...
    ];

    sampleProducts.forEach(product => this.createProduct(product));
  }

  // Product methods
  async getProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }

  async getProduct(id: number): Promise<Product | undefined> {
    return this.products.get(id);
  }

  async createProduct(product: InsertProduct): Promise<Product> {
    const id = this.currentProductId++;
    const newProduct = { ...product, id };
    this.products.set(id, newProduct);
    return newProduct;
  }

  async updateProduct(id: number, product: Partial<InsertProduct>): Promise<Product | undefined> {
    const existing = this.products.get(id);
    if (!existing) return undefined;
    
    const updated = { ...existing, ...product };
    this.products.set(id, updated);
    return updated;
  }

  async deleteProduct(id: number): Promise<boolean> {
    return this.products.delete(id);
  }

  // Order methods
  async getOrders(): Promise<Order[]> {
    return Array.from(this.orders.values());
  }

  async createOrder(order: InsertOrder): Promise<Order> {
    const id = this.currentOrderId++;
    const newOrder = { ...order, id };
    this.orders.set(id, newOrder);
    return newOrder;
  }

  async updateOrderStatus(id: number, status: string): Promise<Order | undefined> {
    const existing = this.orders.get(id);
    if (!existing) return undefined;
    
    const updated = { ...existing, status };
    this.orders.set(id, updated);
    return updated;
  }

  // Testimonial methods
  async getTestimonials(approved?: boolean): Promise<Testimonial[]> {
    const testimonials = Array.from(this.testimonials.values());
    if (approved !== undefined) {
      return testimonials.filter(t => t.isApproved === approved);
    }
    return testimonials;
  }

  async createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial> {
    const id = this.currentTestimonialId++;
    const newTestimonial = { ...testimonial, id };
    this.testimonials.set(id, newTestimonial);
    return newTestimonial;
  }

  async approveTestimonial(id: number): Promise<Testimonial | undefined> {
    const existing = this.testimonials.get(id);
    if (!existing) return undefined;
    
    const updated = { ...existing, isApproved: true };
    this.testimonials.set(id, updated);
    return updated;
  }
}

export const storage = new MemStorage();
