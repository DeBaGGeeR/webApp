import React,{useContext} from 'react'
import { Link } from 'react-router-dom'
import { GlobalState } from '../../../../globalState'

export default function BtnRender({product,deleteItem}) {
    const state = useContext(GlobalState)
    const [isAdmin] = state.UserAPI.isAdmin
    const addCart = state.UserAPI.addCart
    return (
        <div>
            <div className="row-btn">
                {
                    isAdmin ? 
                    <>
                        <Link id="btn-buy" onClick={()=>deleteItem(product._id,product.images.public_id)}>
                            Delete
                        </Link>
                        <Link id="btn-view" to={`/edit_product/${product._id}`}>
                            Edit
                        </Link>
                    </>:<>
                        <Link id="btn-buy" to="#!" onClick={()=> addCart(product)}>
                        Add Cart
                    </Link>
                    <Link id="btn-view" to={`/details/${product._id}`}>
                        View
                    </Link>
                    </>
                }
            </div>
        </div>
    )
}
