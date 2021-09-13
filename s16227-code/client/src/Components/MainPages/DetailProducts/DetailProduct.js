import React,{useContext,useState,useEffect} from 'react'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'
import { GlobalState } from '../../../globalState'
import ProductItems from '../utils/productItem/productItems'


export default function DetailProduct() {
    const params = useParams()
    const state = useContext(GlobalState)
    const addCart = state.UserAPI.addCart
    const [products] = state.ProductAPI.products
    const [detailProduct, setdetailProduct] = useState([])

    useEffect(()=> {
        if(params.id){
            products.forEach(product => {
                if(product._id===params.id) setdetailProduct(product)
            });
        }

    },[params,products])
    if(detailProduct.length===0) return null
    return (
        <>
        <div className="detail">
            <img src={detailProduct.images.url} alt=""></img>
            <div className="box-detail">
                <div className="row">
                    <h2>{detailProduct.title}</h2>
                    <h6>ID-{detailProduct.product_id}</h6>
                </div>
                <span>${detailProduct.price}</span>
                <p>{detailProduct.description}</p>
                <p>{detailProduct.content}</p>
                <p><span>Sold: {detailProduct.sold}</span></p>
                <Link to="/cart" id = "btn-buy"className="cart" onClick={() => addCart(detailProduct)}>Buy Now</Link>
            </div>
        </div>
        <div className="related">
                <h2>Related products</h2>
                <div className="products">
                    {
                        products.map(product =>{
                            return product.category === detailProduct.category
                            ?<ProductItems key={product._id} product={product}/>:null
                        })
                    }
                </div>
        </div>
        </>
    )
}
