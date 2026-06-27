import React, { useEffect, useState } from 'react'
import style from './Brands.module.css'
import axios from 'axios';
import { Link } from 'react-router';
import BrandsDetails from './../BrandsDetails/BrandsDetails';
import { Helmet} from 'react-helmet-async';

export default function Brands() {
    const[counter, setCounter] = useState(0);

    useEffect(()=>{
      getBrands()
    },[])

    const [brands, setBrands] = useState([]);

    function getBrands(){
      axios.get(`https://ecommerce.routemisr.com/api/v1/brands`)
      .then(({data})=>{
        setBrands(data.data)
      })
      .catch((error)=>{

      })
    }
  return <>
      <Helmet>
        <meta charset="UTF-8" />
        <title>Brands</title>
      </Helmet>
    <div className="brands">
      <div className="row">
        {brands.map((brand) => 
          <div key={brand._id} className="w-1/5 pt-2 pb-32">
              <Link to={`/BrandsDetails/${brand._id}`}>
                <img src={brand.image} alt={brand.name} className='w-full'/>
              </Link>
          </div>
        )}
      </div>
    </div>
  </>
}
