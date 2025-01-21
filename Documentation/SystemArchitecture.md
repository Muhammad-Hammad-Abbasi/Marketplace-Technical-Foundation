**Day 2 Activities: Transitioning to Technical Planning**

1).  **Frontend**

  o  Home, 
  o  Product Listing,
  o  Product Details,
  o  Cart,
  o  Checkout,
  o  Order Confirmation

2).  **Backend** as **Sanity CMS**
    Every type of data will be stored in Sanity. 
    
  o  product data,
  o  customer details,
  o  order records  
 
3).  **Third-Party APIs**
   
  o  shipment tracking,
  o  payment gateways,


 <!-- *[Frontend (Next.js)]* -->

  o Interface is user-friendly, Responsive design for mobile and desktop users.
  o pages: Home, Product Listing, Product Details, Cart, Checkout,
    and Order Confirmation. 

     
 <!-- *[Sanity CMS]* -->
  
  o Customer, order details, and all product data will be saved in Sanity.


 <!-- *[Third-Party API]* -->
        
  o *Tracking API with (ShipEngine)*: Real-time shopping updates and generaters tracking details.
  o *Payment Gateway (Stripe)*: Processes secure transaction and confirms payment status.


**Authentication (Clerk):**

 o Handles user registration, login, and session management.
 o Integrates with Sanity CMS to store user data securely.


**Category-Specific Instructions**

o Standard product browsing, cart management, wishlist, and order placement.
o Inventory management and real-time stock updates.

<!-- Example: -->
1). Endpoint: /products
2). Method: GET
3). Purpose: Fetch all product listings.


<!-- Response Example: -->
**JSON:**
[
{
"name": "Product Name",
"slug": "slug",
"image": "/productimage.png",
"additionalImages": ["/productimage2.png", "/productimage3.png"],
"description": "Description",
"inStock": true,
"stock": 10
"price": 300,
"discountPrice": 80,

}
]

<!-- API Endpoints -->

**Endpoint :**          **Method**                **Purpose**                                           **Response Example**
(/products)                GET             Fetch all product details            [ { "name": "Product Name", "slug": "product-slug", "price": 100 } ]

(/order)                   POST              Add new order details                            { "orderId": 123, "status": "success" }

(/shipment-tracing)        GET                  tracking updates                          { "trackingId": "AB123", "status": "In Transit" }

(/delivery-status)         GET           delivery tracking information                      { "orderId": 456, "deliveryTime": "30 mins" }

(/inventory)               GET                real-time stock levels                              { "productId": 789, "stock": 50 }

(/cart)                    POST                Product Add to cart                                 { "cartId": 101, "items": [...] }


**Product Schema Example:**

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
      name: "additionalImages",
      title: "Additional Images",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
    },
    {
      name: "description",
      title: "Description",
      type: "text",
    },
    {
      name: "inStock",
      title: "In Stock",
      type: "boolean",
      initialValue: true,
    },
    {
      name: "stock",
      title: "Stock Quantity",
      type: "number",
      validation: Rule => Rule.min(0).error("Stock quantity cannot be negative."),
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
