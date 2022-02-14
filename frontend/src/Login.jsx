import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router'

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState({});
    const history = useHistory();

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            await axios.get('http://app.prepend.test/sanctum/csrf-cookie')
            await axios.post('http://app.prepend.test/login', {email, password})
            const { data } = await axios.get('http://app.prepend.test/api/user')
            setUser(data)
            await localStorage.setItem('user', JSON.stringify(data))
            await history.push('/')
            window.location.reload()
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {

    })

    return (
        <div className='container'>
        <div className='row auto'>
            <h1 className='mt-5 text-center'>Login</h1>
            <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input 
                    className="form-control" 
                    id="email" 
                    name="email"
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                />
                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input 
                    className="form-control" 
                    id="password" 
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                />
            </div>
            <div className="mb-3 form-check">
                <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
        </div>
    );
}
 
export default Login;