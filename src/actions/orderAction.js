import axios from 'axios'
import * as types from './types'


export const actFetchOrder=(order)=>{
	return {
		type:types.GET_USER_ORDER,
		order//payload:order
	}
}