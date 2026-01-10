import type { Cart, CartLineItem } from "../types"
import { BaseService } from "./base-service"

// Shopify uses Storefront API for cart operations
// This is a simplified cart implementation for the Admin API context
type ShopifyLineItem = {
  id: number
  product_id: number
  variant_id: number
  quantity: number
  variant_title: string
  title: string
  sku: string
  vendor: string
  variant: {
    id: number
    product_id: number
    title: string
    price: string
    sku: string
    inventory_quantity: number
    image_id: number
  }
  properties: any[]
  price: string
  total_discount: string
}

type ShopifyCart = {
  id: string
  token: string
  line_items: ShopifyLineItem[]
  note: string
  updated_at: string
  created_at: string
}

export function transformShopifyCartItem(item: ShopifyLineItem): CartLineItem {
  return {
    id: item.id.toString(),
    productId: item.product_id.toString(),
    variantId: item.variant_id?.toString() || '',
    qty: item.quantity,
    slug: '',
    description: '',
    price: parseFloat(item.price || '0'),
    total: parseFloat(item.price || '0') * item.quantity,
    subtotal: parseFloat(item.price || '0') * item.quantity,
    sku: item.sku || '',
    title: item.title,
    image: item.variant?.image_id ? `https://cdn.shopify.com/s/files/1/${item.variant.image_id}.jpg` : '',
    isSelectedForCheckout: true,
    variant: item.variant_id ? {
      id: item.variant_id.toString(),
      title: item.variant_title || item.title,
    } : undefined,
  }
}

function transformIntoCart(cart: ShopifyCart): Cart {
  return {
    id: cart.id || cart.token,
    phone: '',
    shippingAddress: null,
    shippingAddressId: '',
    billingAddressId: '',
    billingAddress: null,
    qty: cart.line_items?.reduce((sum, item) => sum + item.quantity, 0) || 0,
    shippingRateId: null,
    lineItems: cart.line_items?.map(transformShopifyCartItem) || [],
    subtotal: cart.line_items?.reduce((sum, item) => sum + (parseFloat(item.price || '0') * item.quantity), 0) || 0,
    total: cart.line_items?.reduce((sum, item) => sum + (parseFloat(item.price || '0') * item.quantity), 0) || 0,
    discount: 0,
    shipping: 0,
    tax: 0,
  }
}

export class CartService extends BaseService {
  private static instance: CartService
  private cartToken: string | null = null
  private customerId: number | null = null

  static getInstance(): CartService {
    if (!CartService.instance) {
      CartService.instance = new CartService()
    }
    return CartService.instance
  }

  /**
   * Initialize cart with customer ID
   * Note: Shopify uses Storefront API for cart management
   */
  async initCart(customerId?: number) {
    if (customerId) {
      this.customerId = customerId
    }
    return this.getCart()
  }

  /**
   * Get current cart
   * Note: Shopify Admin API doesn't provide cart endpoints
   * Use Storefront API for cart operations
   */
  async getCart() {
    try {
      // Return empty cart - Storefront API should be used for cart operations
      return {
        id: '',
        phone: '',
        shippingAddress: null,
        shippingAddressId: '',
        billingAddressId: '',
        billingAddress: null,
        qty: 0,
        shippingRateId: null,
        lineItems: [],
        subtotal: 0,
        total: 0,
        discount: 0,
        shipping: 0,
        tax: 0,
      }
    } catch (error: any) {
      console.error("Error fetching cart:", error)
      return {
        id: '',
        phone: '',
        shippingAddress: null,
        shippingAddressId: '',
        billingAddressId: '',
        billingAddress: null,
        qty: 0,
        shippingRateId: null,
        lineItems: [],
        subtotal: 0,
        total: 0,
        discount: 0,
        shipping: 0,
        tax: 0,
      }
    }
  }

  /**
   * Add item to cart
   * Note: Use Storefront API for cart operations
   */
  async addToCart({
    productId,
    variantId = 0,
    qty = 1
  }: {
    productId: string
    variantId?: string
    qty?: number
  }) {
    try {
      // This requires Storefront API cartCreate mutation
      throw new Error("Use Shopify Storefront API for cart operations. Admin API doesn't support cart management.")
    } catch (error: any) {
      console.error("Error adding to cart:", error)
      throw error
    }
  }

  /**
   * Update cart item quantity
   * Note: Use Storefront API for cart operations
   */
  async updateCartItem({
    cartItemKey,
    qty
  }: {
    cartItemKey: string
    qty: number
  }) {
    try {
      throw new Error("Use Shopify Storefront API for cart operations.")
    } catch (error: any) {
      console.error("Error updating cart item:", error)
      throw error
    }
  }

  /**
   * Remove item from cart
   * Note: Use Storefront API for cart operations
   */
  async removeCartItem(cartItemKey: string) {
    try {
      throw new Error("Use Shopify Storefront API for cart operations.")
    } catch (error: any) {
      console.error("Error removing cart item:", error)
      throw error
    }
  }

  /**
   * Clear cart
   * Note: Use Storefront API for cart operations
   */
  async clearCart() {
    try {
      return this.getCart()
    } catch (error: any) {
      console.error("Error clearing cart:", error)
      throw error
    }
  }

  /**
   * Apply discount code
   * Note: Use Storefront API for discount codes
   */
  async applyCoupon(couponCode: string) {
    try {
      throw new Error("Use Shopify Storefront API for discount codes.")
    } catch (error: any) {
      console.error("Error applying coupon:", error)
      throw error
    }
  }

  /**
   * Remove discount code
   * Note: Use Storefront API for discount codes
   */
  async removeCoupon(couponCode: string) {
    try {
      throw new Error("Use Shopify Storefront API for discount codes.")
    } catch (error: any) {
      console.error("Error removing coupon:", error)
      throw error
    }
  }

  /**
   * Calculate shipping
   * Note: Use Shipping API or Storefront API
   */
  async calculateShipping(address: {
    country: string
    state: string
    postcode: string
    city: string
  }) {
    try {
      throw new Error("Use Shopify Shipping API or Storefront API for shipping calculations.")
    } catch (error: any) {
      console.error("Error calculating shipping:", error)
      throw error
    }
  }
}

export const cartService = CartService.getInstance()
