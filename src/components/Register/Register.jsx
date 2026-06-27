import React, { useEffect, useState } from 'react'
import style from './Register.module.css'
import { useFormik } from 'formik';
import axios from 'axios';
import { useNavigate } from 'react-router';
import * as Yup from 'yup'
import { useContext } from 'react';
import { UserContext } from '../../Context/UserContext';
import { Helmet} from 'react-helmet-async';

export default function Register() {
    const[counter, setCounter] = useState(0);

    useEffect(()=>{
    },[])


    // function myValidation(values){
    //   let errors = {}
    //   if(values.name === ''){
    //     errors.name = 'Name is Required'
    //   }
    //   else if(!/^[A-Z][a-z]{2,6}$/.test(values.name)){
    //     errors.name = 'Name Must Start with uppercase then lowercase letters consists of two or six characters'
    //   }
    //   if(values.email === ''){
    //     errors.email = 'Email is Required'
    //   }
    //   else if(!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(values.email)){
    //     errors.email = 'Email invalid'
    //   }
    //   if(values.password === ''){
    //     errors.password = 'Password is Required'
    //   }
    //   else if(!/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(values.password)){
    //     errors.password = 'Password invalid'
    //   }
    //   if(values.rePassword === ''){
    //     errors.rePassword = 'rePassword is Required'
    //   }
    //   else if(values.rePassword !== values.password){
    //     errors.rePassword = 'rePassword does not match password'
    //   }
    //   if(values.phone === ''){
    //     errors.phone = 'PhoneNumber is Required'
    //   }
    //   else if(!/^(002|\+2)?01[0125][0-9]{8}$/.test(values.phone)){
    //     errors.phone = 'PhoneNumber invalid'
    //   }
    //   return errors;
    // }


    let navigate = useNavigate()

    // async function handleRegister(formValues){
    // let {data} = await  axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, formValues)
    //   console.log(formValues);
    //   if(data.message === 'success'){
    //     navigate('/')
    //   }
    // }

    const[apiError, setApiError] = useState('')
    const[isLoading, setIsLoading] = useState(false)

    let {setUserLogin} = useContext(UserContext)
    

    let validationSchema = Yup.object().shape({
      name: Yup.string().min(3,'name minLength is 3').max(10,'name maxLength is 10').required('Name is Required'),
      email: Yup.string().email('Invalid email').required('Email is Required'),
      password: Yup.string().matches(/^[A-Z][a-z0-9]{5,10}$/,'Password must be start uppercase letter').required('Password is Required'),
      rePassword:Yup.string().oneOf([Yup.ref('password')],'Password and rePassword must be same').required('rePassword is Required'),
      phone: Yup.string().matches(/^01[0125][0-9]{8}$/,'Phone must be valid Egypt Number').required('PhoneNumber is Required')
    })

   async function handleRegister(formValues){
    setIsLoading(true)
    axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, formValues)
    .then((apiResponse) => {
      if(apiResponse?.data?.message === 'success'){
        localStorage.setItem('userToken',apiResponse.data.token)
        setUserLogin(apiResponse.data.token)
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

    let formik = useFormik({
      initialValues:{
        name:'',
        email:'',
        password:'',
        rePassword:'',
        phone:''
      },
      // validate: myValidation,
      validationSchema,
      onSubmit: handleRegister
    })

  return <>
      <Helmet>
        <meta charset="UTF-8" />
        <title>Register</title>
      </Helmet>
    <div className='py-6 max-w-2xl mx-auto'>

       {apiError ? <div className="p-4 mb-4 text-lg text-red-800 rounded-lg bg-red-50" role="alert">
            {apiError}
        </div> : null }

      <h2 className='text-3xl font-bold mb-6 text-green-600'>Register Now:</h2>
      <form onSubmit={formik.handleSubmit}>

        <div className="relative z-0 w-full mb-5 group">
            <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.name} type="text" name="name" id="name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" "/>
            <label htmlFor="name" className="peer-focus:font-medium absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Name:</label>
        </div>

        {formik.errors.name && formik.touched.name ? <div className="p-4 mb-4 text-lg text-red-800 rounded-lg bg-red-50" role="alert">
            {formik.errors.name}
        </div> : null}

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

        <div className="relative z-0 w-full mb-5 group">
            <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.rePassword} type="password" name="rePassword" id="rePassword" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" "/>
            <label htmlFor="rePassword" className="peer-focus:font-medium absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your rePassword:</label>
        </div>

        {formik.errors.rePassword && formik.touched.rePassword ? <div className="p-4 mb-4 text-lg text-red-800 rounded-lg bg-red-50" role="alert">
            {formik.errors.rePassword}
        </div> : null}

        <div className="relative z-0 w-full mb-5 group">
            <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.phone} type="tel" name="phone" id="phone" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" "/>
            <label htmlFor="phone" className="peer-focus:font-medium absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your phone number:</label>
        </div>

        {formik.errors.phone && formik.touched.phone ? <div className="p-4 mb-4 text-lg text-red-800 rounded-lg bg-red-50" role="alert">
            {formik.errors.phone}
        </div> : null}

        <button type="submit" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
          {isLoading ? <i className='fas fa-spinner fa-spin'></i> : 'Submit'}
        </button>
      </form>
    </div>
  </>
}
