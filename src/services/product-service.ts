import { PAGE_SIZE } from '../config'
import { ProductStatus, Variant, type Product } from '../types'
import { BaseService } from './base-service'

type ShopifyProductResponse = {
  id: number
  title: string
  body_html: string
  vendor: string
  product_type: string
  created_at: string
  updated_at: string
  published_at: string
  template_suffix: string
  status: string
  tags: string
  handle: string
  options: Array<{
    id: number
    product_id: number
    name: string
    position: number
    values: string[]
  }>
  variants: Array<{
    id: number
    product_id: number
    title: string
    price: string
    sku: string
    position: number
    inventory_policy: string
    compare_at_price: string
    inventory_management: string
    option1: string
    option2: string
    option3: string
    created_at: string
    updated_at: string
    taxable: boolean
    barcode: string
    grams: number
    weight: number
    weight_unit: string
    inventory_item_id: number
    inventory_quantity: number
    requires_shipping: boolean
  }>
  images: Array<{
    id: number
    product_id: number
    position: number
    src: string
    width: number
    height: number
    alt: string
  }>
  image?: {
    id: number
    product_id: number
    position: number
    src: string
    width: number
    height: number
    alt: string
  }
}

type ProductListResponse = {
  products: ShopifyProductResponse[]
}

export function transformShopifyProduct(product: ShopifyProductResponse): Product {
  const rawThumbnail = product.image?.src || ''
  const rawImages = product.images ? product.images.map((img) => img.src) : []

  return {
    id: product.id.toString(),
    status: product.status === 'active' ? ProductStatus.PUBLISHED : ProductStatus.DRAFT,
    active: product.status === 'active',
    allowBackorder: false,
    price: parseFloat(product.variants?.[0]?.price || '0'),
    mrp: parseFloat(product.variants?.[0]?.compare_at_price || '0'),
    title: product.title,
    thumbnail: rawThumbnail,
    slug: product.handle,
    handle: product.handle,
    description: product.body_html,
    images: rawImages.join(','),
    variants: product.variants?.map((variant): Variant => {
      const variantImage = product.images.find(img => img.id === variant.id)
      return {
        id: variant.id.toString(),
        productId: product.id.toString(),
        title: variant.title,
        sku: variant.sku,
        price: parseFloat(variant.price || '0'),
        mrp: parseFloat(variant.compare_at_price || '0'),
        stock_quantity: variant.inventory_quantity || 0,
        stock_status: variant.inventory_policy === 'deny' && variant.inventory_quantity <= 0 ? 'outofstock' : 'instock',
        options: [
          variant.option1 ? { id: '1', optionId: '1', value: variant.option1, variantId: variant.id.toString() } : null,
          variant.option2 ? { id: '2', optionId: '2', value: variant.option2, variantId: variant.id.toString() } : null,
          variant.option3 ? { id: '3', optionId: '3', value: variant.option3, variantId: variant.id.toString() } : null
        ].filter(Boolean) as any
      }
    }) || [],
    options: product.options?.map((opt) => ({
      id: opt.id?.toString() || '0',
      productId: product.id.toString(),
      name: opt.name,
      values: opt.values,
      position: opt.position,
      visible: true,
      variation: true,
    })) || [],
    attributes: [],
    tags: product.tags ? product.tags.split(',').map((t) => t.trim()) : [],
    categories: [],
    rating: 0,
    reviewCount: 0,
    totalSold: 0,
  }
}

export class ProductService extends BaseService {
  private static instance: ProductService

  static getInstance(): ProductService {
    if (!ProductService.instance) {
      ProductService.instance = new ProductService()
    }
    return ProductService.instance
  }

  /**
   * List featured products
   * Note: Shopify doesn't have a direct "featured" flag, filter by product type or tag
   * @param page - Page number (default: 1)
   * @param perPage - Items per page (default: PAGE_SIZE)
   * @returns Paginated response of products
   */
  async listFeaturedProducts({ page = 1, perPage = PAGE_SIZE } = {}) {
    return this.list({ page, perPage, tag: 'featured' })
  }

  /**
   * List trending products (by total sales)
   * Note: This requires additional processing or using Shopify's analytics API
   * @param page - Page number (default: 1)
   * @param search - Additional search term (default: '')
   * @returns Paginated response of products
   */
  async listTrendingProducts({ page = 1, search = '', perPage = PAGE_SIZE } = {}) {
    return this.list({ page, perPage, search })
  }

  /**
   * List related products by collection
   * @param page - Page number (default: 1)
   * @param collectionId - Collection ID to filter by (default: '')
   * @returns Paginated response of related products
   */
  async listRelatedProducts({ page = 1, collectionId = '', perPage = PAGE_SIZE } = {}) {
    return this.list({ page, perPage })
  }

