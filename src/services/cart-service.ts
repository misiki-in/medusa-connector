import type { Cart, CartLineItem } from "../types";
import { PaginatedMedusaResponse } from "../types/api-response";
import { transformFromAddress, transformIntoAddress } from "./address-service";
import { BaseService } from "./base-service";

type CartResponse = PaginatedMedusaResponse<{
  cart: Cart;
}>;

export function transformIntoLineItem(item: Record<string, any>) {
  return {
    ...item,
    subtotal: item.unit_price * item.quantity,
    total: item.unit_price * item.quantity,
    qty: item.quantity,
    slug: item.product_handle,
    description: item.product_description,
    productId: item.product_id,
    sku: item.variant_sku,
    variantId: item.variant_id,
    variant: {
      id: item.variant_id,
      title: item.variant_title,
    },
    price: item.unit_price,
    isSelectedForCheckout: true,
  };
}

function transformIntoCart(cart: Record<string, any>) {
  return {
    ...cart,
    phone: cart?.metadata?.phone,
    shippingAddress: transformIntoAddress(cart?.shipping_address),
    shippingAddressId: cart?.shipping_address_id,
    billingAddressId: cart?.billing_address_id,
    billingAddress: transformIntoAddress(cart?.billing_address),
    qty: cart?.items.reduce((a: number, b: any) => a + b.quantity, 0),
    shippingRateId: cart?.shipping_methods?.[0]?.shipping_option_id || null,
    lineItems: cart?.items?.map(transformIntoLineItem),
  };
}

export class CartService extends BaseService {
  private static instance: CartService;

  static getInstance(): CartService {
    if (!CartService.instance) {
      CartService.instance = new CartService();
    }
    return CartService.instance;
  }

  async ensureCartId(cartId: string | null | undefined): Promise<string> {
    if (cartId === undefined || cartId === "undefined") {
      cartId = localStorage.getItem("cart_id") || null;
    }
    if (!cartId) {
      const cartRes = await this.post<CartResponse>("/store/carts", {
        region_id: BaseService.getRegionId()
      });

      cartId = cartRes?.cart?.id || (cartRes as any)?.id;
    }
    if (typeof cartId != "string" || !cartId) {
      throw "Couldnot ensure cartId"
      return ""
    }
    localStorage.setItem("cart_id", cartId || "");

    return cartId;
  }

  async fetchCartData() {
    const cartId = localStorage.getItem("cart_id") || null;
    if (!cartId) return null;

    const res = await this.get<CartResponse>(`/store/carts/${cartId}`);
    return {
      ...res?.cart,
      lineItems: res?.cart?.items?.map((item) => {
        return {
          ...item,
          title: item.product.title,
        };
      }),
    };
  }

  async refereshCart() {
    const res = await this.post<CartResponse>("/store/carts", {
        region_id: BaseService.getRegionId()
    });
    localStorage.setItem('cart_id', res.cart?.id)
    return transformIntoCart(res.cart)
  }

  async getCartByCartId(cartId: string) {
    const res = await this.get<CartResponse>(`/store/carts/${cartId}`);

    console.log("fetched cart", res);
    return transformIntoCart(res.cart);
  }

  async addToCart({
    variantId,
    qty,
    cartId,
    lineId,
  }: {
    productId: string;
    variantId: string;
    qty: number;
    cartId?: string | null;
    lineId: string | null;
  }) {
    cartId = await this.ensureCartId(cartId);
    const res = await this.post<CartResponse>(
      `/store/carts/${cartId}/line-items`,
      {
        variant_id: variantId,
        quantity: qty,
      }
    );

    return transformIntoCart(res.cart);

    /*
    let res;
    if (body.quantity === -9999999) {
      res = await this.delete<{ deleted: boolean }>(
        `/store/carts/${cartId}/line-items/${lineId}`
      );
    } else {
      if (lineId) {
        res = await this.post<CartResponse>(
          `/store/carts/${cartId}/line-items/${lineId}`,
          body
        );
      } else {
        res = await this.post<CartResponse>(
          `/store/carts/${cartId}/line-items`,
          body
        );
      }
      cartId = res?.cart?.id || (res as any)?.id;
    }
    if (cartId) {
      res = await this.get<CartResponse>(`/store/carts/${cartId}`);
      localStorage.setItem("cart_id", cartId);
    }

    return transformCart("cart" in res ? res.cart : res);
    */
  }

