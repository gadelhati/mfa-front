export interface Search {
    key: string,
    value: string,
    order: 'ASC' | 'DESC',
    page: number,
    size: number,
}
export const intialSearch: Search = {
    key: 'id',
    value: '',
    order: 'ASC',
    page: 0,
    size: 5,
}