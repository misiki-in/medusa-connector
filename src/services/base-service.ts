export const PUBLIC_SHOPIFY_API_PREFIX = "/admin/api/2024-10"

export let SHOPIFY_STORE_DOMAIN: string

export let SHOPIFY_ACCESS_TOKEN: string

/**
 * BaseService provides core HTTP functionality for all service classes
 * in the Shopify Admin API client.
 *
 * This service helps with:
 * - Performing standardized HTTP requests (GET, POST, PUT, PATCH, DELETE)
 * - Handling response parsing and type conversion
 * - Providing a configurable fetch implementation
 * - Authenticating with Shopify Admin API using Access Token
 */
export class BaseService {
  private _fetch: typeof fetch

  /**
   * Creates a new BaseService instance
   *
   * @param {typeof fetch} [fetchFn] - Optional custom fetch implementation
   */
  constructor(fetchFn?: typeof fetch) {
    // Use provided fetch or global fetch as fallback
    this._fetch = fetchFn || (typeof fetch !== 'undefined' ? fetch : () => Promise.reject(new Error('fetch not available')))
  }

  static setShopifyCredentials(storeDomain: string, accessToken: string) {
    SHOPIFY_STORE_DOMAIN = storeDomain
    SHOPIFY_ACCESS_TOKEN = accessToken
  }

  static getCredentials() {
    if (!SHOPIFY_STORE_DOMAIN || !SHOPIFY_ACCESS_TOKEN) {
      throw new Error("Shopify credentials not set. Call BaseService.setShopifyCredentials() first")
    }
    return { storeDomain: SHOPIFY_STORE_DOMAIN, accessToken: SHOPIFY_ACCESS_TOKEN }
  }

  /**
   * Set the fetch instance to be used by this service
   *
   * @param {typeof fetch} fetchFn - The fetch implementation to use
   * @returns {BaseService} The service instance for chaining
   */
  setFetch(fetchFn: typeof fetch) {
    this._fetch = fetchFn
    return this
  }

  /**
   * Get the current fetch instance
   *
   * @returns {typeof fetch} The current fetch implementation
   */
  getFetch(): typeof fetch {
    return this._fetch
  }

  private async safeFetch(url: string, data?: any) {
    try {
      const response = await this._fetch(`https://${SHOPIFY_STORE_DOMAIN}${PUBLIC_SHOPIFY_API_PREFIX}${url}`, data)
      return response
    } catch (e: any) {
      throw new Error(`Network error: ${e.message || 'Unable to reach the server. Please try again in a moment'}`)
    }
  }

  private async handleError(response: Response) {
    if (!response.headers.get("Content-Type")?.startsWith("application/json")) {
      throw new Error(`HTTP error ${response.status}: ${response.statusText}`)
    }

    try {
      const data = await response.json()
      throw new Error(data.errors || `HTTP error ${response.status}: ${response.statusText}`)
    } catch {
      throw new Error(`HTTP error ${response.status}: ${response.statusText}`)
    }
  }

  async callFetch<T>(url: string, body: any): Promise<T> {
    const { storeDomain, accessToken } = BaseService.getCredentials()
    
    const response = await this.safeFetch(url, {
      ...body,
      headers: {
        ...body.headers,
        'X-Shopify-Access-Token': accessToken,
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      await this.handleError(response)
    }

    // Handle empty responses
    const text = await response.text()
    return text ? JSON.parse(text) as T : {} as T
  }
  /**
   * Perform a GET request
   *
   * @param {string} url - The URL to request
   * @returns {Promise<T>} Promise resolving to the response data
   * @template T - The expected response data type
   * @throws {Error} Throws an error if the request fails
   */
  async get<T>(url: string): Promise<T> {
    return this.callFetch<T>(url, {
      method: "GET"
    })
  }

  /**
   * Perform a POST request
   *
   * @param {string} url - The URL to request
   * @param {any} data - The data to send in the request body
   * @returns {Promise<T>} Promise resolving to the response data
   * @template T - The expected response data type
   * @throws {Error} Throws an error if the request fails
   */
  async post<T>(url: string, data: any): Promise<T> {
    return this.callFetch<T>(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
  }

  /**
   * Perform a PUT request
   *
   * @param {string} url - The URL to request
   * @param {any} data - The data to send in the request body
   * @returns {Promise<T>} Promise resolving to the response data
   * @template T - The expected response data type
   * @throws {Error} Throws an error if the request fails
   */
  async put<T>(url: string, data: any): Promise<T> {
    return this.callFetch<T>(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
  }

  /**
   * Perform a PATCH request
   *
   * @param {string} url - The URL to request
   * @param {any} data - The data to send in the request body
   * @returns {Promise<T>} Promise resolving to the response data
   * @template T - The expected response data type
   * @throws {Error} Throws an error if the request fails
   */
  async patch<T>(url: string, data: any): Promise<T> {
    return this.callFetch<T>(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
  }

  /**
   * Perform a DELETE request
   *
   * @param {string} url - The URL to request
   * @returns {Promise<T>} Promise resolving to the response data or status
   * @template T - The expected response data type
   * @throws {Error} Throws an error if the request fails
   */
  async delete<T>(url: string): Promise<T> {
    return this.callFetch<T>(url, {
      method: 'DELETE',
    })
    /*  
        if (!response.ok && response.status !== 204) {
          await this.handleError(response)
        }
    
        if (response.status === 204) return response as T
        return (await response.json()) as T
      */
  }
}

