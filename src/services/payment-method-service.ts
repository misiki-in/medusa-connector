import { PAGE_SIZE, paymentMethodFromId } from '../config'
import type { PaymentMethod, PaginatedResponse } from './../types'
import { BaseService } from './base-service'

/**
 * PaymentMethodService provides functionality for working with payment methods
 * in the Shopify platform.
 *
 * Note: Shopify Admin API doesn't expose payment gateways directly.
 * Payment methods are configured in Shopify admin panel.
 * This service returns common payment methods that work with Shopify.
 */

/**
 * Common payment methods available in Shopify stores
 */
const COMMON_PAYMENT_METHODS: PaymentMethod[] = [
  {
    id: 'credit_card',
    name: 'Credit Card',
    code: 'credit_card',
    description: 'Pay with Visa, Mastercard, American Express',
    active: true,
    type: 'card',
    apiKey: null,
    img: '/static/payment/credit-card.png'
  },
  {
    id: 'paypal',
    name: 'PayPal',
    code: 'paypal',
    description: 'Pay with your PayPal account',
    active: true,
    type: 'paypal',
    apiKey: null,
    img: '/static/payment/paypal.png'
  },
  {
    id: 'cod',
    name: 'Cash on Delivery',
    code: 'cod',
    description: 'Pay when you receive your order',
    active: true,
    type: 'cod',
    apiKey: null,
    img: '/static/payment/cod.png'
  },
  {
    id: 'bank_transfer',
    name: 'Bank Transfer',
    code: 'bank_transfer',
    description: 'Direct bank transfer payment',
    active: true,
    type: 'bank',
    apiKey: null,
    img: '/static/payment/bank.png'
  },
]

export function transformIntoPaymentMethod(met: Record<string, string>): PaymentMethod {
  return {
    ...met,
    ...paymentMethodFromId[met.id],
  }
}

export class PaymentMethodService extends BaseService {
  private static instance: PaymentMethodService

  /**
   * Get the singleton instance
   */
  static getInstance(): PaymentMethodService {
    if (!PaymentMethodService.instance) {
      PaymentMethodService.instance = new PaymentMethodService()
    }
    return PaymentMethodService.instance
  }

  /**
   * List available payment methods
   * Note: Shopify Admin API doesn't have a payment_gateways endpoint
   * Returns common payment methods available in Shopify
   */
  async list({ page = 1, q = '', sort = '-createdAt' }: { page?: number; q?: string; sort?: string } = {}) {
    // Filter by search query if provided
    let filteredMethods = COMMON_PAYMENT_METHODS
    if (q) {
      const searchLower = q.toLowerCase()
      filteredMethods = COMMON_PAYMENT_METHODS.filter(
        m => m.name.toLowerCase().includes(searchLower) || 
             m.description.toLowerCase().includes(searchLower)
      )
    }

    return {
      count: filteredMethods.length,
      data: filteredMethods,
      pageSize: PAGE_SIZE,
      page,
    }
  }

  /**
   * Get a specific payment method by ID
   * @param id - The payment method ID
   */
  async getById(id: string): Promise<PaymentMethod | null> {
    return COMMON_PAYMENT_METHODS.find(m => m.id === id) || null
  }
}

// Use singleton instance
export const paymentMethodService = PaymentMethodService.getInstance()
