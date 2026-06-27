import React, { useEffect, useState } from 'react'
import style from './Footer.module.css'
import amazon from '../../assets/images/amazon-pay.png'
import AmericanExpress from '../../assets/images/American-Express-Color.png'
import mastercard from '../../assets/images/mastercard.webp'
import paypal from '../../assets/images/paypal.png'
import appleStore from '../../assets/images/get-apple-store.png'
import googleStore from '../../assets/images/get-google-play.png'

export default function Footer() {
    const[counter, setCounter] = useState(0);

    useEffect(()=>{

    },[])
  return <>
  <footer className='bg-main-light fixed bottom-0 left-0 right-0 py-6 z-50'>
    <div className="container mx-auto">
        <h2 className='text-2xl text-slate-700 mb-3'>Get the FreshCart app</h2>
        <p className='text-slate-400 mb-3'>We will send you a link, open it on your phone to download the app</p>   
        <div className='flex items-center gap-2 mb-4 ml-4'>
          <input type="email" id="email" className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-[90%] px-3 py-2 shadow placeholder:text-body" placeholder="Email.." required />
          <button type="submit" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Share App Link</button>
        </div>
        <hr className="border-gray-300"/>
        <div className='flex justify-between items-center'>
          <div className='flex items-center gap-1'>
            <p className='my-5 font-medium text-lg'>Payment Partners</p>
            <img src={amazon} className='w-[60px]' alt="amazon img" />
            <img src={AmericanExpress} className='w-[60px]' alt="AmericanExpress img" />
            <img src={mastercard} className='w-[30px]' alt="mastercard img" />
            <img src={paypal} className='w-[60px]' alt="paypal img" />
          </div>
          <div className='flex items-center gap-1'>
            <p className='my-5 font-medium text-lg'>Get deliveries with FreshCart</p>
            <img src={appleStore} className='w-[60px]' alt="app img" />
            <img src={googleStore} className='w-[60px]' alt="google img" />
          </div>
        </div>
        <hr className="border-gray-300"/>
    </div>
  </footer>
    
  </>
}
