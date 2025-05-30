import type { Address, Cart } from '../types'
import { PaginatedMedusaResponse } from '../types/api-response';
import { ApiService } from './api-service'
const REGION_ID = ''

type CartResponse = PaginatedMedusaResponse<{
  cart: Cart;
}>;

export class CartService {
	static async fetchCartData() {
		const cartId = localStorage.getItem('cart_id') || null
		if (!cartId) return null
		
		const res = await ApiService.get<CartResponse>(`/store/carts/${cartId}`);
		return {
			...res?.cart,
			lineItems: res?.cart?.items?.map((item) => {
				return {
					...item,
					title: item.product.title
				}
			})
		}
	}

	static async refereshCart() {
		const cartId = localStorage.getItem('cart_id') || null
		if (!cartId) return null
		const res =  await ApiService.get<CartResponse>(`/store/carts/${cartId}`)

		return {
			...res?.cart,
			lineItems: res?.cart?.items?.map((item) => {
				return {
					...item,
					title: item.product.title
				}
			})
		}
	}

	static async getCartByCartId(cartId: string) {
		const res = await ApiService.get<CartResponse>(`/store/carts/${cartId}`);

		console.log('cart', res)
		return {
			...res?.cart,
			lineItems: res?.cart?.items?.map((item) => {
				return {
					...item,
					title: item.product.title
				}
			})
		}
	}

	static async addToCart({
		productId,
		variantId,
		qty,
		cartId,
		lineId
	}: {
		productId: string
		variantId: string
		qty: number
		cartId?: string | null
		lineId: string | null
	}) {
		if (cartId === undefined || cartId === 'undefined') {
			cartId = localStorage.getItem('cart_id') || null
		}

		const body = { variant_id: variantId, quantity: qty }

		if (!cartId) {
			const cartRes = await ApiService.post<CartResponse>("/store/carts", {});

			cartId = cartRes?.cart?.id || (cartRes as any)?.id
		}
		localStorage.setItem('cart_id', cartId || '')

		let res
		if (body.quantity === -9999999) {
			res = await ApiService.delete<{ deleted: boolean }>(`/store/carts/${cartId}/line-items/${lineId}`)
		} else {
			if (lineId) {
				res = await ApiService.post<CartResponse>(
          `/store/carts/${cartId}/line-items/${lineId}`,
          body
        );
			} else {
				res = await ApiService.post<CartResponse>(
          `/store/carts/${cartId}/line-items`,
          body
        );
			}
			cartId = res?.cart?.id || (res as any)?.id
		}
		if (cartId) {
			res = await ApiService.get<CartResponse>(`/store/carts/${cartId}`);
			localStorage.setItem('cart_id', cartId)
		}
		return {
      ...('cart' in res ? res.cart : res),
      lineItems: ('cart' in res) ? res?.cart?.items?.map((item) => {
        return {
          ...item,
          title: item.product.title,
        };
      }) : [],
    };
	}

	static async removeCart({ cartId, lineId = null }: { cartId: string; lineId: string | null }) {
		if (cartId === undefined || cartId === 'undefined') {
			cartId = localStorage.getItem('cart_id') || ''
		}

		let res: any = {}
		if (!cartId) {
			const cartRes = await ApiService.post<CartResponse>('/store/carts', {
				region_id: REGION_ID
			})
			cartId = cartRes?.cart?.id || (cartRes as any)?.id
		}
		localStorage.setItem('cart_id', cartId)

		if (lineId) {
			res = await ApiService.delete<{ deleted: boolean }>(`/store/carts/${cartId}/line-items/${lineId}`)
		}
		if (cartId) {
			res = await ApiService.post<CartResponse>(`/store/carts/${cartId}`, {
        customer_id: res?.id,
      });
		}

		if (!res) return {}

		return {
			...res?.cart,
			lineItems: res?.cart?.items?.map((item: any) => {
				return {
					...item,
					title: item.product_title
				}
			})
		}
	}

	static async applyCoupon({ cartId, couponCode }: { cartId: string; couponCode: string }) {
		const res = await ApiService.post<CartResponse>(
      `/store/carts/${cartId}/promotions`,
      {
        code: couponCode,
      }
    );

		return {
			...res?.cart,
			lineItems: res?.cart?.items?.map((item) => {
				return {
					...item,
					title: item.product.title
				}
			})
		}
	}

