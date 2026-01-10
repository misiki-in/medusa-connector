import type { PaymentMethod } from '../types'
import { BaseService } from './base-service'

type ShopifyPaymentGateway = {
  id: string
  name: string
  description: string
  active: boolean
}

type PaymentGatewaysResponse = {
  payment_gateways: ShopifyPaymentGateway[]
}

export class CheckoutService extends BaseService {
  private static instance: CheckoutService

  static getInstance(): CheckoutService {
    if (!CheckoutService.instance) {
      CheckoutService.instance = new CheckoutService()
    }
    return CheckoutService.instance
  }

  /**
   * Get available payment gateways
   * Note: Shopify doesn't have a direct payment gateways list endpoint via Admin API
   * Payment methods are configured in Shopify admin and accessed through checkout
   */
  async getPaymentGateways() {
    try {
      // Shopify doesn't expose payment gateways via Admin API in the same way
      // Payment methods are configured in the admin panel
      return [
        { id: 'credit_card', title: 'Credit Card', description: 'Pay with credit card', enabled: true },
        { id: 'paypal', title: 'PayPal', description: 'Pay with PayPal', enabled: true },
        { id: 'cod', title: 'Cash on Delivery', description: 'Pay when you receive', enabled: true },
      ]
    } catch (error: any) {
      console.error("Error fetching payment gateways:", error)
      return []
    }
  }

  /**
   * Get shipping zones and methods
   */
  async getShippingMethods() {
    try {
      const response = await this.get<any[]>('/shipping_zones.json')
      return response || []
    } catch (error: any) {
      console.error("Error fetching shipping methods:", error)
      return []
    }
  }

  /**
   * Calculate shipping rates for a package
   * Note: Requires Shopify Shipping API or use Storefront API
   */
  async calculateShipping(packageDetails: {
    country: string
    state: string
    postcode: string
    city: string
    items: Array<{
      product_id: number
      quantity: number
    }>
  }) {
    try {
      throw new Error("Use Shopify Shipping API or Storefront API for shipping calculations")
    } catch (error: any) {
      console.error("Error calculating shipping:", error)
      return []
    }
  }

  /**
   * Process checkout (create checkout via Storefront API)
   * Note: This requires Storefront API for proper checkout flow
   */
  async processCheckout(checkoutData: {
    customerId?: number
    billing: any
    shipping: any
    paymentMethod: string
    paymentMethodTitle: string
    transactionId?: string
    customerNote?: string
    setPaid?: boolean
    lineItems: Array<{
      variantId: number
      quantity: number
    }>
  }) {
    try {
      throw new Error("Use Shopify Storefront API for checkout operations. Admin API doesn't support checkout creation.")
    } catch (error: any) {
      console.error("Error processing checkout:", error)
      throw error
    }
  }

  /**
   * Get checkout session (Storefront API)
   */
  async getCheckoutSession(sessionId: string) {
    try {
      throw new Error("Use Shopify Storefront API for checkout sessions")
    } catch (error: any) {
      console.error("Error fetching checkout session:", error)
      throw error
    }
  }

  /**
   * Create a checkout URL (Storefront API)
   */
  async createCheckoutUrl(lineItems: Array<{ variantId: number; quantity: number }>) {
    try {
      throw new Error("Use Shopify Storefront API to create checkout URL")
    } catch (error: any) {
      console.error("Error creating checkout URL:", error)
      throw error
    }
  }
}

export const checkoutService = CheckoutService.getInstance()