  /**
   * List all products with optional filters
   * @param page - Page number (default: 1)
   * @param perPage - Items per page (default: PAGE_SIZE)
   * @param search - Search query (default: '')
   * @param category - Category/collection filter (default: '')
   * @param featured - Filter by featured tag (default: false)
   * @param tag - Filter by tag (default: '')
   * @param vendor - Filter by vendor (default: '')
   * @param status - Filter by status (default: '')
   * @returns Paginated response of products
   */
  async list({
    page = 1,
    perPage = PAGE_SIZE,
    search = '',
    category = '',
    featured = false,
    tag = '',
    vendor = '',
    status = ''
  } = {}) {
    const searchParams = new URLSearchParams()
    searchParams.set('limit', String(Math.min(perPage, 250))) // Shopify max limit is 250
    
    if (search) searchParams.set('title', `*${search}*`) // Shopify fuzzy search
    if (category) searchParams.set('collection_id', category)
    if (featured) searchParams.set('tag', 'featured')
    if (tag) searchParams.set('tag', tag)
    if (vendor) searchParams.set('vendor', vendor)
    if (status) searchParams.set('status', status)

    try {
      const resData = await this.get<ProductListResponse>('/products.json?' + searchParams.toString())

      console.log('Shopify API Response for list:', resData, 'Params:', searchParams)

      const products = resData?.products || []
      const total = products.length
      const totalPages = Math.ceil(total / perPage)

      if (!Array.isArray(products)) {
        throw new Error('Invalid products data in API response: products is not an array')
      }

      const data = products.map(transformShopifyProduct)

      return {
        products,
        count: total,
        page,
        pageSize: perPage,
        noOfPage: totalPages,
        data
      }
    } catch (error: any) {
      const data = [
        {
          id: 'error-placeholder',
          title: 'Error Product',
          thumbnail: 'https://via.placeholder.com/200',
          price: 0,
          mrp: 0,
          slug: 'error',
          description: 'Failed to load product data',
          images: ['https://via.placeholder.com/200'],
          variants: [],
          options: []
        }
      ]

      const axiosError = error
      console.error(
        "Error fetching products:",
        axiosError?.response?.data || axiosError?.message,
        "Request Config:",
        axiosError?.config
      );
      
      return {
        products: [],
        count: 0,
        page,
        pageSize: perPage,
        noOfPage: 1,
        data
      }
    }
  }

  /**
   * Get a single product by handle
   * @param handle - Product handle (slug)
   * @returns Product details
   */
  async getOne(handle: string) {
    try {
      const product = await this.get<ShopifyProductResponse>('/products.json?handle=' + handle)

      console.log('Shopify API Response for getOne:', product, 'Handle:', handle)

      const products = product?.products || []
      const foundProduct = products[0] || (product.id ? product : null)
      
      if (!foundProduct) {
        throw new Error('Product not found')
      }

      return transformShopifyProduct(foundProduct)
    } catch (error: any) {
      const axiosError = error
      console.error(
        "Error fetching product:",
        axiosError?.response?.data || axiosError?.message,
        "Request Config:",
        axiosError?.config
      );
      
      return {
        id: 'error-placeholder',
        title: 'Error Product',
        thumbnail: 'https://via.placeholder.com/200',
        images: ['https://via.placeholder.com/200'],
        price: 0,
        mrp: 0,
        slug: 'error',
        description: 'Failed to load product data',
        variants: [],
        options: []
      }
    }
  }

  /**
   * Get a product by ID
   * @param id - Product ID
   * @returns Product details
   */
  async getById(id: number) {
    try {
      const product = await this.get<ShopifyProductResponse>('/products/' + id + '.json')
      return transformShopifyProduct(product)
    } catch (error: any) {
      console.error("Error fetching product by ID:", error)
      return null
    }
  }

  /**
   * Add a review for a product
   * Note: Shopify doesn't have built-in reviews, this requires a review app
   * @param productId - ID of the product
   * @param review - Review text
   * @param rating - Rating value (1-5)
   * @returns Response from the API
   */
  async addReview({
    productId,
    review,
    rating
  }: {
    productId: string
    review: string
    rating: number
  }) {
    try {
      // This requires a Shopify review app integration
      throw new Error("Shopify doesn't have built-in reviews. Use a review app integration.")
    } catch (error: any) {
      console.error("Error adding review:", error)
      throw error
    }
  }

  /**
   * Get product reviews
   * @param productId - ID of the product
   * @returns Array of reviews
   */
  async getReviews(productId: string) {
    try {
      // This requires a Shopify review app integration
      return []
    } catch (error: any) {
      console.error("Error fetching reviews:", error)
      return []
    }
  }
}

export const productService = ProductService.getInstance()
