import type { User } from '../types'
import { BaseService } from './base-service'

type ShopifyCustomerResponse = {
  id: number
  created_at: string
  updated_at: string
  email: string
  first_name: string
  last_name: string
  orders_count: number
  state: string
  total_spent: string
  verified_email: boolean
  accepts_marketing: boolean
  tags: string
  default_address?: {
    id: number
    first_name: string
    last_name: string
    company: string
    address1: string
    address2: string
    city: string
    province: string
    country: string
    zip: string
    phone: string
  }
  addresses: Array<{
    id: number
    first_name: string
    last_name: string
    company: string
    address1: string
    address2: string
    city: string
    province: string
    country: string
    zip: string
    phone: string
  }>
}

function transformShopifyCustomer(customer: ShopifyCustomerResponse): User {
  return {
    id: customer.id.toString(),
    email: customer.email,
    firstName: customer.first_name || '',
    lastName: customer.last_name || '',
    phone: customer.default_address?.phone || '',
    avatar: '',
    role: 'customer',
    isApproved: customer.verified_email,
    isDeleted: false,
    isEmailVerified: customer.verified_email,
    isPhoneVerified: false,
    otpAttempt: 0,
    signInCount: 0,
    createdAt: customer.created_at,
    updatedAt: customer.updated_at
  }
}

export class AuthService extends BaseService {
  private static instance: AuthService
  private currentUser: User | null = null

  static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService()
    }
    return AuthService.instance
  }

  /**
   * Get current user (requires authentication with customer access token)
   * Note: Shopify uses different endpoints for storefront vs admin API
   */
  async getMe() {
    try {
      // This would need a customer ID parameter or use a different approach
      // For now, returning a placeholder implementation
      throw new Error("getMe requires customer ID parameter")
    } catch (error: any) {
      console.error("Error getting current user:", error)
      throw error
    }
  }

  /**
   * Login with email and password
   * Note: Shopify Admin API doesn't have a direct login endpoint
   * Use storefront API for customer authentication or manage tokens externally
   */
  async login({ email, password }: { email: string; password: string }) {
    try {
      // Shopify Admin API doesn't support password-based login
      // For customer authentication, use Storefront API or implement custom solution
      throw new Error("Shopify Admin API doesn't support password-based login. Use Storefront API for customer authentication.")
    } catch (error: any) {
      console.error("Error logging in:", error)
      throw error
    }
  }

  /**
   * Register a new customer
   */
  async signup({
    email,
    password,
    firstName,
    lastName
  }: {
    email: string
    password: string
    firstName: string
    lastName: string
  }) {
    try {
      const response = await this.post<ShopifyCustomerResponse>('/customers.json', {
        customer: {
          email,
          password,
          first_name: firstName,
          last_name: lastName,
          verified_email: true,
          accepts_marketing: false
        }
      })
      return transformShopifyCustomer(response)
    } catch (error: any) {
      console.error("Error signing up:", error)
      throw error
    }
  }

  /**
   * Update customer profile
   */
  async updateProfile({
    id,
    firstName,
    lastName,
    email,
    phone,
    avatar
  }: {
    id: string
    firstName: string
    lastName: string
    email: string
    phone?: string
    avatar?: string
  }) {
    try {
      const response = await this.put<ShopifyCustomerResponse>('/customers/' + id + '.json', {
        customer: {
          id: parseInt(id),
          first_name: firstName,
          last_name: lastName,
          email,
          phone
        }
      })
      return transformShopifyCustomer(response)
    } catch (error: any) {
      console.error("Error updating profile:", error)
      throw error
    }
  }

  /**
   * Update billing address
   */
   async updateBillingAddress(id: string, billing: any) {
    try {
      // For creating new address, use POST to /customers/{id}/addresses.json
      // For updating existing address, use PUT to /customers/{id}/addresses/{address_id}.json
      const response = await this.post<any>('/customers/' + id + '/addresses.json', {
        address: billing
      })
      return transformShopifyCustomer(response.customer || response)
    } catch (error: any) {
      console.error("Error updating billing address:", error)
      throw error
    }
  }

  /**
   * Update shipping address
   */
  async updateShippingAddress(id: string, shipping: any) {
    try {
      // For creating new address, use POST to /customers/{id}/addresses.json
      const response = await this.post<any>('/customers/' + id + '/addresses.json', {
        address: shipping
      })
      return transformShopifyCustomer(response.customer || response)
    } catch (error: any) {
      console.error("Error updating shipping address:", error)
      throw error
    }
  }

  /**
   * Change password
   * Note: Admin API doesn't have a direct password update endpoint for customers
   * This requires using Storefront API or implementing custom solution
   */
  async changePassword(id: string, oldPassword: string, newPassword: string) {
    try {
      throw new Error("Use Shopify Storefront API for password changes. Admin API doesn't support customer password updates.")
    } catch (error: any) {
      console.error("Error changing password:", error)
      throw error
    }
  }

  /**
   * Get customer by ID
   */
  async getCustomer(id: string) {
    try {
      const customer = await this.get<ShopifyCustomerResponse>('/customers/' + id + '.json')
      return transformShopifyCustomer(customer)
    } catch (error: any) {
      console.error("Error getting customer:", error)
      throw error
    }
  }

  /**
   * Logout (clears local user state)
   */
  logout() {
    this.currentUser = null
    return true
  }

  /**
   * Get current user
   */
  getCurrentUser() {
    return this.currentUser
  }
}

export const authService = AuthService.getInstance()
