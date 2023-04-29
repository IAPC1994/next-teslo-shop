

export interface IUser {
    _id: string;
    name: string;
    lastName: string;
    email: string;
    password?: string;
    role: string;

    createAt?:string;
    updatedAt?: string;
}