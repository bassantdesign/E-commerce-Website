import React, { useEffect, useState } from 'react'
import style from './MainSlider.module.css'
import slider1 from '../../assets/images/slider-image-3.jpeg'
import slider2 from '../../assets/images/slider-image-2.jpeg'
import slider3 from '../../assets/images/slider-image-1.jpeg'
import blog1 from '../../assets/images/blog-img-1.jpeg'
import blog2 from '../../assets/images/blog-img-2.jpeg'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay } from 'swiper/modules';

export default function MainSlider() {
    const[counter, setCounter] = useState(0);

    useEffect(()=>{

    },[])
  return <>
    <div>
      <div className="row">
        <div className="w-3/4">
          <Swiper modules={[Autoplay]}
              autoplay={{ delay: 2000, disableOnInteraction: false }}
              slidesPerView={1}
              loop={true}>
            <SwiperSlide><img src={slider1} alt="sliderImage3" className='w-full h-[500px]' /></SwiperSlide>
            <SwiperSlide><img src={slider2} alt="sliderImage3" className='w-full h-[500px]' /></SwiperSlide>
            <SwiperSlide><img src={slider3} alt="sliderImage3" className='w-full h-[500px]' /></SwiperSlide>
          </Swiper>
        </div>
        <div className="w-1/4">
          <img src={blog1} alt="blog1" className='w-full h-[250px]' />
          <img src={blog2} alt="blog2" className='w-full h-[250px]' />
        </div>
      </div>
    </div>
  </>
}
