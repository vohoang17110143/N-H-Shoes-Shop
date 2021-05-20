import { ADD_PRODUCT_BASKET } from './types';


export const addBasket = (producName) =>{
    return (dispatch) =>{
        dispatch({
            type: ADD_PRODUCT_BASKET,
            payload: producName
        })
    }
}