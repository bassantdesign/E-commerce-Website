import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router'
import Layout from './components/Layout/Layout';
import Home from './components/Home/Home';
import Products from './components/Products/Products';
import Cart from './components/Cart/Cart';
import Brands from './components/Brands/Brands';
import Categories from './components/Categories/Categories';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import NotFound from './components/NotFound/NotFound';
import UserContextProvider from './Context/UserContext'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import ProductDetails from './components/ProductDetails/ProductDetails';
import BrandsDetails from './components/BrandsDetails/BrandsDetails'
import { QueryClient, QueryClientProvider} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import CartContextProvider, { cartContext } from './Context/CartContext'
import { Toaster } from 'react-hot-toast'
import Checkout from './components/Checkout/Checkout';
import Order from './components/Order/Order';
import { useContext } from 'react'
import { HelmetProvider } from 'react-helmet-async'
// import { Offline, Online } from 'react-detect-offline'
import WishList from './components/WishList/WishList'

let router = createBrowserRouter([
  {path:'', element: <Layout/>, children:[
    {index:true, element: <ProtectedRoute> <Home/> </ProtectedRoute>},
    {path:'products', element: <ProtectedRoute> <Products/> </ProtectedRoute>},
    {path:'productdetails/:id/:category', element: <ProtectedRoute> <ProductDetails/> </ProtectedRoute>},
    {path:'cart', element: <ProtectedRoute> <Cart/> </ProtectedRoute>},
    {path:'brands', element: <ProtectedRoute> <Brands/> </ProtectedRoute>},
    {path:'brandsdetails/:_id', element: <ProtectedRoute> <BrandsDetails/>  </ProtectedRoute>},
    {path:'categories', element: <ProtectedRoute> <Categories/> </ProtectedRoute>},
    {path:'whishlist', element: <ProtectedRoute> <WishList/> </ProtectedRoute>},
    {path:'checkout/:cartId', element:<ProtectedRoute> <Checkout/> </ProtectedRoute>},
    {path:'allOrders', element:<ProtectedRoute> <Order/> </ProtectedRoute>},
    {path:'login', element: <Login/>},
    {path:'register', element: <Register/>},
    {path:'*', element: <NotFound/>},
  ]}
])
function App() {
  const [count, setCount] = useState(0);

  let{getCartItems, setCartItemsNo} = useContext(cartContext)

  useEffect(()=>{
    getCart()
  },[])

  async function getCart(){
      let response = await getCartItems()
      setCartItemsNo(response.data.numOfCartItems)
    }

  let query = new QueryClient();


  return  <HelmetProvider>
              <QueryClientProvider client={query}>
                <UserContextProvider>
                  <RouterProvider router={router}></RouterProvider>
                  {/* <Online>
                    <div className='bg-green-800 text-white fixed bottom-0 left-0 z-50'>Only shown when you're online</div>
                  </Online> */}
                  {/* <Offline>
                    <div className='bg-red-600 text-white fixed bottom-0 left-0 z-50'>Only shown offline (surprise!)</div>
                  </Offline> */}
                  <Toaster/>
                  <ReactQueryDevtools/>
                </UserContextProvider>
            </QueryClientProvider>
           </HelmetProvider>
       
         
        
   
  
}

export default App
