import { useCallback, useEffect, useState } from "react"
import { api } from "../api/api"
import { initialPage, Page } from "../../component/page"
import { ErrorMessage } from "../error/errorMessage"
import { initialErrorMessage } from "../error/errorMessage.initial"
// import { initialPageable, Pageable } from "../../component/pageable"

export const useRequest = <T extends Object>(url: string, value?: string, page?: number, size?: number, sort?: { key?: string, order?: string }) => {
    const [states, setStates] = useState<T[]>([])
    // const [pageable, setPageable] = useState<Pageable>(initialPageable)
    const [pageable, setPageable] = useState<Page>(initialPage)
    const [error, setError] = useState<ErrorMessage[]>([initialErrorMessage])

    useEffect(() => {
        const controller = new AbortController();
        retrieve(url, controller.signal);
        return (() => {
            controller.abort()
        })
    }, [url, value, page, size, sort])
    const retrieve = useCallback( async (uri: string, signal?: AbortSignal) => {
        await api.get<{ content: T[]; page: Page }>(`/${uri}${value ? `?value=${value}` : ""}`,
            {
                params: {
                    page,
                    size,
                    sort: sort ? `${sort.key},${sort.order}` : undefined,
                },
                signal,
            }
        ).then((response: any) => {
            setStates(response.data.content)
            setPageable(response.data.page)
        }).catch((error) => {
            if (!signal?.aborted) {
                setError([{message: error}])
            }
            throw error;
        });
    }, [value, page, size, sort])
    return { states, pageable, error, retrieve }
}