import type { User } from '../types'
import { BaseService } from './base-service'

export class ProfileService extends BaseService {
    private static instance: ProfileService

  /**
   * Get the singleton instance
   */
  /**
   * Get the singleton instance
   * 
   * @returns {ProfileService} The singleton instance of ProfileService
   */
  static getInstance(): ProfileService {
    if (!ProfileService.instance) {
      ProfileService.instance = new ProfileService()
    }
    return ProfileService.instance
  }

  /**
   * Get current customer profile
   * Note: Shopify Admin API doesn't have /customers/me endpoint
   * Use Storefront API for customer access token-based authentication
   * @param customerId - The customer ID (required for Admin API)
   */
  async getOne(customerId?: string) {
    if (!customerId) {
      throw new Error("Customer ID is required for Admin API. Use Storefront API for customer authentication.")
    }
    return this.get<User>('/customers/' + customerId + '.json')
  }

  /**
   * Save customer profile
   * @param customerId - The customer ID
   * @param profile - The profile data to update
   */
  async save(customerId: string, profile: Partial<User>) {
    return this.put<User>('/customers/' + customerId + '.json', {
      customer: {
        id: parseInt(customerId),
        ...profile
      }
    })
  }

  /**
   * Get customer addresses
   * @param customerId - The customer ID
   */
  async getAddresses(customerId: string) {
    return this.get<any>('/customers/' + customerId + '/addresses.json')
  }

  /**
   * Add a new address for customer
   * @param customerId - The customer ID
   * @param address - The address to add
   */
  async addAddress(customerId: string, address: any) {
    return this.post<any>('/customers/' + customerId + '/addresses.json', { address })
  }

  /**
   * Update an existing address
   * @param customerId - The customer ID
   * @param addressId - The address ID to update
   * @param address - The updated address data
   */
  async updateAddress(customerId: string, addressId: string, address: any) {
    return this.put<any>('/customers/' + customerId + '/addresses/' + addressId + '.json', { address })
  }

  /**
   * Delete an address
   * @param customerId - The customer ID
   * @param addressId - The address ID to delete
   */
  async deleteAddress(customerId: string, addressId: string) {
    return this.delete<any>('/customers/' + customerId + '/addresses/' + addressId + '.json')
  }

  /**
   * Register a new customer
   * @param customerData - The customer data for registration
   */
  async register(customerData: any) {
    return this.post<any>('/customers.json', { 
      customer: {
        email: customerData.email,
        password: customerData.password,
        first_name: customerData.firstName,
        last_name: customerData.lastName,
        phone: customerData.phone,
        verified_email: true,
        accepts_marketing: false
      }
    })
  }

  /**
   * Get a specific address
   * @param customerId - The customer ID
   * @param addressId - The address ID
   */
  async getAddress(customerId: string, addressId: string) {
    return this.get<any>('/customers/' + customerId + '/addresses/' + addressId + '.json')
  }
}

export const profileService = ProfileService.getInstance()
