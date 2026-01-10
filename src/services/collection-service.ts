import type { Collection, PaginatedResponse } from '../types'
import { BaseService } from './base-service'

type ShopifyTagResponse = {
  id: number
  handle: string
  name: string
  product_count: number
}

type TagListResponse = {
  tags: ShopifyTagResponse[]
}

export function transformShopifyTag(tag: ShopifyTagResponse): Collection {
  return {
    id: tag.id.toString(),
    slug: tag.handle,
    name: tag.name,
    description: '',
    image: null,
    status: 'active',
    createdAt: '',
    updatedAt: '',
    productsCount: tag.product_count,
  }
}

export class CollectionService extends BaseService {
  private static instance: CollectionService

  static getInstance(): CollectionService {
    if (!CollectionService.instance) {
      CollectionService.instance = new CollectionService()
    }
    return CollectionService.instance
  }

  /**
   * List all collections (tags)
   */
  async list({ page = 1, perPage = PAGE_SIZE } = {}): Promise<PaginatedResponse<Collection>> {
    const searchParams = new URLSearchParams()
    searchParams.set('limit', String(perPage))

    try {
      const res = await this.get<TagListResponse>('/products/tags.json?' + searchParams.toString())

      return {
        page,
        pageSize: perPage,
        count: res.tags?.length || 0,
        noOfPage: 1,
        data: res.tags?.map(transformShopifyTag) || []
      }
    } catch (error: any) {
      console.error("Error fetching collections:", error)
      return {
        page,
        pageSize: perPage,
        count: 0,
        noOfPage: 1,
        data: []
      }
    }
  }

  /**
   * Get a single collection by ID
   */
  async get(id: string) {
    try {
      // Shopify doesn't have a single tag endpoint, filter from list
      const tags = await this.list()
      const tag = tags.data.find(t => t.id === id)
      if (tag) return tag
      throw new Error('Tag not found')
    } catch (error: any) {
      console.error("Error fetching collection:", error)
      throw error
    }
  }

  /**
   * Get products by collection (tag)
   */
  async getProducts(id: string, { page = 1, perPage = PAGE_SIZE } = {}) {
    const searchParams = new URLSearchParams()
    searchParams.set('limit', String(perPage))
    searchParams.set('page', String(Math.max(1, page - 1)))
    searchParams.set('tag', id)

    try {
      const res = await this.get<any>('/products.json?' + searchParams.toString())
      const { productService } = await import('./product-service')
      const { transformShopifyProduct } = await import('./product-service')

      return {
        data: res.products?.map(transformShopifyProduct) || [],
        total: res.products?.length || 0,
        page,
        pageSize: perPage
      }
    } catch (error: any) {
      console.error("Error fetching collection products:", error)
      return { data: [], total: 0, page, pageSize: perPage }
    }
  }
}

export const collectionService = CollectionService.getInstance()
