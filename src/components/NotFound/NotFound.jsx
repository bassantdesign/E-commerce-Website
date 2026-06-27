import React, { useEffect, useState } from 'react'
import style from './NotFound.module.css'
import error from '../../assets/images/error.svg'

export default function NotFound() {
    const[counter, setCounter] = useState(0);

    useEffect(()=>{

    },[])
  return <>
  <div className='flex justify-center py-3'>
      <img src={error} className='w-[60%]' alt="" />
  </div>
  </>
}
