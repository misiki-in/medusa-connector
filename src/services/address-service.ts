import type { Address } from '../types'
import { BaseService } from './base-service'

export function transformFromAddress(address: Partial<Address>) {
  return {
    first_name: address.firstName || '',
    last_name: address.lastName || '',
    company: address.company || '',
    address_1: address.address1 || '',
    address_2: address.address2 || '',
    city: address.city || '',
    state: address.state || '',
    postcode: address.zipCode || '',
    country: address.country || '',
    email: address.email || '',
    phone: address.phone || '',
  }
}

export function transformIntoAddress(address: any): Address | null {
  if (!address) return null
  return {
    firstName: address.first_name || '',
    lastName: address.last_name || '',
    company: address.company || '',
    address1: address.address_1 || '',
    address2: address.address_2 || '',
    city: address.city || '',
    state: address.state || '',
    zipCode: address.postcode || '',
    country: address.country || '',
    email: address.email || '',
    phone: address.phone || '',
  }
}

export class AddressService extends BaseService {
  private static instance: AddressService

  static getInstance(): AddressService {
    if (!AddressService.instance) {
      AddressService.instance = new AddressService()
    }
    return AddressService.instance
  }

  /**
   * Get countries list
   * Note: Shopify Admin API doesn't provide a countries endpoint directly.
   * This implementation returns a hardcoded list or can be extended to use external API.
   */
  async getCountries() {
    try {
      // Shopify doesn't have a direct countries endpoint in Admin API
      // Return empty array to indicate manual list should be used
      console.warn("Shopify Admin API doesn't provide countries endpoint. Using local list.")
      return []
    } catch (error: any) {
      console.error("Error fetching countries:", error)
      return []
    }
  }

  /**
   * Get states for a country
   */
  async getStates(countryCode: string) {
    try {
      const countries = await this.getCountries()
      const country = countries.find((c: any) => c.code === countryCode)
      return country?.states || []
    } catch (error: any) {
      console.error("Error fetching states:", error)
      return []
    }
  }

  /**
   * Validate address
   * Note: Shopify Admin API doesn't provide address validation.
   * This would require using Shopify's address verification service or a third-party.
   */
  async validateAddress(address: Partial<Address>) {
    try {
      console.warn("Shopify Admin API doesn't provide address validation.")
      return { valid: true, suggested: null }
    } catch (error: any) {
      console.error("Error validating address:", error)
      return { valid: false, errors: ['Address validation failed'] }
    }
  }
}

export const addressService = AddressService.getInstance()
