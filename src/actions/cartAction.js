import * as types from './types'



export const getNumberInCart=(productIncart)=>{
	return {
		type:types.GET_PRODUCT_BASKET,
		productIncart//payload:product
	}
}