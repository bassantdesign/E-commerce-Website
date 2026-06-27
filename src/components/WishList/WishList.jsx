import React, { useContext, useEffect, useState } from 'react'
import style from './WishList.module.css'
import { cartContext } from '../../Context/CartContext';
import { Helmet } from 'react-helmet';
import { ClimbingBoxLoader } from 'react-spinners';

export default function WishList() {
    const[counter, setCounter] = useState(0);

    let [isLoading, setIsLoading] = useState(true);
    let [whishDetails, setWishDetails] = useState(null);
    let {getWishListItems, removeWishListItem, wishItemsNo, setWishItemsNo, wishlistIds, setWishlistIds} = useContext(cartContext)

    async function getItemsWishList(){
      let response = await getWishListItems()
      setWishDetails(response.data)
      if (response.data.status === 'success') {
        setWishlistIds(response.data.data.map(item => item.id));
        setWishItemsNo(response.data.count)
        console.log(wishItemsNo);
        
      }
      setIsLoading(false)
      console.log(response.data);
    }

    

    useEffect(()=>{
      getItemsWishList()
    },[])
  return <>
        <Helmet>
            <meta charset="UTF-8" />
            <title>WhishList</title>
        </Helmet>
      {isLoading ?<div className='py-8 w-full flex justify-center'>
            <ClimbingBoxLoader color='#0aad0a'/>
          </div>: 
          <div className="shadow-md rounded-lg relative w-75 mx-auto md:mt-8 mb-48 overflow-x-auto bg-neutral-primary-soft border border-default">
              <h1 className='text-3xl text-center text-main font-bold my-3'>Shipping WhishList</h1>
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
                  </tr>
                </thead>
                <tbody>
                  {whishDetails?.data.map((product)=> <tr key={product.id} className="bg-neutral-primary-soft border-b border-default hover:bg-slate-300">
                    <td className="p-4">
                      <img src={product.imageCover} className="w-16 md:w-24 max-w-full max-h-full" alt="Apple Watch" />
                    </td>
                    <td className="px-6 py-4 font-semibold text-lg">
                      {product.title}
                    </td>
                    <td className="px-6 py-4 font-semibold text-base">
                      {product.quantity}
                    </td>
                    <td className="px-6 py-4 font-semibold text-base">
                      {product.price} EGP
                    </td>
                    {/* <td className="px-6 py-4 font-semibold text-lg">
                      {product.product.title}
                    </td>
                    
                    
                    <td className="px-6 py-4">
                      <span onClick={() => removeCart(product.product.id)} className="cursor-pointer font-semibold text-red-600 text-lg hover:text-red-600">Remove</span>
                    </td> */}
                  </tr>
                )}  
                </tbody>
              </table>
          </div>
      }
  </>
}
