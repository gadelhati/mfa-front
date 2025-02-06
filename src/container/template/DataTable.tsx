import { useRef, useState } from "react"
import { Search } from "../../component/search"
// import { Page } from "../../component/page"
import Modal, { ModalData } from "./Modal"
import { Pageable } from "../../component/pageable"
import './table.css'
import { GButton } from "./button"
import { GInput } from "./input"

interface Data<T extends Object> {
    object: T,
    list: T[],
    search: Search,
    pageable: Pageable,
    // pageable: Page,
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
    const fofo = () => {
        console.log("fofo 1")
    }
    return (
        <>
        <GButton onClick={newItem}>New</GButton>
        <select name={'order'} onChange={data.function} value={data.search.order}>
            <option value={'ASC'}>ASC</option>
            <option value={'DESC'}>DESC</option>
        </select>
        <Modal object={state} ref={modalRef} url={data.url} />
        <table>
            <thead>
                <tr>
                    <td>{data.search.key}</td>
                    <td><GInput name={'value'} onChange={data.function}></GInput></td>
                </tr>
                <tr key={Math.random()} >
                    {data.list[0] !== undefined &&
                        Object.keys(data.list[0]).map((column: string) => {
                            return <th key={column} data-name={'key'} data-value={column} onClick={data.another}>{column}{column === data.search.key ? (data.search.order === 'ASC' ? '↑' : '↓') : ''}</th>
                            // return <th key={column} ><input type="checkbox" name={'key'} value={column} onClick={fofo} onChange={data.another}></input>{column}{column === data.search.key ? (data.search.order === 'ASC' ? '↑' : '↓') : ''}</th>
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
                <tr>
                    <td><GButton name={'page'} onClick={data.function} value={0} disabled={data.search.page <= 0}>{"<<"}</GButton></td>
                    <td>{data.search.page > 0 &&
                        <GButton name={'page'} onClick={data.function} value={Number(data.search.page) - 1}>{Number(data.search.page)}</GButton>
                    }</td>
                    <td><GButton name={'page'} onClick={data.function} value={data.search.page}>{Number(data.search.page) + 1}</GButton></td>
                    <td>{data.search.page < data?.pageable?.totalPages - 1 &&
                        <GButton name={'page'} onClick={data.function} value={Number(data.search.page) + 1}>{Number(data.search.page) + 2}</GButton>
                    }</td>
                    <td><GButton
                        name={'page'}
                        onClick={data.function}
                        value={Number(data?.pageable?.totalPages) - 1}
                        disabled={data.search.page >= data?.pageable?.totalPages - 1}>
                            {">>"}
                    </GButton></td>
                </tr>
                <tr key={'totalPages'} ><td>Total Elements: {data.pageable.totalElements}</td></tr>
            </tfoot>
        </table>
        </>
    )
}