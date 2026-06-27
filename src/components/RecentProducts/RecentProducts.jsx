import React, { useEffect, useState } from 'react'
import style from './RecentProducts.module.css'
import axios from 'axios';
import { Link } from 'react-router';
import ProductDetails from './../ProductDetails/ProductDetails';

export default function RecentProducts() {
    const[counter, setCounter] = useState(0);
    const [recentProducts, setRecentProducts] = useState([]);

    useEffect(()=>{
      getRecentProducts()
    },[])

    function getRecentProducts(){
      axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
      .then(({data})=>{
        setRecentProducts(data.data)
        console.log(data.data);
        
      })
      .catch((error)=>{

      })
    }
  return <>
    <div className="recentProduct pt-3 pb-32">
        <div className="row">
          {recentProducts.map((product)=>
            <div key={product.id} className="w-1/6 px-4 py-4">
              <div className="product text-center">
                <Link to={`/ProductDetails/${product.id}`}>
                <img className='w-full' src={product.imageCover} alt={product.title}/>
                <span className='text-main block font-light mt-3'>{product.category.name}</span>
                <h3 className='text-lg font-normal text-gray-800 mb-4'>{product.title.split(' ').slice(0,2).join(' ')}</h3>
                <div className='flex justify-between items-center mt-3'>
                  <p>{product.price} EGP</p>
                  <span className='text-slate-400 font-semibold'> <i className="fa-solid fa-star text-yellow-500"></i> {product.ratingsAverage}</span>
                </div>
                <button className='btn'>add to cart</button>
                </Link>
              </div>
            </div>
          )}
        </div>
    </div>
  </>
}
