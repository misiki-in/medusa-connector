import type { Coupon, PaginatedResponse } from './../types'
import { BaseService } from './base-service'

/**
 * CouponService provides functionality for working with Shopify price rules
 * and discount codes.
 *
 * Note: Shopify manages discounts through Price Rules and Discount Codes APIs
 */
export class CouponService extends BaseService {
  private static instance: CouponService

  /**
   * Get the singleton instance
   */
  static getInstance(): CouponService {
    if (!CouponService.instance) {
      CouponService.instance = new CouponService()
    }
    return CouponService.instance
  }

  /**
   * List all coupons (price rules with discount codes)
   */
  async listCoupons({ page = 1, q = '', sort = '-createdAt' }) {
    // Shopify doesn't have a direct list endpoint for all coupons
    // This would require listing price rules
    return {
      data: [],
      count: 0,
      page,
    }
  }

  async searchCoupons({ page = 1, q = '', sort = '-createdAt' }) {
    return { data: [], count: 0, page }
  }

  /**
   * Get a single coupon by ID
   */
  async getCoupon(id: string) {
    try {
      const priceRule = await this.get<any>('/price_rules/' + id + '.json')
      return {
        id: priceRule.id,
        code: priceRule.title,
        discountType: priceRule.target === 'line_item' ? 'percentage' : 'shipping',
        discountValue: priceRule.value,
        minPurchase: priceRule.minimum_order_amount,
        usageLimit: priceRule.usage_limit,
        usedCount: priceRule.usage_count,
        startDate: priceRule.starts_at,
        endDate: priceRule.ends_at,
      }
    } catch (error: any) {
      console.error("Error fetching coupon:", error)
      return {}
    }
  }

  /**
   * Validate a coupon code
   */
  async validateCoupon(code: string) {
    try {
      // This requires Storefront API or checking discount codes
      return { valid: false, message: "Use Shopify Storefront API for coupon validation" }
    } catch (error: any) {
      return { valid: false, message: error.message }
    }
  }

  /**
   * Create a new price rule (coupon)
   */
  async createCoupon(coupon: Omit<Coupon, 'id'>) {
    try {
      const response = await this.post<any>('/price_rules.json', {
        price_rule: {
          title: coupon.code,
          target_type: 'line_item',
          value: '-' + coupon.discountValue,
          value_type: 'fixed_amount',
          customer_selection: 'all',
          starts_at: new Date().toISOString(),
        }
      })
      return response
    } catch (error: any) {
      console.error("Error creating coupon:", error)
      return {}
    }
  }

  async patchCoupon(id: string, coupon: Partial<Coupon>) {
    try {
      const response = await this.put<any>('/price_rules/' + id + '.json', {
        price_rule: coupon
      })
      return response
    } catch (error: any) {
      console.error("Error patching coupon:", error)
      return {}
    }
  }

  async deleteCoupon(id: string) {
    try {
      await this.delete<any>('/price_rules/' + id + '.json')
      return { success: true }
    } catch (error: any) {
      console.error("Error deleting coupon:", error)
      return { success: false }
    }
  }
}

export const couponService = CouponService.getInstance()
