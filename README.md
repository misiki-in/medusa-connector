# Shopify Connector

A powerful API connector for integrating Shopify with svelte-commerce platform. This package provides seamless integration between Shopify Admin API and Svelte Commerce, enabling you to synchronize products, orders, and other e-commerce data between the two platforms.

## Features

- Seamless integration between Shopify Admin API and Svelte Commerce
- TypeScript support
- Modular service architecture
- Easy to use and extend
- Comprehensive API coverage
- Shopify Admin API support (2024-10 version)
- Note: Cart and checkout operations require Shopify Storefront API

## Installation

```bash
# Using npm
npm install @misiki/shopify-connector

# Using yarn
yarn add @misiki/shopify-connector

# Using bun
bun add @misiki/shopify-connector
```

## Configuration

Before using the connector, you need to configure it with your Shopify credentials:

```typescript
import { BaseService } from '@misiki/shopify-connector/services'

// Set your Shopify credentials
BaseService.setShopifyCredentials(
  'your-store.myshopify.com',
  'your-access-token'
)
```

### Getting Shopify API Credentials

1. Go to your Shopify admin panel
2. Navigate to Settings > Apps and sales channels > Develop apps
3. Create a new app or use an existing one
4. Configure Admin API scopes (read/write as needed)
5. Install the app and copy the Admin API access token

## Usage

```typescript
import { productService } from '@misiki/shopify-connector/services'

// List products
const { data, count } = await productService.list({
  page: 1,
  perPage: 20,
  search: 'search term'
})

// Get single product
const product = await productService.getOne('product-handle')

// Get featured products
const featured = await productService.listFeaturedProducts({ page: 1 })
```

## Available Services

- **ProductService** - Products, variants, options
- **OrderService** - Orders, refunds
- **CartService** - Cart management (requires Storefront API)
- **CategoryService** - Collections
- **CollectionService** - Product tags
- **AuthService** - Customer authentication (admin and storefront)
- **CouponService** - Price rules and discounts
- **StoreService** - Shop information

## API Reference

### ProductService

```typescript
// List all products
productService.list({ page, perPage, search, tag, vendor })

// Get product by handle
productService.getOne(handle)

// Get product by ID
productService.getById(id)

// Get featured products
productService.listFeaturedProducts({ page, perPage })

// Get trending products
productService.listTrendingProducts({ page, perPage, search })
```

### CartService

Note: Shopify cart operations are best handled via the Storefront API. The Admin API does not provide cart endpoints.

```typescript
// Initialize cart (requires Storefront API)
cartService.initCart(customerId)

// Get cart (requires Storefront API)
cartService.getCart()

// Add to cart (requires Storefront API)
cartService.addToCart({ productId, variantId, qty })
```

### OrderService

```typescript
// List orders
orderService.list({ page, perPage, customerId })

// Get order by ID
orderService.fetchOrder(id)

// Create order
orderService.createOrder({ customerId, billing, shipping, lineItems })

// Update order status
orderService.updateOrderStatus(orderId, status)

// Process refund
orderService.refundOrder(orderId, amount, reason)
```

### CategoryService

```typescript
// Fetch all collections
categoryService.fetchAllCategories({ limit })

// Fetch single collection
categoryService.fetchCategory(id)

// Get products in collection
categoryService.fetchAllProductsOfCategory(id, { page, perPage })

// Get megamenu (all collections)
categoryService.getMegamenu()
```

## Important Notes

1. **Cart Operations**: Shopify uses the Storefront API for cart and checkout operations. The Admin API does not support cart management. For cart functionality, use the Shopify Storefront API directly or through a GraphQL client.

2. **Authentication**: This connector uses Admin API access tokens. For customer-facing operations (like cart and checkout), use the Storefront API with appropriate public access tokens.

3. **API Version**: This connector uses Shopify Admin API version 2024-10 by default.

4. **Rate Limits**: Be aware of Shopify's API rate limits. The connector does not implement rate limiting.

## Development

```bash
# Install dependencies
bun install

# Build the package
bun run build

# Run linter
bun run lint

# Format code
bun run format
```

## Contributing

We welcome contributions! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## Support

If you encounter any issues or have questions, please open an issue in the GitHub repository.
