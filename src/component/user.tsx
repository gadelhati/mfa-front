import { initialRole, Role } from './role'

export interface User {
	readonly id: string,
	username: string,
	email: string,
    password: string,
	active: boolean,
	role: Role[]
}
export interface UserValidation {
	readonly id: string,
	username: string,
	email: string,
    password: string,
	active: string,
	role: string,
}
export const initialUserValidation: UserValidation = {
	id: `^[a-zA-Z0-9]+$`,
	username: `^[a-zA-Z0-9]+$`,
	email: `^[a-zA-Z0-9]+$`,
	password: `^[a-zA-Z0-9]+$`,
	active: `^[a-zA-Z0-9]+$`,
	role: `^[a-zA-Z0-9]+$`
}
export const initialUser: User = {
	id: '',
	username: '',
	email: '',
	password: '',
	active: true,
	role: [initialRole]
}

export interface UserAuth {
	username: string,
    password: string,
	totpKey: string,
}
export interface UserAuthValidation {
	username: string,
    password: string,
	totpKey: string,
}
export const initialUserAuth: UserAuth = {
	username: '',
	password: '',
	totpKey: '',
}