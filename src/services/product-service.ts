import { AxiosError } from 'axios'
import type { PaginatedResponse, Product } from '../types'
import { PaginatedMedusaResponse } from '../types/api-response'
import { ApiService } from './api-service'

type ProductResponse = PaginatedMedusaResponse<{
  product: Product
}>

type ProductListResponse = PaginatedMedusaResponse<{
  products: Product[];
}>;

export class ProductService {
	/**
	 * List featured products
	 * @param page - Page number (default: 1)
	 * @returns Paginated response of featured products
	 */
	static async listFeaturedProducts({ page = 1 } = {}) {
		const search = ''
		return this.list({ page, search })
	}

	/**
	 * List trending products
	 * @param page - Page number (default: 1)
	 * @param search - Additional search term (default: '')
	 * @returns Paginated response of trending products
	 */
	static async listTrendingProducts({ page = 1, search = '' } = {}) {
		const q = ''
		return this.list({ page, search: `${q} ${search}` })
	}

	/**
	 * List related products by category
	 * @param page - Page number (default: 1)
	 * @param categoryId - Category ID to filter by (default: '')
	 * @returns Paginated response of related products
	 */
	static async listRelatedProducts({ page = 1, categoryId = '' } = {}) {
		return this.list({ page, categories: categoryId })
	}

	/**
	 * List all products with optional filters
	 * @param page - Page number (default: 1)
	 * @param search - Search query (default: '')
	 * @param categories - Category ID filter (default: '')
	 * @returns Paginated response of products
	 */
	static async list({ page = 1, search = '', categories = '' } = {}) {
		const params = {
			offset: ((page - 1) * 50).toString(),
			limit: '50',
			q: search,
			category_id: categories
		}

		try {
			const resData = await ApiService.get<ProductListResponse>(
        `/store/products`,
        { params }
      );

			console.log('Raw API Response for list:', resData, 'Params:', params)

			const { products = [], count = 0, offset = 0, limit = 50 } = resData

			if (!Array.isArray(products)) {
				throw new Error('Invalid products data in API response: products is not an array')
			}

			// Log and validate raw image URLs
			products.forEach((product) => {
				const rawThumbnail = product.thumbnail || (product.images && product.images[0]?.url) || ''
				const rawImages = product.images ? product.images.map((img) => img.url) : []
				console.log('Validated Raw Thumbnail:', rawThumbnail, 'Raw Images:', rawImages)
			})
			const data = products.map((product: any) => {
				const rawThumbnail = product.thumbnail || (product.images && product.images[0]?.url) || ''
				const rawImages = product.images ? product.images.map((img: any) => img.url) : []

				// Validate raw URLs
				if (!rawThumbnail && !rawImages.length) {
					console.warn('No valid image URLs found for product:', product.id)
				}

				return {
					id: product.id,
					title: product.title,
					thumbnail: rawThumbnail,
					rawThumbnail, // Exact raw URL for fallback
					price: (product.variants && product.variants[0]?.prices && product.variants[0].prices[0]?.amount / 100) || 0,
					slug: product.handle,
					description: product.description,
					images: rawImages,
					rawImages, // Exact raw URLs for fallback
					variants: product.variants || [],
					options: product.options || []
				}
			})

			return {
				products,
				count,
				offset,
				limit,
				data
			}
		} catch (error) {
			const data = [
				{
					id: 'error-placeholder',
					title: 'Error Product',
					thumbnail: 'https://via.placeholder.com/200',
					rawThumbnail: 'https://via.placeholder.com/200',
					price: 0,
					handle: 'error',
					description: 'Failed to load product data',
					images: ['https://via.placeholder.com/200'],
					rawImages: ['https://via.placeholder.com/200'],
					variants: [],
					options: []
				}
			]

      const axiosError = error as AxiosError
			console.error(
        "Error fetching products:",
        axiosError?.response?.data || axiosError?.message,
        "Request Config:",
        axiosError?.config
      );
			// Return default data with placeholder URLs on error
			return {
				products: [],
				count: 0,
				offset: 0,
				limit: 50,
				data
			}
		}
	}

	/**
	 * Get a single product by handle
	 * @param handle - Product handle (slug)
	 * @returns Product details
	 */
	static async getOne(handle: string) {
		try {
			const resData = await ApiService.get<ProductResponse>(`/store/products/${handle}`)

			console.log('Raw API Response for getOne:', resData, 'Handle:', handle)

			const product = resData.product
			if (!product) throw new Error('Product not found with handle: ' + handle)

			// Log and validate raw image URLs
			const rawThumbnail = product.thumbnail || (product.images && product.images[0]?.url) || ''
			const rawImages = product.images ? product.images.map((img) => img.url) : []
			console.log('Validated Raw Thumbnail:', rawThumbnail, 'Raw Images:', rawImages)

			return {
        id: product.id,
        title: product.title,
        thumbnail: rawThumbnail,
        rawThumbnail, // Exact raw URL for fallback
        images: rawImages?.join(",") || "",
        rawImages, // Exact raw URLs for fallback
        price:
          (product.variants &&
            product.variants[0]?.calculated_price?.original_price &&
            product.variants[0].calculated_price?.calculated_amount / 100) ||
          0,
        handle: product.handle,
        description: product.description,
        variants: product.variants || [],
        options: product.options || [],
      };
		} catch (error) {
      const axiosError = error as AxiosError
			console.error(
        "Error fetching product:",
        axiosError?.response?.data || axiosError?.message,
        "Request Config:",
        axiosError?.config
      );
			// Return default data with placeholder URL on error
			return {
				id: 'error-placeholder',
				title: 'Error Product',
				thumbnail: 'https://via.placeholder.com/200',
				rawThumbnail: 'https://via.placeholder.com/200',
				images: ['https://via.placeholder.com/200'],
				rawImages: ['https://via.placeholder.com/200'],
				price: 0,
				handle: 'error',
				description: 'Failed to load product data',
				variants: [],
				options: []
			}
		}
	}

	/**
	 * Add a review for a product
	 * @param productId - ID of the product
	 * @param variantId - ID of the variant
	 * @param review - Review text
	 * @param rating - Rating value
	 * @param uploadedImages - Array of image URLs
	 * @returns Response from the API
   * @todo: Verify with medusa docs
	 */
	static async addReview({
		productId,
		variantId,
		review,
		rating,
		uploadedImages
	}: {
		productId: string
		variantId: string
		review: string
		rating: number
		uploadedImages: string[]
	}) {
		try {
      //@todo: after verifying with medusa docs, implement proper types for the response
			const response: any = await ApiService.post(`/store/products/${productId}/ratings-and-reviews`, {
				variant_id: variantId,
				review,
				rating,
				uploaded_images: uploadedImages
			})
			console.log('addReview response:', response?.data, 'Request URL:', response?.config?.url)
			return response?.data
		} catch (error) {
      const axiosError = error as AxiosError
			console.error(
        "Error adding review:",
        axiosError?.response?.data || axiosError?.message,
        "Request Config:",
        axiosError?.config
      );
			throw error
		}
	}

	/**
	 * Fetch reels (assuming a custom endpoint)
	 * @returns Response from the API
	 */
	static async fetchReels() {
		try {
			const resData = await ApiService.get(`/store/reels`)
			console.log('fetchReels response:', resData)
			return resData
		} catch (error) {
      const axiosError = error as AxiosError
			console.error(
        "Error fetching reels:",
        axiosError?.response?.data || axiosError?.message,
        "Request Config:",
        axiosError?.config
      );
			throw new Error('Failed to fetch reels')
		}
	}
}
