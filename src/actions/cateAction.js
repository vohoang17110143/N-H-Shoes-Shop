
import * as types from './types'


export const actFetchCates=(cates)=>{
	return {
		type:types.GET_CATEGORY,
		cates
	}
}