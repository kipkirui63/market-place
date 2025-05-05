import { 
  users, type User, type InsertUser,
  products, type Product, type InsertProduct,
  orders, type Order, type InsertOrder,
  orderItems, type OrderItem, type InsertOrderItem
} from "@shared/schema";

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
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private productsMap: Map<number, Product>;
  private orders: Map<number, Order>;
  private orderItems: Map<number, OrderItem>;
  
  userIdCounter: number;
  productIdCounter: number;
  orderIdCounter: number;
  orderItemIdCounter: number;

  constructor() {
    this.users = new Map();
    this.productsMap = new Map();
    this.orders = new Map();
    this.orderItems = new Map();
    
    this.userIdCounter = 1;
    this.productIdCounter = 1;
    this.orderIdCounter = 1;
    this.orderItemIdCounter = 1;
    
    // Initialize with sample products
    this.initializeProducts();
  }
  
  private initializeProducts() {
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
    
    sampleProducts.forEach((product) => {
      this.createProduct(product);
    });
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userIdCounter++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // Product methods
  async getProducts(): Promise<Product[]> {
    return Array.from(this.productsMap.values());
  }
  
  async getProductById(id: number): Promise<Product | undefined> {
    return this.productsMap.get(id);
  }
  
  async getProductsByCategory(category: string): Promise<Product[]> {
    if (category === "All Apps") {
      return this.getProducts();
    }
    
    return Array.from(this.productsMap.values())
      .filter(product => product.category === category);
  }
  
  async getFeaturedProducts(): Promise<Product[]> {
    return Array.from(this.productsMap.values())
      .filter(product => product.featured === 1);
  }
  
  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const id = this.productIdCounter++;
    const product: Product = { 
      ...insertProduct, 
      id,
      featured: insertProduct.featured ?? 0,
      rating: insertProduct.rating ?? "0",
      reviewCount: insertProduct.reviewCount ?? 0,
      badge: insertProduct.badge ?? null
    };
    this.productsMap.set(id, product);
    return product;
  }
  
  // Order methods
  async createOrder(insertOrder: InsertOrder): Promise<Order> {
    const id = this.orderIdCounter++;
    const now = new Date();
    const order: Order = { 
      ...insertOrder, 
      id, 
      createdAt: now,
      status: insertOrder.status ?? "pending",
      userId: insertOrder.userId ?? null
    };
    this.orders.set(id, order);
    return order;
  }
  
  async getOrderById(id: number): Promise<Order | undefined> {
    return this.orders.get(id);
  }
  
  // Order Item methods
  async createOrderItem(insertOrderItem: InsertOrderItem): Promise<OrderItem> {
    const id = this.orderItemIdCounter++;
    const orderItem: OrderItem = { ...insertOrderItem, id };
    this.orderItems.set(id, orderItem);
    return orderItem;
  }
  
  async getOrderItemsByOrderId(orderId: number): Promise<OrderItem[]> {
    return Array.from(this.orderItems.values())
      .filter(item => item.orderId === orderId);
  }
}

export const storage = new MemStorage();
