import React, { useContext, useEffect, useState } from 'react'
import style from './Products.module.css'
import axios from 'axios';
import { Link } from 'react-router';
import ProductDetails from '../ProductDetails/ProductDetails';
import { useQuery } from '@tanstack/react-query';
import { ClimbingBoxLoader } from 'react-spinners';
import useProducts from '../../Hooks/useProducts';
import { cartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';
import { Helmet} from 'react-helmet-async';

export default function Products({ showTitle = true }) {

    const[currentId, setCurrentId] = useState(null);

    const [Loading, setLoading] = useState(false);

    let {addToCart, cartItemsNo, setCartItemsNo, addToWhishList, removeWishListItem, wishItemsNo, setWishItemsNo, wishlistIds, setWishlistIds} = useContext(cartContext)

    let {data, isError, isFetching, isLoading, error} = useProducts()
    
    if(isLoading){
      return <div className='py-8 w-full flex justify-center'>
        <ClimbingBoxLoader color='#0aad0a'/>
      </div>
    }

    if(isError){
      return <div className='py-8 w-full flex justify-center'>
        <p>{error}</p>
      </div>
    }

    async function addProduct(productId){
      setLoading(true)
      let response = await addToCart(productId)
      if(response.data.status === 'success'){
        let newCartItemsNo = cartItemsNo + 1;
        setCartItemsNo(newCartItemsNo) 
        toast.success('Product added successfully to your cart');
        setLoading(false)
      } else {
        toast.error('You are not logged in. Please login to get access');
      }
      console.log(response);  
    }

    async function addItemToWhish(productId){
      let response = await addToWhishList(productId)
      if(response.data.status === 'success'){
        let newWishItemsNo = wishItemsNo + 1;
        setWishItemsNo(newWishItemsNo);
        setWishlistIds(prev => [...prev, productId]);
        toast.success('Product added successfully to your wishlist');
      } else {
        toast.error('You are not logged in. Please login to get access');
      }
      console.log(response); 
    }

    async function removeWishItem(productId){
      let response = await removeWishListItem(productId)
      if(response.data.status === 'success'){
        let newItemsNo = wishItemsNo - 1;
        setWishItemsNo(newItemsNo);
        setWishlistIds(prev => prev.filter(id => id !== productId));
        toast.success('Product removed successfully to your wishlist');
      } else {
        toast.error('You are not logged in. Please login to get access');
      }
      console.log(response);
    }

    // const [products, setProducts] = useState([]);

    // function getProducts(){
    //   axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
    //   .then(({data})=>{
    //     setProducts(data.data)
    //   })
    //   .catch((error)=>{

    //   })
    // }

    // useEffect(()=>{
    //   getProducts()
    // },[])

  return <>
      {showTitle && (
           <Helmet>
          <meta charset="UTF-8" />
          <title>Products</title>
          </Helmet>     
            )}
    
    <div className="Product pt-3 pb-32">
        <div className="row">
          {data?.data.data.map((product)=>
            <div key={product.id} className="w-1/6 px-4 py-4 relative">
              {wishlistIds.includes(product.id) ? (
                <i onClick={() => removeWishItem(product.id)} className="fa-solid fa-heart absolute top-2 right-2 text-xl text-red-600 cursor-pointer"></i>
              ) : (
                <i onClick={() => addItemToWhish(product.id)} className="fa-regular fa-heart absolute top-2 right-2 text-xl text-red-600 cursor-pointer"></i>
              )}
              <div className="product text-center">
                <Link to={`/ProductDetails/${product.id}/${product.category.name}`}>
                  <img className='w-full' src={product.imageCover} alt={product.title}/>
                  <span className='text-main block font-light mt-3'>{product.category.name}</span>
                  <h3 className='text-lg font-normal text-gray-800 mb-4'>{product.title.split(' ').slice(0,2).join(' ')}</h3>
                  <div className='flex justify-between items-center mt-3'>
                    <p>{product.price} EGP</p>
                    <span className='text-slate-400 font-semibold'> <i className="fa-solid fa-star text-yellow-500"></i> {product.ratingsAverage}</span>
                  </div>
                </Link>
                <button onClick={() => {addProduct(product.id); setCurrentId(product.id)}} className='btn'>
                  {Loading && product.id == currentId ? <i className='fa fa-spinner fa-spin'></i> : <span>add to cart</span>}
                </button>
              </div>
            </div>
          )}
        </div>
    </div>
  </>
}
