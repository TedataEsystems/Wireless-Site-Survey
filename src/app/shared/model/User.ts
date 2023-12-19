export interface user{
    id : number,
    email : string,
}
export interface resetUserPass{
    username:string,
    oldPasword:string,
    newPasword:string
}