import type { Region } from '../types'
import { BaseService } from './base-service'

export class RegionService extends BaseService {
	private static instance: RegionService

	static getInstance(): RegionService {
		if (!RegionService.instance) {
			RegionService.instance = new RegionService()
		}
		return RegionService.instance
	}

	/**
	 * Get region information by region ID
	 * Note: Shopify doesn't have regions like Medusa, this returns countries
	 * @param id - Region ID (treated as country code)
	 * @returns Region details
	 */
	async getRegionByRegionId(id: string) {
		try {
			const response = await this.get<{ countries: any[] }>(
        `/countries/${id}.json`
      );

			return {
				id: id,
				name: response.countries[0]?.name || 'Unknown Region',
				currency_code: response.countries[0]?.currency || 'USD',
				countries: response.countries
			}
		} catch (error) {
			console.error("Error fetching region:", error);
			// Return default data on error
			return {
				id: 'error-placeholder',
				name: 'Error Region',
				currency_code: 'USD',
				countries: []
			}
		}
	}

	/**
	 * List all available regions
	 * Note: Shopify doesn't have regions like Medusa, this returns countries
	 * @returns Available regions
	 */
	async listRegions() {
		try {
			const response = await this.get<{countries: any[]}>(`/countries.json`)

			return {
				regions: response.countries.map(country => ({
					id: country.code,
					name: country.name,
					currency_code: country.currency,
					countries: [country]
				}))
			}
		} catch (error) {
			console.error("Error fetching regions:", error);
			return {
				regions: []
			}
		}
	}
}
