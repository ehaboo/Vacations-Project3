import express, { Request, Response, NextFunction } from "express";
import vacationService from "../5-services/vacation-service";
import VacationModel from "../2-models/vacation-model";
import fileHandler from "../4-utils/file-handler";
import verifyAdmin from "../3-middleware/verify-admin";
import verifyLoggedIn from "../3-middleware/verify-logged-in";


const router = express.Router();

router.get("/",verifyLoggedIn, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const vacations = await vacationService.getVacations();
        response.json(vacations);
    } catch (error) {
        next(error)
    }
});

router.get("/:id([0-9]+)",verifyLoggedIn, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const id = +request.params.id;
        const vacation = await vacationService.getOneVacation(id);
        response.json(vacation);
    } catch (error) {
        next(error)
    }
});

router.post("/", verifyAdmin, async (request: Request, response: Response, next: NextFunction) => {
    try {
        request.body.image = request.files?.image;
        const vacation = new VacationModel(request.body);
        const addedVacation = await vacationService.addVacation(vacation);
        response.status(201).json(addedVacation);
    } catch (err: any) {
        next(err);
    }
});

router.put("/:id([0-9]+)", verifyAdmin, async (request: Request, response: Response, next: NextFunction) => {
    try {
        request.body.vacationId = +request.params.id;
        request.body.image = request.files?.image;

        const vacation = new VacationModel(request.body);
        const updatedVacation = await vacationService.updateVacation(vacation);
        response.json(updatedVacation);
    } catch (err: any) {
        next(err);
    }
});

router.delete("/:id([0-9]+)", verifyAdmin, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const id = +request.params.id;
        await vacationService.deleteVacation(id);
        response.sendStatus(204);
    } catch (err: any) {
        next(err);
    }
});

router.get("/images/:imageName", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const imageName = request.params.imageName;
        const imagePath = fileHandler.getImagePath(imageName);
        response.sendFile(imagePath);
    } catch (err: any) {
        next(err);
    }
});


export default router; 