export const PAGE_SIZE = 20
export const REGION_ID = 'reg_01JWBSQY5SZ8G7DHBG2GPCPEVA'

export const paymentMethodFromId = {
  'pp_system_default': {
    name: 'COD',
    description: "Cash on delivery, manual payments.",
    apiKey: '',
    isTest: true,
    img: '/static/payment/cod.png'
  }
}

export const orderFromSort: Record<string, string> = {
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  //price: 'variants.prices.calculated_amount',
}
