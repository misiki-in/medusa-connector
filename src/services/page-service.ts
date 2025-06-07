import { PAGE_SIZE, pageData } from '../config'
import { BaseService } from './base-service'

/**
 * PageService provides functionality for working with specific resources
 * in the Litekart API.
 *
 * This service helps with:
 * - Main functionality point 1
 * - Main functionality point 2
 * - Main functionality point 3
 */
export class PageService extends BaseService {
  private static instance: PageService

  /**
   * Get the singleton instance
   */
  /**
 * Get the singleton instance
 * 
 * @returns {PageService} The singleton instance of PageService
 */
  static getInstance(): PageService {
    if (!PageService.instance) {
      PageService.instance = new PageService()
    }
    return PageService.instance
  }
  /**
 * Fetches Page from the API
 * 
 * @param {Object} options - The request options
 * @param {number} [options.page=1] - The page number for pagination
 * @param {string} [options.q=''] - Search query string
 * @param {string} [options.sort='-createdAt'] - Sort order
 * @returns {Promise<any>} The requested data
 * @api {get} /api/page Get page
 * 
 * @example
 * // Example usage
 * const result = await pageService.list({ page: 1 });
 */
  async list({ page = 1, search = '', sort = '-createdAt' }) {
    return {
      data: Object.values(pageData),
      count: Object.keys(pageData).length,
      page: 1,
      pageSize: PAGE_SIZE
    }
  }

  /**
 * Fetches Page from the API
 * 
 * @param {Object} options - The request options
 * @param {number} [options.page=1] - The page number for pagination
 * @param {string} [options.q=''] - Search query string
 * @param {string} [options.sort='-createdAt'] - Sort order
 * @returns {Promise<any>} The requested data
 * @api {get} /api/page Get page
 * 
 * @example
 * // Example usage
 * const result = await pageService.listLatestPages({ page: 1 });
 */

  async listLatestPages({}) {
    return {
      data: Object.values(pageData),
      count: Object.keys(pageData).length,
      page: 1,
      pageSize: PAGE_SIZE
    }
  }

  /**
 * Fetches a single Page by ID
 * 
 * @param {string} id - The ID of the page to fetch
 * @returns {Promise<any>} The requested page
 * @api {get} /api/page/:id Get page by ID
 * 
 * @example
 * // Example usage
 * const page = await pageService.getOne('123');
 */

  async getOne(id: string) {
    if (id in pageData)
      return JSON.parse(pageData[id])
    throw 'Page id not found'
  }
}

// Use singleton instance
export const pageService = PageService.getInstance()

