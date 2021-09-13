import axios from 'axios'
import {useState,useEffect} from 'react'

export default function ProductAPI() {
    const [products,setProducts] = useState([])
    const [callBack,setcallBack] = useState(false)
    const [category,setCategory] = useState('')
    const [sort, setSort] = useState('')
    const [search, setSearch] = useState('')
    const [page, setPage] = useState(1)
    const [result, setResult] = useState(0)
    useEffect(() => {
        const getProduct = async () => {
            const res = await axios.get(`/api/products?limit=${page*9}&${category}&${sort}&title[regex]=${search}`)
            setProducts(res.data.products)
            setResult(res.data.result)
        }
        getProduct()
    },[callBack,category,page,sort,search])

    return {
        products: [products,setProducts],
        callBack: [callBack,setcallBack],
        category: [category,setCategory],
        sort:[sort,setSort],
        search:[search,setSearch],
        page:[page,setPage],
        result:[result,setResult]
    }
}
