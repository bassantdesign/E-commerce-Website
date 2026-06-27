import React, { useContext, useEffect, useState } from 'react'
import style from './ProductDetails.module.css'
import { Link, useParams } from 'react-router';
import axios from 'axios';
import { ClimbingBoxLoader } from 'react-spinners';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay } from 'swiper/modules';
import { useQuery } from '@tanstack/react-query';
import { cartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';
import { Helmet} from 'react-helmet-async';

export default function ProductDetails() {
    const[counter, setCounter] = useState(0);

    let {id, category} = useParams();
    const [productDetails, setProductDetails] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState([]);
    // const [isLoading, setIsLoading] = useState(false);

    // useEffect(()=>{
    //   getProductDetails(id)
    //   getRelatedProducts(category)
    // },[id, category])

    // function getProductDetails(id){
    //   setIsLoading(true)
    //   axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
    //   .then(({data})=>{
    //     setProductDetails(data.data)
    //     setIsLoading(false)
    //   })
    //   .catch(()=>{

    //   })
    // }

    let {addToCart, cartItemsNo, setCartItemsNo} = useContext(cartContext)

    function getProductDetails(){
      return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
    }

    async function addProduct(productId){
      let response = await addToCart(productId)
      if(response.data.status === 'success'){
        let newCartItemsNo = cartItemsNo + 1;
        setCartItemsNo(newCartItemsNo)
        toast.success(response.data.message); 
      } else {
        toast.error('You are not logged in. Please login to get access'); 
      }
      console.log("productId:", productId)
      console.log(response);  
    }

    let {data, isLoading} = useQuery({
      queryKey: ['Details', id],
      queryFn: getProductDetails,
      select: (data) => data?.data.data
    })
    // console.log(data);

    useEffect(() => {
    setProductDetails(data)
    getRelatedProducts(data?.category?.name)
      }, [data])

    function getRelatedProducts(category){
      axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
      .then(({data})=>{
        let allProducts = data.data
        let related = allProducts.filter((product)=> product.category.name == category)
        setRelatedProducts(related)
        console.log(related);
      })
      .catch((err)=>{
        console.log(err);
      })
    }
    
  return <>
      <Helmet>
            <meta charset="UTF-8" />
            <title>{productDetails?.title}</title>
            <meta name='description' content={productDetails?.slug}></meta>
      </Helmet>
    <div className="productDetails">
        <div className="row gap-2">
          {isLoading ? <div className='w-full flex justify-center'> 
            <ClimbingBoxLoader color='#0aad0a'/>
          </div> : <>
          <div className="w-1/4 relative z-0">
              <Swiper
              modules={[Navigation, Pagination]}
              // navigation
              pagination={{ clickable: true }}
              slidesPerView={1}>
              {productDetails?.images.map((src, index) => (
                <SwiperSlide key={index}>
                  <img className='w-full' src={src} alt={productDetails.title} />
                </SwiperSlide>
              ))}
              </Swiper>
            {/* <img className='w-full' src={productDetails?.imageCover} alt={productDetails?.title} /> */}
          </div>
          <div className="w-2/3">
            <h2 className='mb-3 text-gray-900 font-semibold text-lg'>{productDetails?.title}</h2>
            <p className='text-slate-500 font-medium ml-2 text-lg'>{productDetails?.description}</p>
            <span className='text-main block font-light mt-3'>{productDetails?.category?.name}</span>
            <div className='flex justify-between items-center mt-3'>
              <p>{productDetails?.price} EGP</p>
              <span className='text-slate-400 font-semibold'> <i className="fa-solid fa-star text-yellow-500"></i> {productDetails?.ratingsAverage}</span>
            </div>
            <button onClick={() => addProduct(productDetails?.id)} className='btn mt-3'> + add to cart </button>
          </div>
            </>}
        </div>
    </div>

    <div className="relatedProducts pb-36">
      <h2 className='text-2xl font-semibold text-main'>Related Products</h2>
      <div className="row">
        <Swiper 
                modules={[Autoplay]}
                autoplay={{ delay: 2000, disableOnInteraction: false }}
                slidesPerView={1}
                loop={true}>
              {relatedProducts.map((product,index)=> (
                <SwiperSlide key={index}>
                  <div key={product.id} className="w-1/2 mx-auto px-4">
                    <div className="product text-center w-1/2 mx-auto">
                      <Link to={`/ProductDetails/${product.id}/${product.category.name}`}>
                      <img className='w-1/2 m-auto' src={product.imageCover} alt={product.title}/>
                      <span className='text-main block font-light mt-3'>{product.category.name}</span>
                      <h3 className='text-lg font-normal text-gray-800 mb-4'>{product.title.split(' ').slice(0,2).join(' ')}</h3>
                      <div className='flex justify-between items-center mt-3'>
                        <p>{product.price} EGP</p>
                        <span className='text-slate-400 font-semibold'> <i className="fa-solid fa-star text-yellow-500"></i> {product.ratingsAverage}</span>
                      </div>
                      </Link>
                      <button onClick={() => addProduct(product.id)} className='btn'>add to cart</button>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
        </Swiper>
      </div>
    </div>

    {/* <div className="relatedProducts pb-32">
      <div className="row">
        {relatedProducts.map((product)=>
        <div key={product.id} className="w-1/6 px-4 py-2">

              <div className="product text-center">
                <Link to={`/ProductDetails/${product.id}/${product.category.name}`}>
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
    </div> */}
  </>
}
