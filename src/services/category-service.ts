import type { Category, PaginatedResponse } from '../types'
import { BaseService } from './base-service'

type ShopifyCollect = {
  id: number
  collection_id: number
  product_id: number
  position: number
  sort_value: string
  created_at: string
  updated_at: string
}

type ShopifyCollectionResponse = {
  id: number
  handle: string
  title: string
  description: string
  description_html: string
  updated_at: string
  image: {
    id: number
    src: string
    alt: string
  } | null
  products_count: number
  sort_order: string
  template_suffix: string
  published_at: string
}

type ShopifyCustomCollectionResponse = ShopifyCollectionResponse & {
  body_html: string
  image: {
    id: number
    src: string
    alt: string
  } | null
}

type CollectionListResponse = {
  collections: ShopifyCollectionResponse[]
}

export interface CategoryExtended extends Category {
  children: CategoryExtended[]
  parent: CategoryExtended | null
}

export function transformShopifyCollection(cat: ShopifyCollectionResponse): CategoryExtended {
  return {
    id: cat.id.toString(),
    slug: cat.handle,
    name: cat.title,
    parentCategoryId: '',
    createdAt: cat.updated_at,
    description: cat.description || cat.description_html || '',
    children: [],
    parent: null,
    thumbnail: cat.image?.src || null,
    link: '/collections/' + cat.handle,
    isActive: true,
    count: cat.products_count || 0,
  }
}

export class CategoryService extends BaseService {
  private static instance: CategoryService

  static getInstance(): CategoryService {
    if (!CategoryService.instance) {
      CategoryService.instance = new CategoryService()
    }
    return CategoryService.instance
  }

  /**
   * Fetch collections for footer
   */
  async fetchFooterCategories({
    page = 1,
    perPage = 20
  }: {
    page?: number
    perPage?: number
  } = {}) {
    const searchParams = new URLSearchParams()
    searchParams.set('limit', String(perPage))

    const res = await this.get<CollectionListResponse>('/collections.json?' + searchParams.toString())
    
    return {
      page,
      data: res.collections?.map(transformShopifyCollection) || []
    }
  }

  /**
   * Fetch featured collections
   */
  async fetchFeaturedCollections({ limit = 100 }: { limit?: number } = {}) {
    const searchParams = new URLSearchParams()
    searchParams.set('limit', String(limit))

    const res = await this.get<CollectionListResponse>('/collections.json?' + searchParams.toString())
    
    console.log("Featured collections", res)
    return {
      data: res.collections?.map(transformShopifyCollection) || []
    }
  }

  /**
   * Fetch a single collection by ID
   */
  async fetchCategory(id: string) {
    const cat = await this.get<ShopifyCollectionResponse>('/collections/' + id + '.json')
    return transformShopifyCollection(cat)
  }

  /**
   * Fetch all collections
   */
  async fetchAllCategories({ limit = 100 }: { limit?: number } = {}) {
    const searchParams = new URLSearchParams()
    searchParams.set('limit', String(limit))

    const res = await this.get<CollectionListResponse>('/collections.json?' + searchParams.toString())
    
    return {
      data: res.collections?.map(transformShopifyCollection) || []
    }
  }

  /**
   * Fetch all products of a collection
   */
  async fetchAllProductsOfCategory(id: string, { page = 1, perPage = PAGE_SIZE } = {}) {
    const searchParams = new URLSearchParams()
    searchParams.set('limit', String(Math.min(perPage, 250)))

    const res = await this.get<any>('/collections/' + id + '/products.json?' + searchParams.toString())
    
    // Import dynamically to avoid circular dependency
    const { productService } = await import('./product-service')
    const { transformShopifyProduct } = await import('./product-service')
    
    return {
      data: res.products?.map(transformShopifyProduct) || [],
      total: res.products?.length || 0,
      page,
      pageSize: perPage
    }
  }

  /**
   * Get megamenu (hierarchical collections)
   * Note: Shopify collections are flat, no parent-child hierarchy by default
   */
  async getMegamenu() {
    const searchParams = new URLSearchParams()
    searchParams.set('limit', '100')

    const res = await this.get<CollectionListResponse>('/collections.json?' + searchParams.toString())
    
    const collections = res.collections?.map(transformShopifyCollection) || []
    
    // All collections are root level in Shopify
    return collections
  }
}

export const categoryService = CategoryService.getInstance()
