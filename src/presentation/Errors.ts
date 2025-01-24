export class RequiredValidateError extends Error{
    public constructor(message: string){
        super(message);
    }
}

export type ErrorResponse = {
    message: string;
    errorType: string;
}