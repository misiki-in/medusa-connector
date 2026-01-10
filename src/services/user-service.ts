import type { User } from '../types'
import { BaseService } from './base-service'

type UserExtended = {
  userId: string
  role: string
} | User

// Browser-compatible cookie functions (no-op in Node.js)
function deleteMeCookie() {
  if (typeof document !== 'undefined') {
    document.cookie = 'me=;expires=Thu, 01 Jan 1970 00:00:01 GMT;'
  }
}

function saveUserAsMeCookie(user: UserExtended) {
  if (typeof document !== 'undefined') {
    const me = encodeURIComponent(JSON.stringify(user))
    document.cookie = 'me=' + me
  }
}

function customerToUser(customer: Record<string, any>): UserExtended {
  return { ...customer, userId: customer.id?.toString() || '', role: "USER" }
}

export class UserService extends BaseService {
  private static instance: UserService

  /**
   * Get the singleton instance
   *
   * @returns {UserService} The singleton instance of UserService
   */
  static getInstance(): UserService {
    if (!UserService.instance) {
      UserService.instance = new UserService()
    }
    return UserService.instance
  }

  // Get current authenticated user (requires customer access token via Storefront API)
  async getMe() {
    throw new Error("Use Shopify Storefront API for customer authentication. Admin API doesn't support customer login.")
  }

  // Get specific user by ID (admin only - requires different token)
  async getUser(id: string) {
    return this.get<any>(`/customers/${id}.json`).then((customer) => customerToUser(customer))
  }

  // Customer registration via Admin API (creates customer account)
  async signup({
    firstName,
    lastName,
    phone,
    email,
    password,
    cartId = null
  }: {
    firstName: string
    lastName: string
    phone: string
    email: string
    password: string
    cartId?: string | null
  }) {
    try {
      // Create customer via Admin API
      const createRes = await this.post<any>('/customers.json', {
        customer: {
          first_name: firstName,
          last_name: lastName,
          phone,
          email,
          password,
          verified_email: true,
          accepts_marketing: false
        }
      })
      const user = customerToUser(createRes.customer)
      
      // Only save cookie in browser environment
      if (typeof document !== 'undefined') {
        saveUserAsMeCookie(user)
      }
      
      return user
    } catch (e: unknown) {
      const errorMessage = e instanceof Error ? e.message : 'Failed to signup'
      throw new Error(errorMessage)
    }
  }

  // Login for customer - requires Storefront API for authentication
  async login({ email, password, cartId = null }: { email: string; password: string; cartId?: string | null }) {
    throw new Error("Use Shopify Storefront API for customer authentication. Admin API doesn't support password-based login.")
  }

  // Logout (clears local user state)
  async logout() {
    if (typeof document !== 'undefined') {
      deleteMeCookie()
    }
    return null
  }

  // Forgot password (customer) - requires Storefront API
  async forgotCustomerPassword(email: string) {
    throw new Error("Use Shopify Storefront API for password reset functionality.")
  }

  async joinAsVendor({
    firstName,
    lastName,
    businessName,
    phone,
    email,
    password,
    passwordConfirmation,
    cartId = null,
    origin
  }: {
    firstName: string
    lastName: string
    businessName: string
    phone: string
    email: string
    password: string
    passwordConfirmation: string
    cartId?: string | null
    origin: string
  }) {
    return Promise.resolve()
    /*
    return this.post<User>('/api/auth/join-as-vendor', {
      firstName,
      lastName,
      businessName,
      phone,
      email,
      password,
      cartId,
      origin
    })
    */
  }

  // Reset password (customer) - requires Storefront API
  async resetPassword({ token, email, password }: { token: string; email: string; password: string }) {
    throw new Error("Use Shopify Storefront API for password reset functionality.")
  }

  // Update user profile via Admin API
  async updateProfile({
    id,
    firstName,
    lastName,
    email,
    phone
  }: {
    id: string
    firstName: string
    lastName: string
    email: string
    phone: string
  }) {
    return this.put<any>(`/customers/${id}.json`, {
      customer: {
        id: parseInt(id),
        first_name: firstName,
        last_name: lastName,
        email,
        phone
      }
    }).then((customer) => customerToUser(customer))
  }

  // Check if email exists (customer)
  async checkEmail(email: string) {
    try {
      const res = await this.get<any>(`/customers/search.json?query=email:${email}`)
      return { exists: res.customers?.length > 0 }
    } catch (e) {
      const error = e as Error
      throw new Error(error?.message || "Failed to check email");
    }
  }

  // Delete user (admin only)
  async deleteUser(id: string) {
    throw new Error("Customer deletion requires Admin API with appropriate permissions.")
  }
}

export const userService = UserService.getInstance()
