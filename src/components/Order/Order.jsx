import React, { useContext, useEffect, useState } from 'react'
import style from './Order.module.css'
import { cartContext } from '../../Context/CartContext';
import { UserContext } from '../../Context/UserContext';
import { Helmet} from 'react-helmet-async';

export default function Order() {
    const[counter, setCounter] = useState(0);

    let{getUserOrders} = useContext(cartContext)
    let{userId} = useContext(UserContext)
    let[allOrders, setAllOrders] = useState([])

    let [openOrder, setOpenOrder] = useState(null);

    function toggleOrder(id) {
        setOpenOrder(openOrder === id ? null : id);
    }

    useEffect(() => {
    console.log("userId:", userId);
    if (!userId) return;
    getUserAllOrders(userId);
    }, [userId]);

async function getUserAllOrders(id) {
    console.log("id", id);
    let res = await getUserOrders(id);
    console.log("res:", res);
    setAllOrders(res.data)
}

  return <>
      <Helmet>
        <meta charset="UTF-8" />
        <title>Orders</title>
      </Helmet>  
      <div className='my-6 mb-48 w-3/4 mx-auto'>
        {allOrders?.map((order) => <div id="accordion-collapse" data-accordion="collapse" className="mb-3 border border-default overflow-hidden shadow-md rounded-lg">
          <h2 id="accordion-collapse-heading-1">
            <button onClick={() => toggleOrder(order.id)} type="button" className="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-body rounded-t-base border border-t-0 border-x-0 border-b-default hover:text-heading hover:bg-neutral-secondary-medium gap-3" data-accordion-target="#accordion-collapse-body-1" aria-expanded="true" aria-controls="accordion-collapse-body-1">
              <div className='flex justify-around'>
                <i className="fa-solid fa-bag-shopping mt-1 mr-2 text-yellow-500"></i>
                <h3 className='mr-1 font-bold text-xl'>Order</h3>
                <p className='text-lg text-main font-bold'> #{order.id}</p>
              </div>
              <div className='flex justify-around'>
                <p className='mr-1 text-slate-500 font-bold'>{new Date(order.createdAt).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                  })}
                </p>
                <p className='text-lg text-main font-bold'> - {order.cartItems.length} items </p>
              </div>
              <div>
                {order.isPaid == false ?  <span className='text-lg font-semibold w-12 h-12 rounded-full bg-yellow-300 text-yellow-700 p-2'>{order.paymentMethodType}</span> : 
                <span className='text-lg font-semibold w-12 h-12 rounded-full bg-red-600 text-red-300 p-2'>{order.paymentMethodType}</span>}
              </div>
              <p className='text-lg font-semibold text-main'>{order.totalOrderPrice} <span className='text-black font-semibold'>EGP</span> </p>
              <svg data-accordion-icon className="w-5 h-5 rotate-180 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinejoin="round" strokeWidth={2} d="m5 15 7-7 7 7" /></svg>
            </button>
          </h2>
          <div id="accordion-collapse-body-1" className="border border-s-0 border-e-0 border-t-0 border-b-default" aria-labelledby="accordion-collapse-heading-1">
            {openOrder === order.id && (
              <div className="p-4 md:p-5">
                <table className="w-full text-sm text-left rtl:text-right text-body">
                  <tbody>
                    {allOrders?.find(order => order.id === openOrder)?.cartItems.map((product) => <tr key={product.product.id} className="bg-neutral-primary-soft border-b border-default hover:bg-slate-300">
                      <td className="p-4">
                        <img src={product.product.imageCover} className="w-16 md:w-24 max-w-full max-h-full" alt="Apple Watch" />
                      </td>
                      <td className="px-6 py-4 font-semibold text-lg">
                        {product.product.title}
                      </td>
                      <td className="px-6 py-4 font-semibold text-base">
                        {product.price} EGP
                      </td>
                    </tr>
                  )}  
                  </tbody>
                </table>
            </div>
            )}
          </div>
        </div>)}
      </div>
  </>
}
