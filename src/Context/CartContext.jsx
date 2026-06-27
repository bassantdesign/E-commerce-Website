import axios from "axios";
import { useEffect } from "react";
import { createContext, useState } from "react";

export let cartContext = createContext();

export default function CartContextProvider(props){

    let[cartId, setCartId] = useState(null)
    let[cartItemsNo, setCartItemsNo] = useState(null)

    let[wishItemsNo, setWishItemsNo] = useState(0)
    let[wishlistIds, setWishlistIds] = useState([]);

    let headers = {
        token: localStorage.getItem('userToken')
    }

    function addToCart(productId){
        return axios.post(`https://ecommerce.routemisr.com/api/v1/cart`,
            { productId:productId},
            { headers:headers })
        .then((response) => response)
        .catch((error) => error.response)
    }

    function getCartItems(){
        return axios.get(`https://ecommerce.routemisr.com/api/v1/cart`,{
            headers:headers
        })
        .then((response) => response)
        .catch((error) => error.response)
    }

    function removeCartItem(productId){
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{
          headers:headers  
        })
        .then((response) => response)
        .catch((error) => error)
    }

    function updateCartItem(productId, count){
        return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{
            count:count
        },{
          headers:headers
        })
        .then((response) => response)
        .catch((error) => error)
    }

    function clearCart(){
       return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`,{
          headers:headers  
        })
        .then((response) => response)
        .catch((error) => error)
    }

    function cashOnDelivery(url, shippingAddress){
        // console.log(cartId, shippingAddress, "cartId, shippingAddress");
        
        return axios.post(url,
            {shippingAddress},
            { headers: headers }
            
        )
        .then((response) => response)
        .catch((error) => error)
    }

    function getUserOrders(id){
        return axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`)
        .then((response) => response)
        .catch((error) => error)
    }

    function addToWhishList(productId){
        return axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`,
            { productId:productId},
            { headers:headers })
        .then((response) => response)
        .catch((error) => error.response)
    }

    function getWishListItems(){
        return axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`,{
            headers:headers
        })
        .then((response) => response)
        .catch((error) => error.response)
    }

    function removeWishListItem(productId){
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,{
          headers:headers  
        })
        .then((response) => response)
        .catch((error) => error)
    }

    useEffect(() => {
        async function getAllWishlist() {
            if (localStorage.getItem('userToken')) {
                let response = await getWishListItems();
                if (response.data.status === 'success') {
                    setWishlistIds(response.data.data.map(item => item.id));
                    setWishItemsNo(response.data.count);
                }
            }
        }
        getAllWishlist();
    }, []);

    return <cartContext.Provider value={{addToCart, getCartItems, removeCartItem, updateCartItem, clearCart, cashOnDelivery, cartId, setCartId, getUserOrders, cartItemsNo, setCartItemsNo, addToWhishList, getWishListItems, removeWishListItem, wishItemsNo, setWishItemsNo, wishlistIds, setWishlistIds}}>
        {props.children}
    </cartContext.Provider>
}