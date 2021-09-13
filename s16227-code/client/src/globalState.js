import axios from 'axios'
import React , {createContext , useState, useEffect} from 'react'
import ProductAPI from './api/ProductAPI'
import UserAPI from './api/UserAPI'
import CategoriesAPI from './api/CategoriesAPI'

export const GlobalState = createContext()

export const DataProvider = ({children}) => {
    const [token, settoken] = useState(false)

    useEffect(()=>{
        const FirstLogin = localStorage.getItem('FirstLogin')
        if(FirstLogin){
            const refreshToken = async () => {
                const res = await axios.get('/user/refresh_token')
                settoken(res.data.accessToken)
    
                setTimeout(()=>{
                    refreshToken()
                },10*60*1000)
            }
             refreshToken()
        }
    },[])
    const state = {
        token: [token,settoken],
        ProductAPI: ProductAPI(),
        UserAPI: UserAPI(token),
        CategoriesAPI: CategoriesAPI()
    }

    return(
        <GlobalState.Provider value={state}>
            {children}
        </GlobalState.Provider>
    )
}