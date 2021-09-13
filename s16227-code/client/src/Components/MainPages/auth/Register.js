import axios from 'axios'
import {useState} from 'react'
import { Link } from 'react-router-dom'

export default function Register() {
    const [user, setuser] = useState({
        name:'',email:'',password:''
    })

    const onChangeInput = e => {
        const {name,value} = e.target;
        setuser({...user,[name]:value})
    }

    const regSubmit = async e => {
        e.preventDefault()
        try {
            await axios.post("/user/register",{...user})
         localStorage.setItem("FirstLogin",true)
            window.location.href="/"

        } catch (err) {
            alert(err.response.data.msg)
        }
    }
    return (
        <div className="login-page">
            <form onSubmit={regSubmit}>
                <h2>Register</h2>
                <input type="text" name="name" required placeholder="Name" value={user.name} onChange={onChangeInput}/>
                <input type="email" name="email" required placeholder="Email" value={user.email} onChange={onChangeInput}/>
                <input type="password" name="password" required autoComplete="on" placeholder="Password" value={user.password} onChange={onChangeInput}/>

                <div className="row">
                    <button type="submit">Register</button>
                    <Link to="/login">Login</Link>
                </div>
            </form>
        </div>
    )
}
