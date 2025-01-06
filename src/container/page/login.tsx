import { ChangeEvent, KeyboardEvent, useState } from 'react'
import { initialUser, initialUserAuth, User, UserAuth } from '../../component/user'
import { login } from '../../service/service.crud'
import '../template/input.css'
import './login.css'

export const Login = () => {
    const [mode, setMode] = useState<boolean>(true)
    const [user, setUser] = useState<User>(initialUser)
    const [userAuth, setUserAuth] = useState<UserAuth>(initialUserAuth)

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
        setUser({ ...user, [event.target.name]: value })
    }
    const handleInputChangeAuth = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
        setUserAuth({ ...userAuth, [event.target.name]: value })
    }
    const loginUser = async () => {
        await login('user/login', userAuth).then((data) => {
            // startTransition(() => validItem(data))
            console.log(data)
        }).catch((error) => { /*setError(error)*/ })
    }
    const submit = (event: KeyboardEvent<HTMLInputElement>) => {
        if(event.key === 'Enter') {
            loginUser()
        }
    }
    return (
        <div className='wrapper' onKeyDown={submit}>
            <button onClick={()=>setMode(true)} disabled={mode}>Sign</button>
            <button onClick={()=>setMode(false)} disabled={!mode}>Signup</button>
            <div className={mode?`card content`:`card content change`}>
                <div className='card front container'>
                    <input onChange={handleInputChangeAuth} type='text' name='username' id='username' placeholder='username' />
                    <input onChange={handleInputChangeAuth} type='password' name='password' id='password' placeholder='*' />
                    <input onChange={handleInputChangeAuth} type='text' name='totpKey' id='totpKey' placeholder='6 dígitos' />
                </div>
                <div className='card back container'>
                    <input onChange={handleInputChange} type='text' name='username' id='username' placeholder='username' />
                    <input onChange={handleInputChange} type='password' name='password' id='password' placeholder='*' />
                    <input onChange={handleInputChange} type='text' name='email' id='email' placeholder='email' />
                </div>
            </div>
            <button className="primary" onClick={loginUser}>button</button>
            <div>user auth: {JSON.stringify(userAuth)}</div>
            <div>user: {JSON.stringify(user)}</div>
        </div>
    )
}