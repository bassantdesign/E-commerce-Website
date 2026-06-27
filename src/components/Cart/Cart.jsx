import React, { useEffect, useState } from 'react'
import style from './Cart.module.css'
import { useContext } from 'react';
import { cartContext } from '../../Context/CartContext';
import { ClimbingBoxLoader } from 'react-spinners';
import { useNavigate } from 'react-router';
import Checkout from './../Checkout/Checkout';
import { Helmet} from 'react-helmet-async';

export default function Cart() {
    const[counter, setCounter] = useState(0);
    const [cartDetails, setCartDetails] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    let {getCartItems, removeCartItem, updateCartItem, clearCart, setCartId, cartId, setCartItemsNo, cartItemsNo} = useContext(cartContext)

    let navigate = useNavigate()

    async function getCart(){
      let response = await getCartItems()
      setCartId(response.data.cartId)
      setCartDetails(response.data);
      setCartItemsNo(response.data.numOfCartItems)
      setIsLoading(false)
      console.log(response);
    }

    async function removeCart(productId){
      let response = await removeCartItem(productId)
      setCartDetails(response.data);
      setCartItemsNo(response.data.numOfCartItems)
      console.log(response);
    }

    async function updateQuantity(productId, count){
      let response = await updateCartItem(productId, count)
      setCartDetails(response.data);
      console.log(response);
    }

    async function clearAllCart(){
     let {data} = await clearCart()
     console.log(data);
     if (data.message === "success") {
        setCartDetails(null);
        setCartItemsNo(0)
      }
     
    }

    function goToCheckOut(){
      navigate(`/Checkout/${cartId}`)
    }

    useEffect(()=>{
      getCart();
    },[])
    
  return <>
  <Helmet>
        <meta charset="UTF-8" />
        <title>Cart</title>
  </Helmet>
  {isLoading ?<div className='py-8 w-full flex justify-center'>
        <ClimbingBoxLoader color='#0aad0a'/>
      </div>: 
      <div className="shadow-md rounded-lg relative w-75 mx-auto md:mt-8 mb-48 overflow-x-auto bg-neutral-primary-soft border border-default">
          <h1 className='text-3xl text-center text-main font-bold my-3'>Shipping Cart</h1>
          <div className="flex justify-between px-7 my-6">
            <h2 className='text-gray-600 text-2xl'>Total Cart Item: {cartDetails?.numOfCartItems} </h2>
            <h2 className='text-gray-600 text-2xl'>Total Price: {cartDetails?.data.totalCartPrice} </h2>
          </div>
          <table className="w-full text-sm text-left rtl:text-right text-body">
            <thead className="text-lg text-body uppercase bg-slate-300 border-b border-default-medium">
              <tr>
                <th scope="col" className="px-16 py-3">
                  <span className="sr-only">Image</span>
                </th>
                <th scope="col" className="px-6 py-3 font-semibold">
                  Product
                </th>
                <th scope="col" className="px-6 py-3 font-semibold">
                  Qty
                </th>
                <th scope="col" className="px-6 py-3 font-semibold">
                  Price
                </th>
                <th scope="col" className="px-6 py-3 font-semibold">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {cartDetails?.data.products.map((product)=> <tr key={product.product.id} className="bg-neutral-primary-soft border-b border-default hover:bg-slate-300">
                <td className="p-4">
                  <img src={product.product.imageCover} className="w-16 md:w-24 max-w-full max-h-full" alt="Apple Watch" />
                </td>
                <td className="px-6 py-4 font-semibold text-lg">
                  {product.product.title}
                </td>
                <td className="px-6 py-4">
                  <form className="max-w-xs mx-auto">
                    <label htmlFor="counter-input-1" className="sr-only">Choose quantity:</label>
                    <div className="relative flex items-center">
                      <button onClick={() => updateQuantity(product.product.id, product.count - 1)} type="button" id="decrement-button-1" data-input-counter-decrement="counter-input-1" className="flex items-center justify-center text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading focus:ring-4 focus:ring-neutral-tertiary rounded-full text-sm focus:outline-none h-6 w-6">
                        <svg className="w-3 h-3 text-heading" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14" /></svg>
                      </button>
                      <div className='mx-3 font-semibold text-lg'>
                        <span>{product.count}</span>
                      </div>
                      <button onClick={() => updateQuantity(product.product.id, product.count + 1)} type="button" id="increment-button-1" data-input-counter-increment="counter-input-1" className="flex items-center justify-center text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading focus:ring-4 focus:ring-neutral-tertiary rounded-full text-sm focus:outline-none h-6 w-6">
                        <svg className="w-3 h-3 text-heading" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14m-7 7V5" /></svg>
                      </button>
                    </div>
                  </form>
                </td>
                <td className="px-6 py-4 font-semibold text-base">
                  {product.price} EGP
                </td>
                <td className="px-6 py-4">
                  <span onClick={() => removeCart(product.product.id)} className="cursor-pointer font-semibold text-red-600 text-lg hover:text-red-600">Remove</span>
                </td>
              </tr>
            )}  
            </tbody>
          </table>
          {cartItemsNo ? <div className='flex justify-between cart_btn py-2 px-2'>
            <button onClick={() => clearAllCart()} className='btn_clear font-bold bg-red-700 text-white border-1 rounded-xl'>Clear</button>
            <button className='btn font-bold' onClick={goToCheckOut}>Continue to CheckOut</button>
          </div> : null}
          
        </div>
      }
        
        </>
}
