import axios from 'axios'
import {useState,useEffect} from 'react'

export default function CategoriesAPI() {
    const [categories, setcategories] = useState([])
    const [callBack, setcallBack] = useState(false)

    useEffect(()=>{
        const getCategories = async() => {
            const res = await axios.get("/api/category")
            setcategories(res.data)
        }
        getCategories()
    },[callBack])
    return {
        categories: [categories,setcategories],
        callBack: [callBack, setcallBack]
    }
}
