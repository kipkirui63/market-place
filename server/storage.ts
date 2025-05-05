import { 
  users, type User, type InsertUser,
  products, type Product, type InsertProduct,
  orders, type Order, type InsertOrder,
  orderItems, type OrderItem, type InsertOrderItem
} from "@shared/schema";
import session from "express-session";
import createMemoryStore from "memorystore";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Product methods
  getProducts(): Promise<Product[]>;
  getProductById(id: number): Promise<Product | undefined>;
  getProductsByCategory(category: string): Promise<Product[]>;
  getFeaturedProducts(): Promise<Product[]>;
  createProduct(product: InsertProduct): Promise<Product>;
  
  // Order methods
  createOrder(order: InsertOrder): Promise<Order>;
  getOrderById(id: number): Promise<Order | undefined>;
  
  // Order Item methods
  createOrderItem(orderItem: InsertOrderItem): Promise<OrderItem>;
  getOrderItemsByOrderId(orderId: number): Promise<OrderItem[]>;
  
  // Session store
  sessionStore: session.Store;
}

export class DatabaseStorage implements IStorage {
  sessionStore: session.Store;

  constructor() {
    // Set up the session store
    const MemoryStore = createMemoryStore(session);
    this.sessionStore = new MemoryStore({
      checkPeriod: 86400000 // 24 hours
    });
    
    // Initialize with sample products if none exist
    this.initializeProductsIfEmpty();
  }
  
  private async initializeProductsIfEmpty() {
    // Check if we already have products
    const existingProducts = await this.getProducts();
    if (existingProducts.length > 0) {
      return;
    }
    
    const sampleProducts: InsertProduct[] = [
      {
        name: "AI Assistant Pro",
        description: "A powerful AI assistant that helps you automate tasks, generate content, and improve productivity.",
        price: "49.99",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        category: "Productivity",
        featured: 1,
        rating: "4.5",
        reviewCount: 128,
        badge: "TRENDING"
      },
      {
        name: "DataViz Analytics",
        description: "Comprehensive data visualization tool with AI-powered insights and interactive dashboards.",
        price: "79.99",
        image: "https://images.unsplash.com/photo-1517292987719-0369a794ec0f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        category: "Business",
        featured: 1,
        rating: "4.0",
        reviewCount: 94
      },
      {
        name: "Social Media Manager",
        description: "All-in-one platform to schedule posts, analyze engagement, and grow your social media presence.",
        price: "39.99",
        image: "https://images.unsplash.com/photo-1555421689-3f034debb7a6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        category: "Social Media",
        featured: 1,
        rating: "5.0",
        reviewCount: 76,
        badge: "NEW"
      },
      {
        name: "Code Assistant",
        description: "AI-powered coding assistant that helps you write better code faster with smart suggestions.",
        price: "59.99",
        image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        category: "Development",
        featured: 1,
        rating: "4.7",
        reviewCount: 152
      },
      {
        name: "Content Creator Studio",
        description: "Create professional-quality content with AI-powered tools for writing, design, and multimedia.",
        price: "69.99",
        image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        category: "Productivity",
        featured: 1,
        rating: "3.5",
        reviewCount: 63
      },
      {
        name: "Project Manager Pro",
        description: "Comprehensive project management solution with AI-powered task allocation and analytics.",
        price: "89.99",
        image: "https://images.unsplash.com/photo-1527689368864-3a821dbccc34?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        category: "Business",
        featured: 1,
        rating: "4.9",
        reviewCount: 217,
        badge: "BESTSELLER"
      }
    ];
    
    for (const product of sampleProducts) {
      await this.createProduct(product);
    }
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    const { db } = await import('./db');
    const { eq } = await import('drizzle-orm');
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const { db } = await import('./db');
    const { eq } = await import('drizzle-orm');
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const { db } = await import('./db');
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }
  
  // Product methods
  async getProducts(): Promise<Product[]> {
    const { db } = await import('./db');
    return db.select().from(products);
  }
  
  async getProductById(id: number): Promise<Product | undefined> {
    const { db } = await import('./db');
    const { eq } = await import('drizzle-orm');
    const [product] = await db.select().from(products).where(eq(products.id, id));
    return product;
  }
  
  async getProductsByCategory(category: string): Promise<Product[]> {
    const { db } = await import('./db');
    const { eq } = await import('drizzle-orm');
    
    if (category === "All Apps") {
      return this.getProducts();
    }
    
    return db.select().from(products).where(eq(products.category, category));
  }
  
  async getFeaturedProducts(): Promise<Product[]> {
    const { db } = await import('./db');
    const { eq } = await import('drizzle-orm');
    return db.select().from(products).where(eq(products.featured, 1));
  }
  
  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const { db } = await import('./db');
    const product = {
      ...insertProduct,
      featured: insertProduct.featured ?? 0,
      rating: insertProduct.rating ?? "0",
      reviewCount: insertProduct.reviewCount ?? 0,
      badge: insertProduct.badge ?? null
    };
    
    const [newProduct] = await db.insert(products).values(product).returning();
    return newProduct;
  }
  
  // Order methods
  async createOrder(insertOrder: InsertOrder): Promise<Order> {
    const { db } = await import('./db');
    const order = {
      ...insertOrder,
      status: insertOrder.status ?? "pending",
      userId: insertOrder.userId ?? null
    };
    
    const [newOrder] = await db.insert(orders).values(order).returning();
    return newOrder;
  }
  
  async getOrderById(id: number): Promise<Order | undefined> {
    const { db } = await import('./db');
    const { eq } = await import('drizzle-orm');
    const [order] = await db.select().from(orders).where(eq(orders.id, id));
    return order;
  }
  
  // Order Item methods
  async createOrderItem(insertOrderItem: InsertOrderItem): Promise<OrderItem> {
    const { db } = await import('./db');
    const [orderItem] = await db.insert(orderItems).values(insertOrderItem).returning();
    return orderItem;
  }
  
  async getOrderItemsByOrderId(orderId: number): Promise<OrderItem[]> {
    const { db } = await import('./db');
    const { eq } = await import('drizzle-orm');
    return db.select().from(orderItems).where(eq(orderItems.orderId, orderId));
  }
}

export const storage = new DatabaseStorage();
