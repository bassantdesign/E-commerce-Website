import React, { useEffect, useState } from 'react'
import style from './Login.module.css'
import { useFormik } from 'formik';
import axios from 'axios';
import { Link, useNavigate } from 'react-router';
import * as Yup from 'yup'
import { useContext } from 'react';
import { UserContext } from '../../Context/UserContext';
import { Helmet} from 'react-helmet-async';
import profile from '../../assets/images/profile.png';

export default function Login() {
    const[counter, setCounter] = useState(0);

    useEffect(()=>{

    },[])

    let navigate = useNavigate()
    
    let {setUserLogin, setUserId, setUserName, setUserEmail, image, setImage} = useContext(UserContext)

    const[apiError, setApiError] = useState('')
    const[isLoading, setIsLoading] = useState(false)    

    async function handleLogin(formValues){
    setIsLoading(true)
    axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, formValues)
    .then((apiResponse) => {
      if(apiResponse?.data?.message === 'success'){
        localStorage.setItem('userToken',apiResponse.data.token);
        localStorage.setItem('userEmail', apiResponse.data.user.email);
        setUserLogin(apiResponse.data.token)

        setUserEmail(apiResponse.data.user.email)
        let savedImage = localStorage.getItem(`image_${apiResponse.data.user.email}`)
        setImage(savedImage || profile)

        setIsLoading(false)
        navigate('/')
      }
      })
    .catch((apiResponse) => {
      setIsLoading(false)
      setApiError(apiResponse?.response?.data?.message)
    })
      console.log(formValues);
    }

    let validationSchema = Yup.object().shape({
          email: Yup.string().email('Invalid email').required('Email is Required'),
          password: Yup.string().matches(/^[A-Z][a-z0-9]{5,10}$/,'Password must be start uppercase letter').required('Password is Required')
        })

    let formik = useFormik({
      initialValues:{
        email:'',
        password:''
      },
      validationSchema,
      onSubmit: handleLogin
    })

  return <>
      <Helmet>
        <meta charset="UTF-8" />
        <title>Login</title>
      </Helmet>
     <div className='py-6 max-w-2xl mx-auto'>

       {apiError ? <div className="p-4 mb-4 text-lg text-red-800 rounded-lg bg-red-50" role="alert">
            {apiError}
        </div> : null }

      <h2 className='text-3xl font-bold mb-6 text-green-600'>Login Now:</h2>
      <form onSubmit={formik.handleSubmit}>

        <div className="relative z-0 w-full mb-5 group">
            <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} type="email" name="email" id="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" "/>
            <label htmlFor="email" className="peer-focus:font-medium absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Email Address:</label>
        </div>

        {formik.errors.email && formik.touched.email ? <div className="p-4 mb-4 text-lg text-red-800 rounded-lg bg-red-50" role="alert">
            {formik.errors.email}
        </div> : null}

        <div className="relative z-0 w-full mb-5 group">
            <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} type="password" name="password" id="password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" "/>
            <label htmlFor="password" className="peer-focus:font-medium absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your password:</label>
        </div>

         {formik.errors.password && formik.touched.password ? <div className="p-4 mb-4 text-lg text-red-800 rounded-lg bg-red-50" role="alert">
            {formik.errors.password}
        </div> : null}

        <div className='flex items-center'>
          <button type="submit" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
          {isLoading ? <i className='fas fa-spinner fa-spin'></i> : 'Login'}
         </button>
         <p className='pl-4'>didn't have account yet ? <span className='font-semibold'> <Link to={'/register'}> Register Now </Link> </span> </p>
        </div>

        
      </form>
    </div>
  </>
}
