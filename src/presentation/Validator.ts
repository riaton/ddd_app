import { Request } from "express";
import { RequiredValidateError } from "./Errors";

export function notEmptyCheck<T extends Request>(obj: T): void{
    if(obj.body === null || obj.body === undefined){
        throw new RequiredValidateError("request body is empty");
    }

    for(const key in obj.body){
        if(obj.body[key] === null || obj.body[key] === undefined){
            throw new RequiredValidateError(`key: ${key} in the request body is empty`);
        }
    }
}