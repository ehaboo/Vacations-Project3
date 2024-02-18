import mysql from "mysql";
import appConfig from "./app-config";

const connection = mysql.createPool({
    host: appConfig.mySqlHost,
    database: appConfig.mySqlDataBase,
    user: appConfig.mySqlUser,
    password: appConfig.mySqlPassword
});

function execute(sql: string, values?: any[]): Promise<any> {
    return new Promise((resolve, reject) => {
        connection.query(sql, values, (err:any, result:any) => {
            if (err) {
                reject(err);
            }
            resolve(result);
        })
    });
}

export default {execute}




