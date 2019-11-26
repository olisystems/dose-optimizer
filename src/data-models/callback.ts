
export interface IResponseObject {

    status: number;
    data: object;
}

export interface IResponseCallback {
    
    ( responseCallback: IResponseObject ) : void;
}