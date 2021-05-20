import axios from 'axios'
import * as types from './types'
import jwt_decode from "jwt-decode";

export const actFetchUser=(info)=>{
	return {
		type:types.GET_USER_INFO,
		info//payload:info
	}
}
export const LOGINLOG = (token) =>{
	const cusID = jwt_decode(token).sub[1];

	const cusName = jwt_decode(token).sub[0];
	return {
		type:types.GET_USER_TOKEN,
		token,
		cusID,
		cusName
	}
} 


export const logout =  () =>{
	return {
		type:types.LOG_OUT,
	}
}