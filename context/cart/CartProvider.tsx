import { FC, PropsWithChildren, useEffect, useReducer, useRef } from 'react';
import Cookie from 'js-cookie';

import { ICartProduct, IOrder, ShippingAddress } from '@/interfaces';
import { CartContext, cartReducer } from './';
import { tesloApi } from '@/api';
import axios from 'axios';



export interface CartState {
    isLoaded: boolean;
    cart: ICartProduct[];
    numberOfItems: number;
    subTotal: number;
    tax: number;
    total: number;
    shippingAddress?: ShippingAddress
}

const CART_INITIAL_STATE:CartState = {
    isLoaded: false,
    cart:[],
    numberOfItems: 0,
    subTotal: 0,
    tax: 0,
    total: 0,
    shippingAddress: undefined,
}

export const CartProvider:FC<PropsWithChildren> = ({ children }) => {

    const [state, dispatch] = useReducer(cartReducer, CART_INITIAL_STATE);
    const firstTimeLoad = useRef( true );

    useEffect(() => {
        try {
            const cookieProducts = Cookie.get('cart') ? JSON.parse( Cookie.get('cart')! ): []
            dispatch({ type: '[Cart] - Load Cart From Cookies', payload: cookieProducts });
        } catch (error) {
            dispatch({ type: '[Cart] - Load Cart From Cookies', payload: [] });
        }
    }, []);

    useEffect( () => {
        if( Cookie.get('name') ){
            const shippingAddress = {
                name       : Cookie.get('name') || '',
                lastName   : Cookie.get('lastName') || '',
                address    : Cookie.get('address') || '',
                address2   : Cookie.get('address2') || '',
                zip        : Cookie.get('zip') || '',
                city       : Cookie.get('city') || '',
                country    : Cookie.get('country') || '',
                phoneNumber: Cookie.get('phoneNumber') || '',
            }
    
            dispatch({ type: '[Cart] - Load Address From Cookies', payload: shippingAddress });
        } 
    },[]);
    

    useEffect(() => {
        if (firstTimeLoad.current) {
            firstTimeLoad.current = false;
            if (state.cart.length === 0) {
              return;
            }
          }
        Cookie.set('cart', JSON.stringify(state.cart));
    }, [state.cart])
    
    useEffect(() => {
        
        const numberOfItems =  state.cart.reduce( ( prev, current ) => current.quantity + prev, 0);
        const subTotal = state.cart.reduce( ( prev, current ) =>  (current.price * current.quantity) + prev, 0);
        const taxRate = Number(process.env.NEXT_PUBLIC_TAX_RATE || 0 );

        const orderSummary = {
            numberOfItems,
            subTotal,
            tax: subTotal * taxRate,
            total: subTotal * (taxRate + 1)
        }

        dispatch({ type: '[Cart] - Update Order Summary', payload: orderSummary });
    }, [state.cart])
    

    const addProductCart = ( productCart: ICartProduct ) => {
        const productInCart = state.cart.some( p => p._id === productCart._id );
        if( !productInCart ) return dispatch({ type:'[Cart] - Update Cart', payload: [...state.cart, productCart ] });
        
        const sameProductInCartDifferenteSize = state.cart.some( p => p._id === productCart._id && p.size === productCart.size );
        if( !sameProductInCartDifferenteSize ) return dispatch({ type:'[Cart] - Update Cart', payload: [...state.cart, productCart ] });
    
        const updatedProducts = state.cart.map( p => {
            if( p._id !== productCart._id) return p;
            if( p.size !== productCart.size) return p;

            //Update quantity
            p.quantity += productCart.quantity;
            return p;
        });

        dispatch({ type: '[Cart] - Update Cart', payload: updatedProducts });
    }

    const updateCartQuantity = ( product: ICartProduct ) => {
        dispatch({ type: '[Cart] - Update Cart Quantity', payload: product });
    }

    const removeCartProduct = ( product: ICartProduct) => {
        dispatch({ type: '[Cart] - Remove Product In Cart', payload: product });
    }

    const updateAddress = ( address:ShippingAddress ) => {
        Cookie.set('name', address.name);
        Cookie.set('lastName', address.lastName);
        Cookie.set('address', address.address);
        Cookie.set('address2', address.address2 || '');
        Cookie.set('zip', address.zip);
        Cookie.set('city', address.city);
        Cookie.set('country',address.country);
        Cookie.set('phoneNumber',address.phoneNumber);
        dispatch({ type: '[Cart] - Update Address', payload: address });
    }

    const createOrder = async():Promise<{ hasError: boolean; message: string; }> => {

        if( !state.shippingAddress ) throw new Error('There is not shipping address');

        const body:IOrder = {
            orderItems: state.cart.map( p => ({
                ...p,
                size: p.size!
            })),
            shippingAddress: state.shippingAddress,
            numberOfItems: state.numberOfItems,
            subTotal: state.subTotal,
            tax: state.tax,
            total: state.total,
            isPaid: false,
        }

        try {
            const { data } = await tesloApi.post<IOrder>('/orders', body);
            
            dispatch({ type: '[Cart] - Order Complete' });
            
            return{
                hasError: false,
                message: data._id!,
            }

        } catch (error) {
            if( axios.isAxiosError(error) ){
                return{
                    hasError: true,
                    message: error.response?.data.message
                }
            }

            return{
                hasError: true,
                message: 'Unchecked error, contact administrator'
            }
        }
    }

    return(
       <CartContext.Provider value={{
            ...state,

            //Methods
            addProductCart,
            updateCartQuantity,
            removeCartProduct,
            updateAddress,

            //Orders
            createOrder,
       }}>
            { children }
       </CartContext.Provider>
    );
}