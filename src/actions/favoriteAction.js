import * as types from './types'

export const actFetchFavorites = (favorites)=>{
	return {
		type:types.GET_FAVORITE,
		favorites//payload:order
	}
}