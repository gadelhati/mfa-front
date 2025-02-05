import { useRef, useState } from "react"
import { Search } from "../../component/search"
import { Page } from "../../component/page"
import Modal, { ModalData } from "./Modal"
// import { Pageable } from "../component/pageable"
import './table.css'
import { GButton } from "./button"
import { GInput } from "./input"

interface Data<T extends Object> {
    object: T,
    list: T[],
    search: Search,
    // pageable: Pageable,
    pageable: Page,
    url: string,
    function?: any,
    another?: any
}

export const DataTable = <T extends Object>(data: Data<T>) => {
    const [state, setState] = useState(data.object)
    const modalRef = useRef<ModalData>(null)

    const showType = (content: any) => {
        if(content === null){
            return 'null'
        }
        if(typeof content.getMonth === 'function'){
            return 'date'
        }
        switch (typeof content) {
            case 'boolean': {
                return content ? 'true' : 'false'
            }
            case 'number': {
                return content
            }
            case 'string': {
                return content
            }
            // number, undefined, typeof value.getMonth === 'function'
            // case 'function' : {
            //     return new Date(content)
            // }
            case 'object': {
                return Array.isArray(content) ? content[0].name : content.name
            }
            default: { return null }
        }
    }
    const newItem = () => {
        show(data.object)
    }
    const show = (row: T) => {
        setState(row)
        if(modalRef.current) {
            modalRef.current.showModal()
        }
    }
    return (
        <>
        <GButton onClick={newItem}>New</GButton>
        {/* <GInput name={'key'} onChange={data.function} value={data.search.key}></GInput> */}
        <GInput name={'value'} onChange={data.function} value={data.search.value}></GInput>
        <select name={'order'} onChange={data.function} value={data.search.order}>
            <option value={'ASC'}>ASC</option>
            <option value={'DESC'}>DESC</option>
        </select>
        <Modal object={state} ref={modalRef} url={data.url} />
        <table>
            <thead>
                {/* <tr>
                <GInput name={'page'} onChange={data.function}></GInput>
                <GInput name={'value'} onChange={data.function}></GInput>
                </tr> */}
                <tr key={Math.random()} >
                    {data.list[0] !== undefined &&
                        Object.keys(data.list[0]).map((column: string) => {
                            return <th key={column} data-name={'key'} data-value={column} onClick={data.another}>{column}{column === data.search.key ? (data.search.order === 'ASC' ? '↑' : '↓') : ''}</th>
                        })
                    }
                </tr>
            </thead>
            <tbody>
                {data.list.map((row: T) => {
                    return <tr key={Math.random()} onClick={() => show(row)}>{Object.values(row).map((column: any) => {
                        return <td key={Math.random()} >{showType(column)}</td>
                    })}</tr>
                })}
            </tbody>
            <tfoot>
                {/* <tr key={Math.random()} >Total Elements: {data.pageable.totalElements}</tr> */}
                {/* <tr key={Math.random()} >Total Elements: {data.pageable.page.totalElements}</tr> */}
            </tfoot>
        </table>
        </>
    )
}