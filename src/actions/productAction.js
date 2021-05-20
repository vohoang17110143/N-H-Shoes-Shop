import axios from 'axios'
import * as types from './types'


export const actFetchProducts=(products)=>{
	return {
		type:types.GET_PRODUCT,
		products//payload:product
	}
}


// export const ProName= async (proname)=>{
//  await	localStorage.setItem("currentProduct",proname)
// }
