import { IHTTPException } from "../../interface/IHTTPException.interface"

export class HTTPException implements IHTTPException{
    constructor(public status:number,public message:string,public errors?:any){
        this.status=status
        this.message=message
        this.errors = errors||{}
    }
}