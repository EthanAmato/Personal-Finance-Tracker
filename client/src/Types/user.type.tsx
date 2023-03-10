export default interface IUser {
    id?: any | null,
    username?: string | null,
    email?: string,
    password?: string,
    balance?: number,
    roles?: Array<string>
}