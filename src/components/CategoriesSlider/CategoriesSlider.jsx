import React, { useEffect, useState } from 'react'
import style from './CategoriesSlider.module.css'

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay } from 'swiper/modules';

import axios from 'axios';

export default function CategoriesSlider() {
    const[counter, setCounter] = useState(0);

    useEffect(()=>{
      getCategories()
    },[])

    const [categories, setCategories] = useState([]);

    function getCategories(){
      axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
      .then(({data})=>{
        setCategories(data.data)
      })
      .catch(()=>{

      })
    }
  return <>
    <div className='categorySlider pt-5'>
      <h1 className='font-semibold text-xl mb-5'>Shop Popular Categories</h1>
      <Swiper 
        modules={[Autoplay]}
        autoplay={{ delay: 2000, disableOnInteraction: false }}
        slidesPerView={8}
        loop={true}>
        {categories.map((category,index) => 
        <SwiperSlide key={index}>
          <img className='category-img w-full h-[200px]' src={category.image} alt={category.name} />
          <h3 className='text-center text-main font-semibold text-lg w-full mt-3'>{category.name}</h3>
        </SwiperSlide>)}
      </Swiper>
    </div>
  </>
}
