import { useEffect, useState } from "react"
import { useRequest } from "../../assets/hook/useRequest"
import { intialSearch, Search } from "../../component/search"
import { DataTable } from "./DataTable";
import { useInput } from "../../assets/hook/useInput";
import { ErrorMessage } from "../../assets/error/errorMessage";
import { initialErrorMessage } from "../../assets/error/errorMessage.initial";
import '../template/inputgroup.css'

interface Data<T extends Object> {
    object: T,
    url: string,
}

export const GenericComponent = <T extends Object>(object: Data<T>) => {
    // const [isInterface] = useIsInterface<T, User>(initialRole, initialUser)
    const { state: search, handleInput: handleSearch, handleElement } = useInput<Search>(intialSearch)
    const { states, pageable, retrieve } = useRequest<T>(object.url, search.value, search.page, search.size, { key: search.key, order: search.order })
    const [ , setError ] = useState<ErrorMessage[]>([initialErrorMessage])

    useEffect(() => {
        const controller = new AbortController();
        retrieve(object.url, controller.signal).catch((error)=>{
            if (!controller.signal.aborted) {
                setError([{message: error}])
            }
        })
        return (() => {
            controller.abort()
        })
    }, [search])
    return (
        <>
            {/* {Object.keys(intialSearch).map((key) => {
                const value = search[key as keyof Search]
                return <span key={key} className={'inputgroup tooltip'} data-tip={[]} style={{ display: 'flex' }}>
                    <input type={typeof value} name={key} value={value} onChange={handleSearch} placeholder={key} ></input>
                    <label htmlFor={key}>{key}</label>
                </span>
            })} */}
            {/* {error && <div className="error-message">{JSON.stringify(error[0].message)}</div>} */}
            <DataTable object={object.object} list={states} pageable={pageable} search={search} url={object.url} function={handleSearch} another={handleElement} />
        </>
    )
}