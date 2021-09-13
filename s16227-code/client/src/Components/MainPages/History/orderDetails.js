import React,{useState,useEffect,useContext} from 'react'
import { useParams } from 'react-router-dom'
import { GlobalState } from '../../../globalState'


export default function OrderDetails() {
    const params = useParams()
    const state = useContext(GlobalState)
    const [history] = state.UserAPI.history
    const [orderDetail, setorderDetail] = useState([])

    useEffect(()=> {
        if(params.id){
            history.forEach(item => {
                if(item._id===params.id) setorderDetail(item)
            });
        }
    },[params.id,history])

    if(orderDetail.length === 0) return null;
    return (
        <div className="history-page">
            <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Address</th>
                            <th>Postal Code</th>
                            <th>Country code</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{orderDetail.address.recipient_name}</td>
                            <td>{orderDetail.address.line1+" - "+orderDetail.address.city}</td>
                            <td>{orderDetail.address.postal_code}</td>
                            <td>{orderDetail.address.country_code}</td>
                        </tr>
                    </tbody>
                </table>
                <table style={{margin:"30px 0px"}}>
                    <thead>
                        <tr>
                            <th></th>
                            <th>Products</th>
                            <th>Quantity</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orderDetail.cart.map(item =>(
                            <tr key={item._id}>
                                <td><img src={item.images.url} alt="" /></td>
                                <td>{item.title}</td>
                                <td>{item.quantity}</td>
                                <td>{item.price*item.quantity}</td>
                            </tr>
                            ))
                        }
                    </tbody>
                </table>
        </div>
    )
}
