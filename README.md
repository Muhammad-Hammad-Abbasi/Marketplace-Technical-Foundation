# **E-commerce Platform Documentation**

## **1. Project Overview**

This project is a fully functional e-commerce platform built using **Next.js, Sanity CMS, Clerk, Stripe, and ShipEngine**. It allows users to browse products, add them to the cart, checkout securely, and track their orders in real-time.

## **2. Tech Stack**

| Component        | Technology Used |
|-----------------|----------------|
| **Frontend**    | Next.js, React.js, Tailwind CSS |
| **Backend**     | Sanity CMS |
| **Authentication** | Clerk |
| **Payments**    | Stripe |
| **Shipment Tracking** | ShipEngine |
| **Hosting**     | Vercel |

## **3. Features**

### **Frontend Features**
- **User-Friendly Interface:** Responsive design for mobile and desktop users.
- **Pages:** Home, Product Listing, Product Details, Cart, Checkout, Order Confirmation.
- **Dynamic Routing:** Product and category pages are dynamically generated.
- **State Management:** Uses React Context API for cart and user session management.

### **Backend Features (Sanity CMS)**
- Stores **product data, customer details, and order records**.
- Provides a structured content management system with an intuitive UI.
- Enables real-time updates of stock levels.

### **Authentication (Clerk)**
- Handles **user registration, login, and session management**.
- Integrates with **Sanity CMS** to securely store user data.

### **Payments (Stripe)**
- **Secure payment gateway** for transactions.
- Supports **multiple payment methods**.
- Provides real-time **payment confirmation**.

### **Shipment Tracking (ShipEngine)**
- Provides **real-time tracking** for shipments.
- Users can check the **status of their orders**.

## **4. API Endpoints**

### **Product API**
| Endpoint | Method | Purpose | Response Example |
|----------|--------|---------|------------------|
| `/products` | GET | Fetch all product details | `{ "name": "Product Name", "slug": "product-slug", "price": 100 }` |
| `/products/:id` | GET | Fetch a single product by ID | `{ "name": "Product Name", "slug": "product-slug", "price": 100 }` |

### **Order API**
| Endpoint | Method | Purpose | Response Example |
|----------|--------|---------|------------------|
| `/order` | POST | Add new order details | `{ "orderId": 123, "status": "success" }` |
| `/order/:id` | GET | Fetch order details | `{ "orderId": 123, "status": "shipped" }` |

### **Shipment Tracking API**
| Endpoint | Method | Purpose | Response Example |
|----------|--------|---------|------------------|
| `/shipment-tracking` | GET | Get tracking updates | `{ "trackingId": "AB123", "status": "In Transit" }` |
| `/delivery-status` | GET | Get delivery tracking information | `{ "orderId": 456, "deliveryTime": "30 mins" }` |

### **Cart API**
| Endpoint | Method | Purpose | Response Example |
|----------|--------|---------|------------------|
| `/cart` | POST | Add product to cart | `{ "cartId": 101, "items": [...] }` |
| `/cart` | GET | Fetch cart details | `{ "cartId": 101, "items": [...] }` |

## **5. Database Schema (Sanity CMS)**

### **Product Schema**
```javascript
export default {
  name: "product",
  title: "Product",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Product Name",
      type: "string",
      validation: Rule => Rule.required().error("Product name is required."),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 200,
      },
      validation: Rule => Rule.required().error("Slug is required."),
    },
    {
      name: "image",
      title: "Main Image",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: Rule => Rule.required().error("Main image is required."),
    },
    {
      name: "price",
      title: "Price",
      type: "number",
      validation: Rule => Rule.required().error("Price is required."),
    },
    {
      name: "discountPrice",
      title: "Discount Price",
      type: "number",
      validation: Rule =>
        Rule.min(0).error("Discount price cannot be negative.")
          .custom((discountPrice, context) => {
            const price = context.document?.price;
            return discountPrice < price
              ? true
              : "Discount price should be less than the original price.";
          }),
    },
  ],
};
```

## **6. User Roles & Permissions**

| Role | Permissions |
|------|------------|
| **Admin** | Can add, edit, and delete products, manage orders, and view all customer details. |
| **Customer** | Can browse products, add to cart, place orders, and track shipments. |

## **7. Deployment & Hosting**
- The frontend is hosted on **Vercel**.
- Sanity CMS manages content and stores data.
- **Environment Variables:** API keys and credentials are stored in **.env.local** file.
- **CI/CD Pipeline:** Automated deployment with **GitHub Actions**.

## **8. Future Enhancements**
- **User Reviews & Ratings:** Allow customers to leave feedback.
- **Wishlist Feature:** Save favorite products.
- **Admin Dashboard:** A separate admin panel for managing orders and inventory.

---

## **Conclusion**
This documentation provides a detailed overview of the **E-commerce Platform**, covering its **tech stack, features, API structure, database schema, and deployment details**. Future updates can enhance the functionality by adding new features like user reviews and advanced analytics. 🚀

