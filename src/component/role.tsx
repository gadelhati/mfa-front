export interface Role {
    readonly id: string,
    name: string,
}
export interface RoleValidation {
    readonly id: string,
    name: string,
}
export const initialRoleValidation: RoleValidation = {
    id: `^[a-zA-Z0-9]+$`,
    name: `^[0-9]+$`,
}
export const initialRole: Role = {
    id: '',
    name: '',
}