  async removeCart({
    cartId,
    lineId = null,
  }: {
    cartId: string;
    lineId: string | null;
  }) {
    cartId = await this.ensureCartId(cartId);
    const res = await this.delete<CartResponse>(
      `/store/carts/${cartId}/line-items/${lineId}`,
    );

    return transformIntoCart(res.cart);

    /*
    if (cartId === undefined || cartId === "undefined") {
      cartId = localStorage.getItem("cart_id") || "";
    }

    let res: any = {};
    if (!cartId) {
      const cartRes = await this.post<CartResponse>("/store/carts", {
        region_id: BaseService.getRegionId(),
      });
      cartId = cartRes?.cart?.id || (cartRes as any)?.id;
    }
    localStorage.setItem("cart_id", cartId);

    if (lineId) {
      res = await this.delete<{ deleted: boolean }>(
        `/store/carts/${cartId}/line-items/${lineId}`
      );
    }
    if (cartId) {
      res = await this.post<CartResponse>(`/store/carts/${cartId}`, {
        customer_id: res?.id,
      });
    }

    if (!res) return {};

    return {
      ...res?.cart,
      lineItems: res?.cart?.items?.map((item: any) => {
        return {
          ...item,
          title: item.product_title,
        };
      }),
    };
    */
  }

  async applyCoupon({
    cartId,
    couponCode,
  }: {
    cartId: string;
    couponCode: string;
  }) {
    const res = await this.post<CartResponse>(
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
          title: item.product.title,
        };
      }),
    };
  }

  async removeCoupon({
    cartId,
    promotionId,
  }: {
    cartId: string;
    promotionId: string;
  }) {
    const res = await this.delete<{ deleted: boolean }>(
      `/store/carts/${cartId}/promotions/${promotionId}`
    );
    return res;
  }

  async updateCart2({
    cartId,
    email,
    billingAddress,
    customer_id,
    shippingAddress,
    phone,
    isBillingAddressSameAsShipping,
  }: any) {
    cartId = await this.ensureCartId(cartId);
    let cartResponse: any = null

    console.log("updating email and phone")
    console.log(cartId, email, billingAddress, shippingAddress)
    // Update customer information
    if (email || customer_id || phone) {
      cartResponse = await this.post(`/store/carts/${cartId}`, {
        email,
        customer_id,
        metadata: {
          phone
        }
      });
    }

    console.log("called shipping", shippingAddress)
    // Process shipping address
    let shippingAddressId = null
    if (shippingAddress) {
      const shippingAddressData = transformFromAddress(shippingAddress)
      cartResponse = await this.post(`/store/carts/${cartId}`, {
        shipping_address: shippingAddressData,
      });
      shippingAddressId = cartResponse?.cart?.shipping_address_id || null
    }

    // Process billing address
    console.log("called billinng", billingAddress)
    if (billingAddress && !isBillingAddressSameAsShipping) {
      const billingAddressData = transformFromAddress(billingAddress)
      cartResponse = await this.post(`/store/carts/${cartId}`, {
        billing_address: billingAddressData,
      });
    }
    /*else if (shippingAddressId && isBillingAddressSameAsShipping) {
      // Use shipping address as billing address
      cartResponse = await this.post(`/store/carts/${cartId}`, {
        billing_address: {
          id: shippingAddressId
        },
      });
    } */
    else if (shippingAddress && isBillingAddressSameAsShipping) {
      const shippingAddressData = transformFromAddress(shippingAddress)
      cartResponse = await this.post(`/store/carts/${cartId}`, {
        billing_address: shippingAddressData,
      });
    }

    return transformIntoCart(cartResponse.cart)
  }

  async completeCart(cart_id: string) {
    return this.post<Cart>(`/store/carts/${cart_id}/complete`, {});
  }

  async updateCart({
    qty,
    cartId,
    lineId = null,
    productId,
    variantId,
    isSelectedForCheckout,
  }: any) {
    cartId = await this.ensureCartId(cartId);

    const body = {
      quantity: qty,
    };

    if (!lineId) {
      const res = await this.post<CartResponse>(
        `/store/carts/${cartId}/line-items`,
        body
      );
      return transformIntoCart(res.cart)
    } else if (qty) {
      const res = await this.post<CartResponse>(
        `/store/carts/${cartId}/line-items/${lineId}`,
        body
      );
      return transformIntoCart(res.cart)
    } else {
      const res = await this.delete<{ parent: any }>(
        `/store/carts/${cartId}/line-items/${lineId}`,
      )
      return transformIntoCart(res.parent)
    }

  }

  async updateShippingRate({
    cartId,
    shippingRateId,
  }: {
    cartId: string;
    shippingRateId: string;
  }) {
    const res = await this.post<CartResponse>(
      `/store/carts/${cartId}/shipping-methods`,
      {
        option_id: shippingRateId,
      }
    );
    return transformIntoCart(res.cart)
  }
}

export const cartService = CartService.getInstance();
