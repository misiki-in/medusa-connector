import { AxiosError } from 'axios'
import type { User } from '../types'
import { BaseService } from './base-service'

function deleteMeCookie() {
  document.cookie = 'me=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}
function saveUserAsMeCookie(user: User) {
  const me = encodeURIComponent(JSON.stringify(user))
  document.cookie = 'me=' + me
}

function customerToUser(customer: Record<string, any>): User {
  return { ...customer, role: "USER" } as User
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

  // Get current authenticated user (admin)
  async getMe() {
    return this.get<User>('/admin/users/me')
  }

  // Get specific user by ID (admin only)
  async getUser(id: string) {
    return this.get<User>(`/admin/users/${id}`)
  }

  // Customer registration
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
      const registerRes = await this.post<{ token: string }>('/auth/customer/emailpass/register', {
        first_name: firstName,
        last_name: lastName,
        phone,
        email,
        password,
        cart_id: cartId
      })
      const createRes = await this.callFetch<any>('/store/customers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${registerRes.token}`,
        },
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          phone,
          email,
        })
      })
      const authRes = await this.post<{ token: string }>('/auth/customer/emailpass', {
        email,
        password,
        cart_id: cartId
      })
      const sessionRes = await this.callFetch('/auth/session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authRes.token}`,
          'SameSite': 'None'
        },
      })
      const user = customerToUser(createRes.customer)
      saveUserAsMeCookie(user)
      return user
    } catch (e: unknown) {
      const errorMessage = e instanceof Error ? e.message : 'Failed to signup'
      throw new Error(errorMessage)
    }
  }

  // Login for customer
  async login({ email, password, cartId = null }: { email: string; password: string; cartId?: string | null }) {
    const authRes = await this.post<{ token: string }>('/auth/customer/emailpass', {
      email,
      password,
      cart_id: cartId
    })
    const sessionRes = await this.callFetch('/auth/session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authRes.token}`,
      },
    });
    const meRes = await this.callFetch<any>('store/customers/me', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    const user = customerToUser(meRes.customer)
    saveUserAsMeCookie(user)
    return user
  }

  // Logout (handled client-side in Medusa by removing the auth token)
  async logout() {
    const res = await this.delete<{ success: boolean }>('/auth/session')
    deleteMeCookie()
    if (res.success) return null
    else console.error('Failed to delete session')
    return null
  }

  // Forgot password (customer)
  async forgotCustomerPassword(email: string) {
    return this.post<void>('/auth/customer/emailpass/reset-password', {
      email
    })
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

  // Reset password (customer)
  async resetPassword({ token, email, password }: { token: string; email: string; password: string }) {
    return this.post<User>('/auth/customer/emailpass/update', {
      token,
      email,
      password
    })
  }

  // Update user profile (admin)
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
    return this.put<User>(`/admin/users/${id}`, {
      first_name: firstName,
      last_name: lastName,
      email,
      phone
    })
  }

  // Check if email exists (customer)
  async checkEmail(email: string) {
    try {
      return this.post<{ exists: boolean }>('/auth/customer/emailpass/exists', { email })
    } catch (e) {
      const axiosError = e as AxiosError
      throw new Error(axiosError?.message || "Failed to check email");
    }
  }

  // Delete user (admin)
  async deleteUser(id: string) {
    return this.delete<User>(`/admin/users/${id}`)
  }
}

export const userService = UserService.getInstance()

/*
    // Invite admin user
  static async inviteUser(email: string) {
    return ApiService.post<User>('/admin/users/invite', {
      email
    })
  }

  // Accept admin invite
  static async acceptInvite({
    token,
    user
  }: {
    token: string
    user: {
      first_name: string
      last_name: string
      password: string
    }
  }) {
    return ApiService.post<User>('/admin/users/invite/accept', {
      token,
      user
    })
  }

  // Admin user creation (typically done through invites)
  async createAdminUser({ firstName, lastName, email }: { firstName: string; lastName: string; email: string }) {
    return ApiService.post<User>('/admin/users', {
      first_name: firstName,
      last_name: lastName,
      email
    })
  }

  // Login for admin user
  static async adminLogin({ email, password }: { email: string; password: string }) {
    return ApiService.post<{ user: User }>('/auth/user/emailpass', {
      email,
      password
    })
  }

  // Forgot password (admin)
  static async forgotAdminPassword(email: string) {
    return ApiService.post<void>('/auth/user/emailpass/reset-password', {
      email
    })
  }

  // Reset password (admin)
  static async resetAdminPassword({ token, email, password }: { token: string; email: string; password: string }) {
    return ApiService.post<User>('/auth/user/emailpass/update', {
      token,
      email,
      password
    })
  }

*/
