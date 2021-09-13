import axios from 'axios'
import React,{useContext,useState} from 'react'
import { GlobalState } from '../../../globalState'
import Loading from '../utils/Loading/Loading'
import ProductItems from '../utils/productItem/productItems'
import Filter from './Filter'
import LoadMore from './LoadMore'



export default function Products() {
    const state = useContext(GlobalState)
    const [products,setProducts] = state.ProductAPI.products
    const [isAdmin] = state.UserAPI.isAdmin
    const [token] = state.token
    const [callBack,setcallBack] = state.ProductAPI.callBack
    const [loading,setLoading] = useState(false)
    const [isCheck, setisCheck] = useState(false)


    const handleCheck = (id) => {
        products.forEach(product => {
            if(product._id === id) product.checked = !product.checked
        });
        setProducts([...products])
    }
    const checkAll = () => {
        products.forEach(product => {
            product.checked = !isCheck
        })
        setProducts([...products])
        setisCheck(!isCheck)
    }
    const deleteAll = () => {
        products.forEach(product => {
            if(product.checked) deleteItem(product._id,product.images.public_id)
        })
    }
    const deleteItem = async (id,public_id) => {
        try {
            setLoading(true)
            const destroyImg = axios.post('/api/destroy',{public_id},{
                headers:{Authorization: token}
            })
            const deleteProduct = axios.delete(`/api/products/${id}`,{
                headers:{Authorization: token}
            })
            await destroyImg
            await deleteProduct
            setcallBack(!callBack)
            setLoading(false)

        } catch (err) {
            alert(err.response.data.msg)
        }
    }
    if(loading) return <div> <Loading></Loading></div>
    return (
        <>
        <Filter/>
        {
            isAdmin &&
            <div className="delete-all">
                <span>Select all</span>
                <input type="checkbox" checked={isCheck} onChange={checkAll}/>
                <button onClick={deleteAll}>Delete All</button>
            </div>
        }
        <div className="products">
            {
                products.map(product => {
                    return <ProductItems key={product._id} product={product}
                        isAdmin={isAdmin} deleteItem= {deleteItem} handleCheck={handleCheck}
                    />
                })
            }
        </div>
            <LoadMore/>
        {products.length===0 && <Loading/>}
        </>
    )
}
