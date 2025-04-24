# Medusa Connector

A powerful API connector for integrating Medusa with svelte-commerce platform. This package provides seamless integration between Medusa and Svelte Commerce, enabling you to synchronize products, orders, and other e-commerce data between the two platforms.

## Features

- Seamless integration between Medusa and Svelte Commerce
- TypeScript support
- Modular service architecture
- Easy to use and extend
- Comprehensive API coverage

## Installation

```bash
# Using npm
npm install @misiki/medusa-connector

# Using yarn
yarn add @misiki/medusa-connector

# Using bun
bun add @misiki/medusa-connector
```

## Usage

```typescript
import { MedusaConnector } from '@misiki/medusa-connector'

// Initialize the connector
const connector = new MedusaConnector({
  medusaUrl: 'https://your-medusa-store.com',
  apiKey: 'your-api-key'
})

// Use specific services
import { ProductService } from '@misiki/medusa-connector/services'

const productService = new ProductService({
  medusaUrl: 'https://your-medusa-store.com',
  apiKey: 'your-api-key'
})
```

## Available Services

- ProductService
- OrderService
- CustomerService
- RegionService
- ShippingService
- PaymentService

## Development

```bash
# Install dependencies
bun install

# Start development mode
bun run dev

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
