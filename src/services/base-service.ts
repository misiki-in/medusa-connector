export const PUBLIC_MEDUSA_API_PREFIX = "/medusa"

/**
 * BaseService provides core HTTP functionality for all service classes
 * in the Medusa API client.
 *
 * This service helps with:
 * - Performing standardized HTTP requests (GET, POST, PUT, PATCH, DELETE)
 * - Handling response parsing and type conversion
 * - Providing a configurable fetch implementation
 */
export class BaseService {
  private static PUBLIC_MEDUSA_PUBLISHABLE_API_KEY: string
  private _fetch: typeof fetch

  /**
   * Creates a new BaseService instance
   *
   * @param {typeof fetch} [fetchFn] - Optional custom fetch implementation
   */
  constructor(fetchFn?: typeof fetch) {
    // Use provided fetch or global fetch as fallback
    this._fetch = fetchFn || fetch
  }

  static setMedusaPublisableKey(key: string) {
    this.PUBLIC_MEDUSA_PUBLISHABLE_API_KEY = key
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
      return await this._fetch(PUBLIC_MEDUSA_API_PREFIX + url, data)
    } catch (e: any) {
      if (navigator.onLine) {
        throw { message: 'Please check your internet connection and try again' }
      }
      throw { message: 'Unable to reach the server. Please try again in a moment' }
    }
  }

  private async handleError(response: Response) {
    if (!response.headers.get("Content-Type")?.startsWith("application/json"))
      throw new Error(`HTTP error ${response.status}: ${response.statusText}`)

    const data = await response.json()
    throw { message: 'Something went wrong. Please try again', ...data }
  }

  async callFetch<T>(url: string, body: any) {
    const response = await this.safeFetch(url, {
      ...body,
      headers: {
        ...body.headers,
        'x-publishable-api-key': BaseService.PUBLIC_MEDUSA_PUBLISHABLE_API_KEY
      }
    })

    if (!response.ok) {
      await this.handleError(response)
    }

    return (await response.json()) as T
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

