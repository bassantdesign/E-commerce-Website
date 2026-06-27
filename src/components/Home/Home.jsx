import React, { useEffect, useState } from 'react'
import style from './Home.module.css'
import Products from './../Products/Products';
import Cart from '../Cart/Cart';
import CategoriesSlider from '../CategoriesSlider/CategoriesSlider';
import MainSlider from '../MainSlider/MainSlider';
import { Helmet} from 'react-helmet-async';

export default function Home() {
    const[counter, setCounter] = useState(0);  
    
    useEffect(()=>{

    },[])
  return <>
    <Helmet>
      <meta charset="UTF-8" />
      <title>e-commerce</title>
    </Helmet>
  <MainSlider/>
  <CategoriesSlider/>
  <Products showTitle={false}/>

  </>
}
