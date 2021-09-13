import axios from 'axios'
import React,{useState,useContext,useEffect} from 'react'
import { GlobalState } from '../../../globalState'
import Loading from '../utils/Loading/Loading'
import {useHistory,useParams} from 'react-router-dom'

const initialState ={
    product_id:'',
    title:'',
    price: 0,
    description: 'Enter discribtion here',
    content: 'Enter content here',
    category: '',
    _id:''
}

export default function Createproduct() {
    const state = useContext(GlobalState)
    const [product, setproduct] = useState(initialState) 
    const [categories] = state.CategoriesAPI.categories
    const [images, setimages] = useState(false)
    const [loading, setloading] = useState(false)
    const [isAdmin] = state.UserAPI.isAdmin
    const [token]= state.token
    const history = useHistory()
    const params = useParams()
    const [onEdit,setonEdit] = useState(false)
    const [callBack,setcallBack] = state.ProductAPI.callBack

    const [products] = state.ProductAPI.products
    useEffect(() => {
        if(params.id){
            setonEdit(true)
            products.forEach(product => {
                if(product._id===params.id){ 
                setproduct(product)
                setimages(product.images)
                }
            });
        }else{
            setonEdit(false)
            setproduct(initialState)
            setimages(false)
        }
    },[params.id,products])

    const onHandleUpload = async e => {
        e.preventDefault()
        try {
            if(!isAdmin) return alert("You are not authorized to do this")
            const file = e.target.files[0]
            if(!file) return alert("File doesn't exist!!")
            if(file.size > 1024*1024) return alert("File size too large")
            if(file.type !== "image/jpeg" && file.type !== "image/png") return alert("File format is incorrect")

            let formData = new FormData()
            formData.append('file',file)
            setloading(true)
            const res = await axios.post('/api/upload',formData,{
                headers:{'content-type':'multipart/form-data',Authorization:token}
            })

            setloading(false)
            setimages(res.data)
        } catch (err) {
            alert(err.response.data.msg)
        }
    }
    const onHandleDestroy = async () => {
        try {
            if(!isAdmin) return alert("You are not authorized to do this")
            setloading(true)
            await axios.post('/api/destroy',{public_id:images.public_id},{
                headers:{Authorization:token}
            })
            setloading(false)
            setimages(false)
        } catch (err) {
            alert(err.response.data.err)
        }
    }
    const onHandleChageInput = e => {
        const {name,value} = e.target
        setproduct({...product,[name]:value})
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            if(!isAdmin) return alert("You are not authorized to do this")
            if(!images) return alert("No image uploaded")
            if(onEdit){
                const res = await axios.put(`/api/products/${product._id}`,{...product,images},{
                    headers:{Authorization:token}
                })
                alert(res.data.msg)
            }else{
                const res = await axios.post('/api/products',{...product,images},{
                    headers:{Authorization:token}
                })
                alert(res.data.msg)
            }
            setcallBack(!callBack)
            history.push('/')
        } catch (err) {
            alert(err.response.data.msg)
        }
    }
    const styleUpload = {
        display: images ? "block" : "none"
    }
    return (
        <div className="create_product">
            <div className="upload">
                <input type="file" name="file" id="file_up" onChange={onHandleUpload}/>
                {
                    loading?<div id="file_img"><Loading/></div>
                    :<div id="file_img" style={styleUpload}>
                    <img src={images ? images.url: ''} alt="product" />
                        <span onClick={onHandleDestroy}>X</span>
                    </div>
                }
            </div>
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <label htmlFor="product_id">Product ID</label>
                    <input type="text" name="product_id" id="product_id" required
                    value={product.product_id} onChange={onHandleChageInput} disabled={onEdit}/>
                </div>
                <div className="row">
                    <label htmlFor="title">Title</label>
                    <input type="text" name="title" id="title" required
                    value={product.title} onChange={onHandleChageInput}/>
                </div>
                <div className="row">
                    <label htmlFor="price">Price</label>
                    <input type="number" name="price" id="price" required
                    value={product.price} onChange={onHandleChageInput}/>
                </div>
                <div className="row">
                    <label htmlFor="description">Title</label>
                    <textarea type="text" name="description" id="description" required
                    value={product.description} rows="5" onChange={onHandleChageInput}/>
                </div>
                <div className="row">
                    <label htmlFor="content">Content</label>
                    <textarea type="text" name="content" id="content" required
                    value={product.content} rows="7" onChange={onHandleChageInput}/>
                </div>
                <div className="row">
                    <label htmlFor="categories">Categories: </label>
                    <select name="category" value={product.category} onChange={onHandleChageInput}>
                        <option value="">Please select a category</option>
                        {
                            categories.map(category=>(
                                <option value={category._id} key={category._id}>
                                    {category.name}
                                </option>
                            ))
                        }
                    </select>
                </div>
                <button type="submit">{onEdit?'Update':'Create'}</button>
            </form>
        </div>
    )
}
