import React, { useEffect, useRef, useState } from 'react'
import style from './Navbar.module.css'
import logo from '../../assets/images/logo.svg'
import profile from '../../assets/images/profile.png'
import { Link, NavLink, useNavigate } from 'react-router';
import { useContext } from 'react';
import { UserContext } from '../../Context/UserContext';
import Login from './../Login/Login';
import { cartContext } from '../../Context/CartContext';
import Cart from './../Cart/Cart';
import wishlist from '../WishList/WishList';

export default function Navbar() {
    const[counter, setCounter] = useState(0);

    let {userLogin, setUserLogin, userName, setUserName, userEmail, setUserEmail, image, setImage} = useContext(UserContext)
    let navigate = useNavigate()

    let {cartItemsNo, wishItemsNo} = useContext(cartContext)
    let [isLoading, setIsLoading] = useState(true);

    let [isOpen, setIsOpen] = useState(false);
    let [isMenuOpen, setIsMenuOpen] = useState(false);
    let fileInputRef = useRef(null);

    function handleFileClick() {
    fileInputRef.current.click();
    }

    function handleFileChange(e) {
    let file = e.target.files[0];
    if (file) {
        let reader = new FileReader();
        reader.onloadend = () => {
            let profile = reader.result;
            setImage(profile);
            localStorage.setItem(`userImage_${userEmail}`, profile);
        };
        reader.readAsDataURL(file);
          }
      }

    function handleDropdownClick() {
    setIsOpen(!isOpen);
    }

     useEffect(()=>{

    },[])

    function logOut(){
      localStorage.removeItem('userToken');
      localStorage.removeItem('userEmail');
      setUserLogin(null)
      setImage(profile)
      navigate('/Login')
    }

  return <>

    <nav className="bg-main-light fixed w-full z-20 top-0 start-0 border-b border-default">
      <div className="container flex flex-wrap items-center justify-between mx-auto p-4">
        <img src={logo} width={180} alt="fresh cart logo" className='pr-10' />
        <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <button type="button" className="relative flex text-sm bg-neutral-primary rounded-full md:me-0" id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom">
            <ul className='flex items-center justify-center'>
              {userLogin == null ? <>
              <li className='py-2'> <NavLink className='text-xl mx-2 text-slate-900 font-normal' to={'/login'}>Login</NavLink> </li>
              <li className='py-2'> <NavLink className='text-xl mx-2 text-slate-900 font-normal' to={'/register'}>Register</NavLink> </li>
              </> : <>
              <Link to={`/Cart/`}>
                <button type="button" className="relative box-border border border-transparent hover:bg-brand-strong shadow-xs font-medium leading-5 rounded-base text-sm p-3">
                      <li className='py-2 text-main mt-1 fa-lg'><i className="fa-solid fa-cart-shopping"></i></li>
                      <span className="sr-only">Notifications</span>
                      <div className="absolute inline-flex items-center justify-center w-6 h-6 text-sm font-bold top-1 border-2 border-buffer rounded-full bg-yellow-400">
                        {cartItemsNo}
                      </div>
                </button>
              </Link>
              <Link to={`/whishlist/`}>
                <button type="button" className="relative box-border border border-transparent hover:bg-brand-strong shadow-xs font-medium leading-5 rounded-base text-sm p-3">
                        <li className='py-2 text-red-700 mt-1 fa-lg'><i className="fa-solid fa-heart"></i></li>
                        <span className="sr-only">Notifications</span>
                        <div className="absolute inline-flex items-center justify-center w-6 h-6 text-sm font-bold top-1 border-2 border-buffer rounded-full bg-black text-white">
                          {wishItemsNo}
                        </div>
                </button>
              </Link>
              {isOpen && (
              <div id="userDropdown" className="absolute right-1 top-10 z-10 bg-slate-400 border border-default-medium rounded-base shadow-lg w-44">
                <div className="px-4 py-3 border-b border-default-medium text-sm text-heading">
                  <div className="font-medium">{userName}</div>
                  <div className="truncate">{userEmail}</div>
                </div>
                  <ul className="p-2 text-sm text-body font-medium" aria-labelledby="avatarButton">
                    <li onClick={logOut}>
                      <span className='block w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded-md cursor-pointer' >Logout</span> 
                    </li>
                  </ul>
              </div>)}
              </>}
            </ul>
            <div className='flex items-center justify-center'>
              <img onClick={handleFileClick} className="w-10 h-10 rounded-full cursor-pointer" src={image} alt="User dropdown"/>
              <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden"/>
              <i className="fa-solid fa-caret-down cursor-pointer" onClick={handleDropdownClick}></i>
            </div>
            
          </button>
          <div className="z-50 hidden bg-neutral-primary-medium border border-default-medium rounded-base shadow-lg w-44" id="user-dropdown">
            <div className="px-4 py-3 text-sm border-b border-default">
              <span className="block text-heading font-medium">Joseph McFall</span>
              <span className="block text-body truncate">name@flowbite.com</span>
            </div>
            <ul className="p-2 text-sm text-body font-medium" aria-labelledby="user-menu-button">
              <li>
                <a href="#" className="inline-flex items-center w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded">Dashboard</a>
              </li>
              <li>
                <a href="#" className="inline-flex items-center w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded">Settings</a>
              </li>
              <li>
                <a href="#" className="inline-flex items-center w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded">Earnings</a>
              </li>
              <li>
                <a href="#" className="inline-flex items-center w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded">Sign out</a>
              </li>
            </ul>
          </div>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} type="button" aria-controls="navbar-user" aria-expanded={isMenuOpen} className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-body rounded-base md:hidden hover:bg-neutral-secondary-soft hover:text-heading focus:outline-none focus:ring-2 focus:ring-neutral-tertiary" aria-controls="navbar-user" aria-expanded="false">
            <span className="sr-only">Open main menu</span>
            <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeWidth={2} d="M5 7h14M5 12h14M5 17h14" /></svg>
          </button>
        </div>
        <div className={`items-center justify-between w-full md:flex md:w-auto ${isMenuOpen ? 'flex' : 'hidden'}`}  id="navbar-user">       <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-default rounded-base bg-neutral-secondary-soft md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-neutral-primary">
              {userLogin !== null ? <>
                    <li className='text-xl mx-2 py-2 text-slate-900 font-normal'> <NavLink to={'/'}>Home</NavLink> </li>
                    <li className='text-xl mx-2 py-2 text-slate-900 font-normal'> <NavLink to={'/cart'}>Cart</NavLink> </li>
                    <li className='text-xl mx-2 py-2 text-slate-900 font-normal'> <NavLink to={'/products'}>Products</NavLink> </li>
                    <li className='text-xl mx-2 py-2 text-slate-900 font-normal'> <NavLink to={'/categories'}>Categories</NavLink> </li>
                    <li className='text-xl mx-2 py-2 text-slate-900 font-normal'> <NavLink to={'/brands'}>Brands</NavLink> </li>
                    </> : null}
              </ul>
        </div>
      </div>
    </nav>


    {/* <li onClick={logOut} className='py-2'> <span className='text-xl mx-2 text-slate-900 font-normal cursor-pointer' >Logout</span> </li> */}

    {/* <nav className='bg-main-light text-center lg:fixed top-0 left-0 right-0 z-50'>
      <div className="container mx-auto py-4 flex flex-col lg:flex-row justify-between items-center">      
        <div className='flex flex-col lg:flex-row items-center'>
          <img src={logo} width={180} alt="fresh cart logo" className='pr-10' />

          <ul className='flex flex-col lg:flex-row justify-around'>
            {userLogin !== null ? <>
            <li className='text-xl mx-2 py-2 text-slate-900 font-normal'> <NavLink to={'/'}>Home</NavLink> </li>
            <li className='text-xl mx-2 py-2 text-slate-900 font-normal'> <NavLink to={'/cart'}>Cart</NavLink> </li>
            <li className='text-xl mx-2 py-2 text-slate-900 font-normal'> <NavLink to={'/products'}>Products</NavLink> </li>
            <li className='text-xl mx-2 py-2 text-slate-900 font-normal'> <NavLink to={'/categories'}>Categories</NavLink> </li>
            <li className='text-xl mx-2 py-2 text-slate-900 font-normal'> <NavLink to={'/brands'}>Brands</NavLink> </li>
            </> : null} 
          </ul>
        </div>
        <ul className='flex flex-col lg:flex-row  items-center'>
              {userLogin == null ? <>
              <li className='py-2'> <NavLink className='text-xl mx-2 text-slate-900 font-normal' to={'/login'}>Login</NavLink> </li>
              <li className='py-2'> <NavLink className='text-xl mx-2 text-slate-900 font-normal' to={'/register'}>Register</NavLink> </li>
              </> : <>
              <Link to={`/Cart/`}>
                <button type="button" className="relative box-border border border-transparent hover:bg-brand-strong shadow-xs font-medium leading-5 rounded-base text-sm p-3">
                  <li className='py-2 text-main mt-1 fa-lg'><i className="fa-solid fa-cart-shopping"></i></li>
                  <span className="sr-only">Notifications</span>
                  <div className="absolute inline-flex items-center justify-center w-6 h-6 text-sm font-bold top-1 border-2 border-buffer rounded-full bg-yellow-400">
                    {cartItemsNo}
                  </div>
                </button>
              </Link>
              <Link to={`/whishlist/`}>
                <button type="button" className="relative box-border border border-transparent hover:bg-brand-strong shadow-xs font-medium leading-5 rounded-base text-sm p-3">
                    <li className='py-2 text-red-700 mt-1 fa-lg'><i className="fa-solid fa-heart"></i></li>
                    <span className="sr-only">Notifications</span>
                    <div className="absolute inline-flex items-center justify-center w-6 h-6 text-sm font-bold top-1 border-2 border-buffer rounded-full bg-black text-white">
                      {wishItemsNo}
                    </div>
                </button>
              </Link>

              <div className='relative'>
                <img onClick={handleFileClick} className="w-10 h-10 rounded-full cursor-pointer" src={image} alt="User dropdown"/>
                <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden"/>
                {isOpen && (
                <div id="userDropdown" className="absolute right-0 mt-25 z-10 bg-slate-400 border border-default-medium rounded-base shadow-lg w-44">
                    <div className="px-4 py-3 border-b border-default-medium text-sm text-heading">
                      <div className="font-medium">{userName}</div>
                      <div className="truncate">{userEmail}</div>
                    </div>
                    <ul className="p-2 text-sm text-body font-medium" aria-labelledby="avatarButton">
                      <li onClick={logOut}>
                        <span className='block w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded-md cursor-pointer' >Logout</span> 
                      </li>
                    </ul>
                </div>)}
              </div>
              </>
              }
              <li className='flex justify-between items-center py-4'>
                <i className="fa-solid fa-caret-down cursor-pointer" onClick={handleDropdownClick}></i>
                <i className="fa-brands fa-instagram mx-2 fa-sm"></i>
                <i className="fa-brands fa-facebook mx-2 fa-sm"></i>
                <i className="fa-brands fa-tiktok mx-2 fa-sm"></i>
                <i className="fa-brands fa-twitter mx-2 fa-sm"></i>
                <i className="fa-brands fa-linkedin mx-2 fa-sm"></i>
                <i className="fa-brands fa-youtube mx-2 fa-sm"></i>
            </li>            
        </ul>
      </div>
    </nav> */}


    
  </>
}
