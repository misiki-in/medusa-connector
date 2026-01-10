import type { Currency, PaginatedResponse } from '../types'
import { BaseService } from './base-service'

/**
 * Common currencies supported by Shopify
 */
const SUPPORTED_CURRENCIES: Currency[] = [
  { code: 'USD', name: 'US Dollar', symbol: '$', decimalDigits: 2, rounding: 0 },
  { code: 'EUR', name: 'Euro', symbol: '€', decimalDigits: 2, rounding: 0 },
  { code: 'GBP', name: 'British Pound', symbol: '£', decimalDigits: 2, rounding: 0 },
  { code: 'CAD', name: 'Canadian Dollar', symbol: 'CA$', decimalDigits: 2, rounding: 0 },
  { code: 'AUD', name: 'Australian Dollar', symbol: 'A$', decimalDigits: 2, rounding: 0 },
  { code: 'JPY', name: 'Japanese Yen', symbol: '¥', decimalDigits: 0, rounding: 0 },
  { code: 'INR', name: 'Indian Rupee', symbol: '₹', decimalDigits: 2, rounding: 0 },
  { code: 'CNY', name: 'Chinese Yuan', symbol: '¥', decimalDigits: 2, rounding: 0 },
  { code: 'BRL', name: 'Brazilian Real', symbol: 'R$', decimalDigits: 2, rounding: 0 },
  { code: 'MXN', name: 'Mexican Peso', symbol: '$', decimalDigits: 2, rounding: 0 },
]

export class CurrencyService extends BaseService {
  private static instance:CurrencyService 

  static getInstance(): CurrencyService {
    if (!CurrencyService.instance) {
      CurrencyService.instance = new CurrencyService()
    }
    return CurrencyService.instance
  }

  /**
   * List all available currencies
   * Note: Shopify doesn't have a currencies endpoint in Admin API
   * Returns a list of supported currencies
   */
  async listCurrencies() {
    return {
      data: SUPPORTED_CURRENCIES,
      count: SUPPORTED_CURRENCIES.length
    }
  }

  /**
   * Get shop currency or specific currency by code
   * Note: Shopify Admin API doesn't have individual currency endpoint
   * Use /shop.json to get the shop's currency
   * @param code - Currency code (optional, returns shop currency if not provided)
   */
  async getCurrency(code?: string) {
    try {
      const shop = await this.get<any>('/shop.json')
      const shopCurrency = shop.currency
      
      if (code) {
        const currency = SUPPORTED_CURRENCIES.find(c => c.code === code)
        return currency || null
      }
      
      // Return shop currency if no code specified
      return {
        code: shopCurrency,
        name: SUPPORTED_CURRENCIES.find(c => c.code === shopCurrency)?.name || 'Unknown',
        symbol: SUPPORTED_CURRENCIES.find(c => c.code === shopCurrency)?.symbol || '',
        decimalDigits: 2,
        rounding: 0
      }
    } catch (error) {
      console.error("Error fetching currency:", error)
      // Return default currency on error
      return SUPPORTED_CURRENCIES[0]
    }
  }
}

export const currencyService = CurrencyService.getInstance()
