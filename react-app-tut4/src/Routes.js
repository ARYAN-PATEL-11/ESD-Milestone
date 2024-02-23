import React from 'react'
import { BrowserRouter , Routes , Route }  from 'react-router-dom'
import Home from './core/Home'
import Cart from './core/Cart'
import Product from './core/Product'
import Profile from './core/Profile'

const Routesrenamed = () =>{
    return(
        <BrowserRouter>
			<Routes>
				<Route path="/" exact element={<Home />} />
				<Route path="/profile" element={<Profile />} />
				<Route path="/product/:productId" element={<Product />} />
				<Route path="/cart" element={<Cart />} />
				
			</Routes>
		</BrowserRouter>
    )
}
export default Routesrenamed;