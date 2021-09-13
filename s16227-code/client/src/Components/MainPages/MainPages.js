import React ,{useContext}from 'react'
import {Switch, Route} from 'react-router-dom'
import { GlobalState } from '../../globalState'
import Login from './auth/Login'
import Register from './auth/Register'
import Cart from './cart/Cart'
import detailProduct from './DetailProducts/DetailProduct'
import Products from './products/Products'
import OrderHistory from './History/orderHistory'
import OrderDetails from './History/orderDetails'
import NotFound from './utils/not_found/NotFound'
import Categories from './categories/Categories'
import Createproduct from './CreateProduct/CreateProduct'

export default function MainPages() {
    const state = useContext(GlobalState)
    const [isLogged]=state.UserAPI.isLogged
    const [isAdmin] = state.UserAPI.isAdmin
    return (
        <div>
            <Switch>
                <Route path='/' exact component={Products}></Route>
                <Route path="/details/:id" exact component={detailProduct}></Route>
                <Route path='/cart' exact component={Cart}></Route>
                <Route path='/login' exact component={isLogged ? NotFound:Login}></Route>
                <Route path='/register' exact component={isLogged ? NotFound:Register}></Route>
                <Route path='/category' exact component={isAdmin ? Categories: NotFound}></Route>
                <Route path='/create_product' exact component={isAdmin ? Createproduct: NotFound}></Route>
                <Route path='/edit_product/:id' exact component={isAdmin ? Createproduct: NotFound}></Route>
                <Route path='/history' exact component={isLogged ? OrderHistory: NotFound}></Route>
                <Route path='/history/:id' exact component={isLogged ? OrderDetails: NotFound}></Route>
                <Route path='*' exact component={NotFound}></Route>
            </Switch>
        </div>
    )
}
