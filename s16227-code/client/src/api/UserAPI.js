import axios from 'axios'
import {useState,useEffect} from 'react'

export default function UserAPI(token) {
    const [isLogged, setisLogged] = useState(false)
    const [isAdmin, setisAdmin] = useState(false)
    const [cart, setcart] = useState([])
    const [history, setHistory] = useState([])

    useEffect(() => {
        if(token){
            const getUser = async () => {
                try {
                    const res = await axios.get('/user/infor',{
                        headers: {Authorization: token}
                    })
                    setisLogged(true)
                    res.data.role === 1 ? setisAdmin(true) : setisAdmin(false)
                    setcart(res.data.cart)
                } catch (err) {
                    alert(err.response.data.msg)
                }
            }

            getUser() 
        }
    },[token])
 
    const addCart = async (product) => {
        if(!isLogged) return alert("Please login to continue shopping in ShopChop")

        const check = cart.every(item => {
            return item._id !== product._id
        })

        if(check){
            setcart([...cart,{...product,quantity: 1}])
            await axios.patch('/user/addcart',{cart:[...cart,{...product,quantity: 1}]},{
                headers: {Authorization: token}
            })
        }else{
            alert("This product has been added to the cart.")
        }
    }
    return {
        isLogged : [isLogged, setisLogged],
        isAdmin : [isAdmin, setisAdmin],
        cart: [cart,setcart],
        addCart: addCart,
        history: [history, setHistory],
    }
}
