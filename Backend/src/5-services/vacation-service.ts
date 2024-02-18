import { OkPacket } from "mysql";
import { ResourceNotFoundError } from "../2-models/client-errors";
import VacationModel from "../2-models/vacation-model";
import dal from "../4-utils/dal";
import fileHandler from "../4-utils/file-handler"
import appConfig from "../4-utils/app-config";


async function getVacations(): Promise<VacationModel[]> {
    const sql = `SELECT 
                vacationId,
                destination,
                description, 
                DATE_FORMAT(startDate,'%Y-%m-%d') AS startDate, 
                DATE_FORMAT(endDate,'%Y-%m-%d') AS endDate, 
                price, 
                imageName, 
                CONCAT('${appConfig.imagesUrl}', imageName) AS imageUrl  
                FROM vacations 
                ORDER BY startDate ASC`;
    const vacations = await dal.execute(sql);

    return vacations;
}

async function getOneVacation(id: number): Promise<VacationModel> {
    const sql = `SELECT 
                vacationId,
                destination,
                description, 
                DATE_FORMAT(startDate,'%Y-%m-%d') AS startDate, 
                DATE_FORMAT(endDate,'%Y-%m-%d') AS endDate, 
                price, 
                imageName, 
                CONCAT('${appConfig.imagesUrl}', imageName) AS imageUrl  
                FROM vacations
                WHERE vacationId  = ?`;

    const vacations = await dal.execute(sql, [id]);
    const vacation = vacations[0];
    if (!vacation) throw new ResourceNotFoundError(id);

    return vacation;
}

async function addVacation(vacation: VacationModel): Promise<VacationModel> {
    vacation.validate();

    let imageName = null;

    if (vacation.image) {
        imageName = await fileHandler.saveImage(vacation.image);
        vacation.imageUrl = appConfig.imagesUrl + imageName;
    }

    const sql = `INSERT INTO vacations VALUES(DEFAULT, ?, ?, ?, ?, ?, ? )`;
    const result: OkPacket = await dal.execute(sql, [vacation.destination, vacation.description, vacation.startDate,
    vacation.endDate, vacation.price, imageName]);
    vacation.vacationId = result.insertId;
    delete vacation.image;

    return vacation;
};

async function updateVacation(vacation: VacationModel): Promise<VacationModel> {
    vacation.validate();

    let imageName = await getVacationImageName(vacation.vacationId);

    if (vacation.image) {
        imageName = await fileHandler.updateImage(vacation.image, imageName);
        vacation.imageUrl = appConfig.imagesUrl + imageName;
    }

    const sql = `UPDATE vacations SET  
                    destination = ?,
                    description = ?,
                    startDate = ?,
                    endDate = ?,
                    price = ?,
                    imageName = ?
                    WHERE vacationId = ?`;

    const result: OkPacket = await dal.execute(sql, [vacation.destination, vacation.description, vacation.startDate,
    vacation.endDate, vacation.price, imageName, vacation.vacationId]);
    if (result.affectedRows === 0) throw new ResourceNotFoundError(vacation.vacationId);
    delete vacation.image;

    return vacation;
};


async function deleteVacation(id: number): Promise<void> {
    const imageName = await getVacationImageName(id);

    const sql = `DELETE FROM vacations WHERE vacationId = ? `;
    const result: OkPacket = await dal.execute(sql, [id]);
    if (result.affectedRows === 0) throw new ResourceNotFoundError(id);

    await fileHandler.deleteImage(imageName);
};

async function getVacationImageName(id: number): Promise<string> {
    const sql = `SELECT imageName FROM vacations WHERE vacationId = ?`;
    const vacations = await dal.execute(sql, [id]);
    const vacation = vacations[0];
    if (!vacation) throw new ResourceNotFoundError(id);
    const imageName = vacation.imageName;

    return imageName;
}

export default {
    getVacations,
    getOneVacation,
    addVacation,
    updateVacation,
    deleteVacation
}