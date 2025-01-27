import { UriToScreenFormat } from '../../assets/uri.format'
import { getPayload } from '../../service/service.token'
// import { Button } from '../template/button/button'
import '../template/header.css'
import '../template/inputgroup.css'
import { GButton } from './button'

interface IHeader {
    title: string,
    function?: any,
}

export const Header = (header: IHeader) => {
    return (
        <header className='header'>
            {/* {vector.find((element)=> element.includes(header.title)) && <Button category={'primary'} function={header.function} name={'New'}/>} */}
            <div>
                {!header.title.toLowerCase().includes('home') && !header.title.toLowerCase().includes('perfil') &&
                    // <Button category={'primary'} function={header.function} name={'New'}/>
                    <GButton onClick={header.function} name={'New'}/>
                }
                <h1>{UriToScreenFormat(header.title)}</h1>
            </div>
            <a href={`#/${'profile'}`}><GButton name={getPayload().sub} /></a>
        </header>
    )
}