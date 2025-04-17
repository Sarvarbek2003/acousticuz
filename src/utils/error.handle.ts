export class ClientError extends Error {
    statusCode: number;
    error: any;
    status: string;
    isOperational: boolean;
    constructor(message:string, statusCode:number, error?: any) {
        super(message);
        this.statusCode = statusCode;
        this.error = error
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
        this.isOperational = true;
        Error.captureStackTrace(this, this.constructor);
    }
}