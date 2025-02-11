import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth } from "./auth";

function isAdmin(req: Express.Request, res: Express.Response, next: Express.NextFunction) {
  if (!req.isAuthenticated()) {
    return res.status(401).send("Unauthorized");
  }
  if (!req.user?.isAdmin) {
    return res.status(403).send("Forbidden");
  }
  next();
}

export function registerRoutes(app: Express): Server {
  // Set up authentication
  setupAuth(app);

  // Products
  app.get("/api/products", async (_req, res) => {
    const products = await storage.getProducts();
    res.json(products);
  });

  app.get("/api/products/:id", async (req, res) => {
    const product = await storage.getProduct(Number(req.params.id));
    if (!product) return res.status(404).send("Product not found");
    res.json(product);
  });

  app.post("/api/products", isAdmin, async (req, res) => {
    const product = await storage.createProduct(req.body);
    res.status(201).json(product);
  });

  app.patch("/api/products/:id", isAdmin, async (req, res) => {
    const updated = await storage.updateProduct(Number(req.params.id), req.body);
    if (!updated) return res.status(404).send("Product not found");
    res.json(updated);
  });

  app.delete("/api/products/:id", isAdmin, async (req, res) => {
    const deleted = await storage.deleteProduct(Number(req.params.id));
    if (!deleted) return res.status(404).send("Product not found");
    res.sendStatus(204);
  });

  // Orders
  app.get("/api/orders", isAdmin, async (_req, res) => {
    const orders = await storage.getOrders();
    res.json(orders);
  });

  app.post("/api/orders", async (req, res) => {
    const order = await storage.createOrder(req.body);
    res.status(201).json(order);
  });

  app.patch("/api/orders/:id/status", isAdmin, async (req, res) => {
    const updated = await storage.updateOrderStatus(Number(req.params.id), req.body.status);
    if (!updated) return res.status(404).send("Order not found");
    res.json(updated);
  });

  // Testimonials
  app.get("/api/testimonials", async (req, res) => {
    const approved = req.query.approved === "true";
    const testimonials = await storage.getTestimonials(approved);
    res.json(testimonials);
  });

  app.post("/api/testimonials", async (req, res) => {
    const testimonial = await storage.createTestimonial(req.body);
    res.status(201).json(testimonial);
  });

  app.post("/api/testimonials/:id/approve", isAdmin, async (req, res) => {
    const approved = await storage.approveTestimonial(Number(req.params.id));
    if (!approved) return res.status(404).send("Testimonial not found");
    res.json(approved);
  });

  const httpServer = createServer(app);
  return httpServer;
}