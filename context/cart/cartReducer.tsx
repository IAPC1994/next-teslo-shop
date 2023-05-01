import { ICartProduct, ShippingAddress } from '@/interfaces';
import { CartState,  } from './';

type CartActionType = 
   | { type: '[Cart] - Load Cart From Cookies', payload: ICartProduct[] }
   | { type: '[Cart] - Update Cart', payload: ICartProduct[] }
   | { type: '[Cart] - Update Cart Quantity', payload: ICartProduct }
   | { type: '[Cart] - Remove Product In Cart', payload: ICartProduct }
   | { type: '[Cart] - Load Address From Cookies', payload: ShippingAddress }
   | { type: '[Cart] - Update Address', payload: ShippingAddress }
   | { 
        type: '[Cart] - Update Order Summary', 
        payload: {
            numberOfItems: number;
            subTotal: number;
            tax: number;
            total: number;
        } 
     }
    | { type: '[Cart] - Order Complete' }


export const cartReducer = ( state: CartState, action:CartActionType ):CartState => {

    switch(action.type){
        case '[Cart] - Load Cart From Cookies':
            return{
                ...state,
                isLoaded: true,
                cart: [ ...action.payload ]
            }

        case '[Cart] - Update Cart':
            return{
                ...state,
                cart: [ ...action.payload ]
            }

        case '[Cart] - Update Cart Quantity':
            return{
                ...state,
                cart: state.cart.map( product => {
                    if( product._id !== action.payload._id ) return product;
                    if( product.size !== action.payload.size ) return product;
                    return action.payload;
                })
            }

        case '[Cart] - Remove Product In Cart':
            return{
                ...state,
                cart: state.cart.filter( product => !(product._id === action.payload._id && product.size === action.payload.size) )
            }

        case '[Cart] - Update Order Summary':
            return{
                ...state,
                ...action.payload
            }

        case '[Cart] - Update Address':
        case '[Cart] - Load Address From Cookies':
            return{
                ...state,
                shippingAddress: action.payload
            }

        case '[Cart] - Order Complete':
            return{
                ...state,
                cart: [],
                numberOfItems: 0,
                subTotal: 0,
                tax: 0,
                total: 0,
            }

        default:
            return state;
    }
}