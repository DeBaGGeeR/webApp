import React from 'react'
import BtnRender from './BtnRender'
export default function ProductItems({product,isAdmin,deleteItem,handleCheck}) {
  
    return (
        <div className="product-card">
            {
                isAdmin && <input type="checkbox" checked={product.checked}
                onChange={()=>handleCheck(product._id)}/>
            }
            <img src={product.images.url} alt=""></img>
            <div className="product-box">
                <h2 title={product.title}>{product.title}</h2>
                <span>${product.price}</span>
                <p>{product.description}</p>
           
     
            </div>
        <BtnRender product={product} deleteItem={deleteItem}></BtnRender>
            
        </div>
    )
}
