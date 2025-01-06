import { initialRole, Role } from './role'

export interface User {
	readonly id: string,
	username: string,
	email: string,
    password: string,
	active: boolean,
	role: Role[]
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
export const initialUserAuth: UserAuth = {
	username: '',
	password: '',
	totpKey: '',
}