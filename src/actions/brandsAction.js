
import * as types from './types'


export const actFetchBrand=(brands)=>{
	return {
		type:types.GET_BRAND,
		brands
	}
}