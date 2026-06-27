import React, { useContext, useEffect, useState } from 'react'
import style from './Checkout.module.css'
import { useFormik } from 'formik';
import { cartContext } from '../../Context/CartContext';
import { useNavigate, useParams } from 'react-router';

export default function Checkout() {
    let navigate = useNavigate()
    let {cashOnDelivery} = useContext(cartContext)
    let [isOnlinePayment, setIsOnlinePayment] = useState(false);

    let {cartId} = useParams()

    useEffect(()=>{

    },[])

    async function pay(){
      console.log("cartId:", cartId);
      console.log("values:", formik.values);
      let url = `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`
      if(isOnlinePayment){
        url = `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:5173`
      }
      let res = await cashOnDelivery(url,formik.values)
      if(res.data?.status == "success"){
        if(isOnlinePayment){
          window.location.href = res.data.session.url
        } else{
          navigate('/allOrders')
        }
      } else {
        console.log('ay7aga', res);
        
      }
    }

    let formik = useFormik({
          initialValues:{
            details:"details",
            phone:"01010800921",
            city:"Cairo"
          },
          onSubmit: pay
        })
        
  return <>
    <div className='py-6 max-w-2xl mx-auto'>
      <h2 className='text-3xl font-bold mb-6 text-green-600 mt-3'>Checkout Now: </h2>
      <form onSubmit={formik.handleSubmit}>
        <div className="relative z-0 w-full mb-5 group">
          <input onChange={formik.handleChange} value={formik.values.details} type="text" name="details" id="details" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" "/>
          <label htmlFor="details" className="peer-focus:font-medium absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your details:</label>
        </div>

        <div className="relative z-0 w-full mb-5 group">
          <input onChange={formik.handleChange} value={formik.values.phone} type="tel" name="phone" id="phone" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" "/>
          <label htmlFor="phone" className="peer-focus:font-medium absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your phone:</label>
        </div>

        <div className="relative z-0 w-full mb-5 group">
          <input onChange={formik.handleChange} value={formik.values.city} type="text" name="city" id="city" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" "/>
          <label htmlFor="city" className="peer-focus:font-medium absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your city:</label>
        </div>

        <input type="checkbox" id='forOnline' onChange={() => setIsOnlinePayment(!isOnlinePayment)}/>
        <label htmlFor="forOnline" className='ml-1'>Pay Online</label>
        <button type="submit" className="text-white bg-green-700 hover:bg-green-800 mt-3 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
          {isOnlinePayment ? 'Pay Online' : 'COD'}
        </button>
      </form>
    </div>
  </>
}
