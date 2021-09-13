import axios from 'axios'
import React,{useContext,useEffect} from 'react'
import { Link } from 'react-router-dom'
import { GlobalState } from '../../../globalState'


export default function History() {
    const state = useContext(GlobalState)
    const [history, sethistory] = state.UserAPI.history
    const [token]=state.token
    const [isAdmin]=state.UserAPI.isAdmin

    useEffect(() => {
        if(token){
            const getHistory = async () => {
                if(isAdmin){
                    const res = await axios.get('/api/payment',{
                        headers: {Authorization : token}
                    })
                    sethistory(res.data)
                }else{
                const res = await axios.get('/user/history',{
                    headers: {Authorization : token}
                })
                sethistory(res.data)
            }
        }
        getHistory()
        }
    },[token,isAdmin,sethistory])

    return (
        <div className="history-page">
            <h2>History</h2>
            <h4>You have {history.length} orders</h4>
                <table>
                    <thead>
                        <tr>
                            <th>Payment ID</th>
                            <th>Date of Purchase</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            history.map(items => (
                                <tr key={items._id}>
                                    <td>{items.paymentID}</td>
                                    <td>{new Date(items.createdAt).toLocaleDateString()}</td>
                                    <td><Link to={`/history/${items._id}`}>View</Link></td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
        </div>
    )
}
