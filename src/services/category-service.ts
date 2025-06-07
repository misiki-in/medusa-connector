import { REGION_ID } from '../config'
import type { Category, PaginatedResponse } from '../types'
import { BaseService } from './base-service'
import { transformProduct } from './product-service'

interface CategoryResponse {
  product_categories: any,
}

export function transformCategory(cat: any): Category {
  return {
    id: cat?.id,
    slug: cat?.handle,
    name: cat?.name,
    parentCategoryId: cat?.parent_category_id,
    createdAt: cat?.created_at,
    description: cat?.description,
    children: cat?.category_children || null,
    parent: cat?.parent_category || null,
    thumbnail: cat?.metadata?.thumbnail || null,
    link: cat?.metadata?.link || null,
    isActive: true,
  }
}

export class CategoryService extends BaseService {
  private static instance:CategoryService 

  static getInstance(): CategoryService {
    if (!CategoryService.instance) {
      CategoryService.instance = new CategoryService()
    }
    return CategoryService.instance
  }

	// For storefront (public access)
	async fetchFooterCategories({
		page = 1,
		q = '',
		sort = '-created_at',
		limit = 20
	}: {
		page?: number
		q?: string
		sort?: string
		limit?: number
	}) {
		const offset = (page - 1) * limit
		const res = await this.get<CategoryResponse>(`/store/product-categories?limit=${limit}&offset=${offset}&q=${q}&order=${sort}`)
    return {
      page,
      data: res.product_categories?.map(transformCategory)
    }
	}

	// For storefront (public access)
	async fetchFeaturedCategories({ limit = 100 }: { limit?: number }) {
		const res = await this.get<CategoryResponse>(`/store/product-categories?limit=${limit}`)
    console.log("Featured categories", res)
    return {
      data: res.product_categories?.map(transformCategory)
    }
	}

	// For storefront (public access)
	async fetchCategory(id: string) {
		const res = await this.get<{ product_category: any }>(`/store/product-categories/${id}`)
    return transformCategory(res?.product_category)
	}

	// For storefront (public access)
	async fetchAllCategories({ limit = 100 }: { limit?: number }) {
		const res = await this.get<CategoryResponse>(`/store/product-categories?limit=${limit}`)
    return {
      data: res.product_categories?.map(transformCategory)
    }
	}

	// For storefront (public access)
	async fetchAllProductsOfCategory(id: string) {
    const searchParams = new URLSearchParams()
    searchParams.set('category_id', id)
    searchParams.set('fields', '+variants.calculated_price')
    searchParams.set('region_id', REGION_ID)

		const res = await this.get<{ products: any }>(`/store/products?` + searchParams.toString())
    return {
      data: res.products?.map(transformProduct)
    }
	}

	// For storefront (public access)
	async getMegamenu() {
		const res = await this.get<CategoryResponse>('/store/product-categories?parent_category_id=null&include_descendants_tree=true')
    return res.product_categories?.map(transformCategory)
	}
}

export const categoryService = CategoryService.getInstance()
