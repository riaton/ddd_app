export class DBTransactionError extends Error{
    public constructor(message: string){
        super(message);
    }
}

export class GCPApiError extends Error{
    public constructor(message: string){
        super(message);
    }
}