export type User ={
    userId:string,
    email:string,
    password:string,
    nome:string,
    role:userRole
}

export enum userRole{
    ADMIN ="ADMIN",
    USER ="USER"
}