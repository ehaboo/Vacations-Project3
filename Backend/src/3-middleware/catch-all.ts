import { NextFunction, Request, Response } from "express";
import appConfig from "../4-utils/app-config";
import logger from "../4-utils/logger";

function catchAll( err:any, request: Request, response: Response, next: NextFunction ){ 
    console.log(err);
    const status = err.status || 500; 

    let msg = err.message;
    
    if( status >= 500 ){
        logger.errorsLogger( err.message, err );
        msg = "Bad Connections ...";
    }
    


    response.status(status).send(msg);
}

export default catchAll;