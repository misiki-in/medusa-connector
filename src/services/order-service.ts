import { PAGE_SIZE } from '../config'
import type { PaginatedResponse, Order } from './../types'
import { BaseService } from './base-service'

type ShopifyOrderResponse = {
  id: number
  email: string
  created_at: string
  updated_at: string
  fulfilled_at: null
  currency: string
  total_price: string
  subtotal_price: string
  total_tax: string
  total_discounts: string
  total_shipping_price_set: {
    shop_money: { amount: string }
    presentment_money: { amount: string }
  }
  total_line_items_price_set: {
    shop_money: { amount: string }
    presentment_money: { amount: string }
  }
  total_price_set: {
    shop_money: { amount: string }
    presentment_money: { amount: string }
  }
  subtotal_price_set: {
    shop_money: { amount: string }
    presentment_money: { amount: string }
  }
  total_shipping_price: string
  total_taxes: string
  total_discounts: string
  total_weight: number
  financial_status: string
  fulfillment_status: string | null
  name: string
  number: number
  order_number: number
  processed_at: string
  source_name: string
  customer: {
    id: number
    email: string
    created_at: string
    updated_at: string
    first_name: string
    last_name: string
    orders_count: number
    state: string
    total_spent: string
    verified_email: boolean
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
  }
  line_items: Array<{
    id: number
    product_id: number
    variant_id: number
    title: string
    quantity: number
    sku: string
    variant_title: string
    vendor: string
    fulfillment_status: string | null
    price: string
    total_discount: string
    properties: any[]
    tax_lines: any[]
  }>
  shipping_address: {
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
  billing_address: {
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
  discount_codes: Array<{
    code: string
    amount: string
    type: string
  }>
  note: string
  tags: string
  refunds: Array<{
    id: number
    created_at: string
    note: string
    user_id: number
    refund_line_items: any[]
    transactions: any[]
  }>
}

type OrderListResponse = {
  orders: ShopifyOrderResponse[]
}

export function transformShopifyOrder(order: ShopifyOrderResponse): Order {
  return {
    id: order.id.toString(),
    orderNo: order.name,
    order_no: order.name,
    parentOrderNo: '',
    createdAt: order.created_at,
    updatedAt: order.updated_at,
    status: order.fulfillment_status || order.financial_status,
    fulfillments: [],
    lineItems: order.line_items?.map((item) => ({
      id: item.id.toString(),
      productId: item.product_id.toString(),
      variantId: item.variant_id?.toString() || '',
      qty: item.quantity,
      slug: '',
      description: '',
      price: parseFloat(item.price),
      total: parseFloat(item.price) * item.quantity,
      subtotal: parseFloat(item.price) * item.quantity,
      sku: item.sku,
      title: item.title,
      image: '',
      isSelectedForCheckout: true,
    })) || [],
    userEmail: order.email || order.customer?.email || '',
    userPhone: order.shipping_address?.phone || '',
    shippingAddress: {
      firstName: order.shipping_address?.first_name || '',
      lastName: order.shipping_address?.last_name || '',
      address1: order.shipping_address?.address1 || '',
      address2: order.shipping_address?.address2 || '',
      city: order.shipping_address?.city || '',
      state: order.shipping_address?.province || '',
      zipCode: order.shipping_address?.zip || '',
      country: order.shipping_address?.country || '',
      phone: order.shipping_address?.phone || '',
    },
    billingAddress: {
      firstName: order.billing_address?.first_name || '',
      lastName: order.billing_address?.last_name || '',
      address1: order.billing_address?.address1 || '',
      address2: order.billing_address?.address2 || '',
      city: order.billing_address?.city || '',
      state: order.billing_address?.province || '',
      zipCode: order.billing_address?.zip || '',
      country: order.billing_address?.country || '',
      phone: order.billing_address?.phone || '',
      email: order.email || '',
    },
    shippingAddressId: '',
    billingAddressId: '',
    paymentMethod: order.financial_status,
    paymentMethodTitle: order.financial_status,
    paymentStatus: order.financial_status,
    subtotal: parseFloat(order.subtotal_price || '0'),
    total: parseFloat(order.total_price || '0'),
    discount: parseFloat(order.total_discounts || '0'),
    shipping: parseFloat(order.total_shipping_price || '0'),
    tax: parseFloat(order.total_tax || '0'),
  }
}

export class OrderService extends BaseService {
  private static instance: OrderService

  static getInstance(): OrderService {
    if (!OrderService.instance) {
      OrderService.instance = new OrderService()
    }
    return OrderService.instance
  }

  /**
   * Fetch orders for a customer
   */
  async list({ page = 1, perPage = PAGE_SIZE, customerId }: { page?: number; perPage?: number; customerId?: number } = {}): Promise<PaginatedResponse<Order>> {
    const searchParams = new URLSearchParams()
    searchParams.set('limit', String(perPage))
    searchParams.set('status', 'any')
    
    if (customerId) {
      searchParams.set('customer_id', String(customerId))
    }

    try {
      const res = await this.get<OrderListResponse>('/orders.json?' + searchParams.toString())

      return {
        page,
        pageSize: perPage,
        count: res.orders?.length || 0,
        noOfPage: 1,
        data: res.orders?.map(transformShopifyOrder) || []
      }
    } catch (error: any) {
      console.error("Error fetching orders:", error)
      return {
        page,
        pageSize: perPage,
        count: 0,
        noOfPage: 1,
        data: []
      }
    }
  }

  /**
   * Fetch a single order by ID
   */
  async fetchOrder(id: string) {
    try {
      const order = await this.get<ShopifyOrderResponse>('/orders/' + id + '.json')
      return transformShopifyOrder(order)
    } catch (error: any) {
      console.error("Error fetching order:", error)
      throw error
    }
  }

  /**
   * Get order by order number
   */
  async getOrder(orderNo: string) {
    try {
      const orders = await this.list({ perPage: 1 })
      const order = orders.data.find((o) => o.orderNo === orderNo)
      if (order) {
        return this.fetchOrder(order.id)
      }
      throw new Error('Order not found')
    } catch (error: any) {
      console.error("Error getting order:", error)
      throw error
    }
  }

  /**
   * Create an order (usually for POS or draft orders)
   */
  async createOrder(orderData: {
    customerId?: number
    billing: any
    shipping: any
    paymentMethod: string
    paymentMethodTitle: string
    transactionId?: string
    customerNote?: string
    lineItems: Array<{
      variantId: number
      quantity: number
    }>
  }) {
    try {
      const response = await this.post<ShopifyOrderResponse>('/orders.json', {
        order: {
          customer: { id: orderData.customerId },
          billing_address: orderData.billing,
          shipping_address: orderData.shipping,
          line_items: orderData.lineItems,
          note: orderData.customerNote || '',
        }
      })
      return transformShopifyOrder(response)
    } catch (error: any) {
      console.error("Error creating order:", error)
      throw error
    }
  }

  /**
   * Update order status
   */
  async updateOrderStatus(orderId: string, status: string) {
    try {
      const response = await this.put<ShopifyOrderResponse>('/orders/' + orderId + '.json', {
        order: {
          id: parseInt(orderId),
          fulfillment_status: status
        }
      })
      return transformShopifyOrder(response)
    } catch (error: any) {
      console.error("Error updating order status:", error)
      throw error
    }
  }

  /**
   * Get order notes/attributes
   */
  async getOrderNotes(orderId: string) {
    try {
      const order = await this.fetchOrder(orderId)
      return [{ note: order.note, customerNote: false }]
    } catch (error: any) {
      console.error("Error fetching order notes:", error)
      return []
    }
  }

  /**
   * Add order note
   */
  async addOrderNote(orderId: string, note: string, customerNote = false) {
    try {
      const response = await this.put<ShopifyOrderResponse>('/orders/' + orderId + '.json', {
        order: {
          id: parseInt(orderId),
          note: note
        }
      })
      return response
    } catch (error: any) {
      console.error("Error adding order note:", error)
      throw error
    }
  }

  /**
   * Process refund
   */
  async refundOrder(orderId: string, amount: number, reason?: string) {
    try {
      const response = await this.post<any>('/orders/' + orderId + '/refunds.json', {
        refund: {
          note: reason || '',
          amount: amount.toFixed(2),
        }
      })
      return response
    } catch (error: any) {
      console.error("Error processing refund:", error)
      throw error
    }
  }
}

export const orderService = OrderService.getInstance()
