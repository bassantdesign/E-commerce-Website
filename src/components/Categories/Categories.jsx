import React, { useEffect, useState } from 'react'
import style from './Categories.module.css'
import axios from 'axios';
import { Helmet} from 'react-helmet-async';

export default function Categories() {
    const[counter, setCounter] = useState(0);

    useEffect(()=>{
      getCategories()
    },[])

    const [categories, setCategories] = useState([]);

    function getCategories(){
      axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
      .then(({data})=>{
        console.log(data.data);
        setCategories(data.data)
      })
      .catch((error)=>{

      })
    }
  return <>
      <Helmet>
        <meta charset="UTF-8" />
        <title>Categories</title>
      </Helmet>
    <div className="categories">
      <div className="row">
        {categories.map((category)=>
            <div className="w-1/5 px-4 py-4">
              <img src={category.image} className='h-[200px]' alt="" />
              <h3 className='text-main font-medium mt-3'>{category.name}</h3>
            </div>
        )}
      </div>
    </div>
  </>
}
