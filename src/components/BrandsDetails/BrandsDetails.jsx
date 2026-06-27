import React, { useEffect, useState } from 'react'
import style from './BrandsDetails.module.css'
import axios from 'axios';
import { useParams } from 'react-router';

export default function BrandsDetails() {
    const[counter, setCounter] = useState(0);

    useEffect(()=>{
      getBrandsDetails()
    },[])

    const [brandsDetails, setBrandsDetails] = useState(null);

    let {_id} = useParams();

    function getBrandsDetails(){
      axios.get(`https://ecommerce.routemisr.com/api/v1/brands/${_id}`)
      .then(({data})=>{
        setBrandsDetails(data.data)
      })
      .catch(()=>{

      })
    }
  return <>
    <div className="productDetails pt-3">
        <div className="row">
          <div className="w-1/4">
            <img className='w-full' src={brandsDetails?.image} alt={brandsDetails?.name} /> 
          </div>
        </div>
    </div>
  </>
}