	static async removeCoupon({ cartId, promotionId }: { cartId: string; promotionId: string }) {
		const res = await ApiService.delete<{ deleted: boolean }>(`/store/carts/${cartId}/promotions/${promotionId}`)
		return res
	}

	static async updateCart2({ cartId, email, billingAddress, customer_id, shippingAddress, phone, isBillingAddressSameAsShipping }: any) {
		if (!cartId || cartId === undefined || cartId === 'undefined') {
			cartId = localStorage.getItem('cart_id') || null
		}

		// Update customer information
		if (email || customer_id) {
			await ApiService.post(`/store/carts/${cartId}/customer`, {
				email,
				customer_id
			})
		}

		// Process shipping address
		if (shippingAddress) {
			const shippingAddressData = {
				first_name: shippingAddress?.firstName,
				last_name: shippingAddress?.lastName,
				address_1: shippingAddress?.address_1,
				address_2: shippingAddress?.address_2,
				city: shippingAddress?.city,
				province: shippingAddress?.state,
				postal_code: shippingAddress?.zip,
				country_code: shippingAddress?.countryCode || 'IN',
				phone: shippingAddress?.phone
			}
			await ApiService.post(`/store/carts/${cartId}`, {
				shipping_address: shippingAddressData
			})
		}

		// Process billing address
		if (billingAddress && !isBillingAddressSameAsShipping) {
			const billingAddressData = {
				first_name: billingAddress?.firstName,
				last_name: billingAddress?.lastName,
				address_1: billingAddress?.address_1,
				address_2: billingAddress?.address_2,
				city: billingAddress?.city,
				province: billingAddress?.state,
				postal_code: billingAddress?.zip,
				country_code: billingAddress?.countryCode || 'IN',
				phone: billingAddress?.phone
			}
			await ApiService.post(`/store/carts/${cartId}`, {
				billing_address: billingAddressData
			})
		} else if (shippingAddress && isBillingAddressSameAsShipping) {
			// Use shipping address as billing address
			const shippingAddressData = {
				first_name: shippingAddress?.firstName,
				last_name: shippingAddress?.lastName,
				address_1: shippingAddress?.address_1,
				address_2: shippingAddress?.address_2,
				city: shippingAddress?.city,
				province: shippingAddress?.state,
				postal_code: shippingAddress?.zip,
				country_code: shippingAddress?.countryCode || 'IN',
				phone: shippingAddress?.phone
			}
			await ApiService.post(`/store/carts/${cartId}`, {
				billing_address: shippingAddressData
			})
		}

		// Get updated cart
		const res = await ApiService.get<CartResponse>(`/store/carts/${cartId}`);
		return {
			...res?.cart,
			lineItems: res?.cart?.items?.map((item) => {
				return {
					...item,
					title: item.product.title
				}
			})
		}
	}

	static async completeCart(cart_id: string) {
		return ApiService.post<Cart>(`/store/carts/${cart_id}/complete`, {})
	}

	static async updateCart({ qty, cartId, lineId = null, productId, variantId, isSelectedForCheckout }: any) {
		if (!cartId || cartId === undefined || cartId === 'undefined') {
			cartId = localStorage.getItem('cart_id') || null
		}

		let res: any = {}
		if (!cartId) {
			const cartRes = await ApiService.post<CartResponse>("/store/carts", {
        region_id: REGION_ID,
      });
			cartId = cartRes?.cart?.id || (cartRes as any)?.id
		}
		localStorage.setItem('cart_id', cartId)

		const body = {
			variant_id: variantId,
			quantity: qty
		}

		if (lineId) {
			res = await ApiService.post<CartResponse>(
        `/store/carts/${cartId}/line-items/${lineId}`,
        body
      );
		} else {
			res = await ApiService.post<CartResponse>(
        `/store/carts/${cartId}/line-items`,
        body
      );
		}

		if (!res) return {}

		return {
			...res?.cart,
			lineItems: res?.cart?.items?.map((item: any) => {
				return {
					...item,
					title: item.product_title
				}
			})
		}
	}

	static async updateShippingRate({ cartId, shippingRateId }: { cartId: string; shippingRateId: string }) {
		const res = await ApiService.post<CartResponse>(
      `/store/carts/${cartId}/shipping-methods`,
      {
        option_id: shippingRateId,
      }
    );

		return {
			...res?.cart,
			lineItems: res?.cart?.items?.map((item) => {
				return {
					...item,
					title: item.product.title
				}
			})
		}
	}
}

