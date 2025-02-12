import { useRef, useState } from "react"
import { Search } from "../../component/search"
// import { Page } from "../../component/page"
import Modal, { ModalData } from "./Modal"
import { Pageable } from "../../component/pageable"
import './table.css'
import { GButton } from "./button"
import { GInput } from "./input"

interface Data<T extends Object, S extends Object> {
    object: T,
    validation: S,
    list: T[],
    search: Search,
    pageable: Pageable,
    // pageable: Page,
    url: string,
    function?: any,
    another?: any
}

export const DataTable = <T extends Object, S extends Object>(data: Data<T, S>) => {
    const [state, setState] = useState(data.object)
    const modalRef = useRef<ModalData>(null)

    const showType = (content: any) => {
        if(content === null) {
            return 'null'
        }
        if(typeof content.getMonth === 'function') {
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
            <Modal object={state} validation={data.validation} ref={modalRef} url={data.url} />
            <table>
                <thead>
                    <tr>
                        <td>{data.search.key}</td>
                        <td><GInput name={'value'} onChange={data.function}></GInput></td>
                    </tr>
                    <tr key={Math.random()} >
                        {data.list[0] !== undefined &&
                            Object.keys(data.list[0]).map((column: string) => {
                                return <>
                                    <th key={column} data-name={'key'} data-value={column} onClick={data.another}>
                                        <input type="radio" name={'order'} value={data.search.order === 'ASC' ? 'DESC' : 'ASC'} onChange={data.function} />{column}{column === data.search.key ? (data.search.order === 'ASC' ? '↑' : '↓') : ''}
                                    </th>
                                </>
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
                        <td>
                        <select name={'size'} onChange={data.function} value={data.search.size}>
                            <option value={'5'}>5</option>
                            <option value={'15'}>15</option>
                            <option value={'25'}>25</option>
                            <option value={'50'}>50</option>
                            <option value={'100'}>100</option>
                        </select>
                        </td>
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