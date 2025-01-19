import { ChangeEvent, KeyboardEvent, useState } from 'react'
import { initialUser, initialUserAuth, User, UserAuth } from '../../component/user'
import { login } from '../../service/service.crud'
import { GInput } from '../template/input'
import './login.css'

export const Login = () => {
    const [mode, setMode] = useState<boolean>(true)
    const [remember, setRemember] = useState<boolean>(true)
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
        await login('auth/login', userAuth).then((data) => {
            // startTransition(() => validItem(data))
            console.log(data)
        }).catch((/*error*/) => { /*setError(error)*/ })
    }
    const submit = (event: KeyboardEvent<HTMLInputElement>) => {
        if(event.key === 'Enter') {
            playSound()
            loginUser()
        }
    }
    const playSound = () => {
        let audio = new Audio("/assets/sound/click_sound.mp3")
        audio.play()
    }
    return (
        <div className='wrapper' onKeyDown={submit}>
            <div className={mode?`card content`:`card content change`}>
                <div className='card front'>
                    {/* <button onClick={()=>setMode(false)} disabled={!mode}>Signup</button> */}
                    <h3 className='sign'>Signin</h3>
                    <GInput onChange={handleInputChangeAuth} name='username'></GInput>
                    <GInput onChange={handleInputChangeAuth} type="password" name='password'></GInput>
                    <GInput onChange={handleInputChangeAuth} name='totpKey'></GInput>
                    <footer>
                        <div>
                            <input type="checkbox" id="remember" name="remember" checked={remember} onChange={()=>setRemember(!remember)} />
                            <label htmlFor="remember">Remember me</label>
                        </div>
                        <a href='#'><label>forgot password</label></a>
                    </footer>
                    <button onClick={loginUser}>button</button>
                </div>
                <div className='card back'>
                    <h2 className='sign'>Signup</h2>
                    <button onClick={()=>setMode(true)} disabled={mode}>Sign</button>
                    <GInput onChange={handleInputChange} name='username'></GInput>
                    <GInput onChange={handleInputChange} type="password" name='password'></GInput>
                    <GInput onChange={handleInputChange} name='email'></GInput>
                </div>
            </div>
        </div>
    )
}