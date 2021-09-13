import axios from 'axios'
import {useState,useContext} from 'react'
import { GlobalState } from '../../../globalState'

export default function Categories() {
    const state= useContext(GlobalState)
    const [categories] = state.CategoriesAPI.categories
    const [token] = state.token
    const [category, setcategory] = useState('')
    const [callBack, setcallBack] = state.CategoriesAPI.callBack
    const [onEdit, setonEdit] = useState(false)
    const [id, setId] = useState('')
    const createCategory = async e => {
        e.preventDefault()
        try {
            if(onEdit){
                const res = await axios.put(`/api/category/${id}`,{name: category},{
                    headers: {Authorization: token}
                })
                alert(res.data.msg)
            }else{
                const res = await axios.post('/api/category',{name: category},{
                    headers: {Authorization: token}
                })
                alert(res.data.msg)
            }
            setonEdit(false)
            setcategory('')
            setcallBack(!callBack)
        } catch (err) {
            alert(err.response.data.msg)
        }
    }
    const editCategory = async (id,name) => {
        setId(id)
        setcategory(name)
        setonEdit(true)
    }
    const deleteCategory = async (id) => {
        try {
            const res = await axios.delete(`/api/category/${id}`,{
                headers: {Authorization: token}
            })
            alert(res.data.msg)
            setcallBack(!callBack)
        } catch (err) {
            alert(err.response.data.msg)
        }
    }
    return (
        <div className="categories">
            <form onSubmit={createCategory}>
                <label htmlFor="category">Category</label>
                <input type="text" name="category" value={category} required
                onChange={e => setcategory(e.target.value)}/>
                <button type="submit">{onEdit?"Update":"Create"}</button>
            </form>
            <div className="col">
                {
                    categories.map(category =>(
                        <div className="row" key={category._id}>
                            <p>{category.name}</p>
                            <div>
                                <button onClick={() => editCategory(category._id,category.name)}>
                                    Edit
                                </button>
                                <button onClick={()=> deleteCategory(category._id)}>
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
