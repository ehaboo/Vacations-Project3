import axios from "axios";
import VacationModel from "../Models/VacationModel";
import { store } from "../Redux/Store";
import appConfig from "../Utils/Config";
import { getVacations, addVacation, updateVacation, deleteVacation } from "../Redux/VacationsSlice"
import { jwtDecode } from "jwt-decode";
import UserModel from "../Models/UserModel";
import followsService from "./FollowsService";


class VacationsService {
    public async getAllVacations(): Promise<VacationModel[]> {
        let vacations = store.getState().vacations.vacationsList;
        
        if (!vacations.length) {
            const response = await axios.get<VacationModel[]>(appConfig.vacationsUrl);
            vacations = response.data;
            const container:{user:UserModel} = jwtDecode(localStorage.getItem("token"))
            const followedByUser = await followsService.vacationsFollowedByUser(container.user?.userId);
            const vIdFollowedByUser = followedByUser.map(f => f.vacationId);
            const vacationsArr = vacations.map(vacation => {
                let vac = { ...vacation };
                vac.isLiked = false;
                for (const i of vIdFollowedByUser) {
                    if (vac.vacationId === i) {
                        vac.isLiked = true;
                    }
                }
                return vac;
            })
            vacations = vacationsArr; 
              
            store.dispatch(getVacations(vacations))
        }


        return vacations;
    }

    public async getOneVacation(id: number): Promise<VacationModel> {
        let vacations = store.getState().vacations.vacationsList;
        let vacation = vacations.find(v => v.vacationId === id);
        if (!vacation) {
            const response = await axios.get<VacationModel>(appConfig.vacationsUrl + id);
            vacation = response.data;
        }

        return vacation;
    }

    public async addVacation(vacation: VacationModel): Promise<void> {
        const vacationData = new FormData();
        vacationData.append("destination", vacation.destination);
        vacationData.append("description", vacation.description);
        vacationData.append("startDate", vacation.startDate.toLocaleString());
        vacationData.append("endDate", vacation.endDate.toLocaleString());
        vacationData.append("price", vacation.price.toString());
        vacationData.append("image", vacation.image[0]);

        const response = await axios.post<VacationModel>(appConfig.vacationsUrl, vacationData);
        const dbAddedVacation = response.data;
        const addedVacation = { ...dbAddedVacation };
        addedVacation.isLiked = false;

        store.dispatch(addVacation(addedVacation))
    }

    public async updateVacation(vacation: VacationModel): Promise<void> {
        const vacationData = new FormData();
        vacationData.append("destination", vacation.destination);
        vacationData.append("description", vacation.description);
        vacationData.append("startDate", vacation.startDate.toLocaleString());
        vacationData.append("endDate", vacation.endDate.toLocaleString());
        vacationData.append("price", vacation.price.toString());
        vacationData.append("image", vacation.image[0]);

        const response = await axios.put<VacationModel>(appConfig.vacationsUrl + vacation.vacationId, vacationData);
        const updatedVacation = response.data;
        store.dispatch(updateVacation(updatedVacation))
    }

    public async deleteVacation(id: number): Promise<void> {
        await axios.delete<void>(appConfig.vacationsUrl + id);
        store.dispatch(deleteVacation(id));
    }
}

const vacationService = new VacationsService();
export default vacationService; 