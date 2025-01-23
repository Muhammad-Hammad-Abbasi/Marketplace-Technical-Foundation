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
  