import axios from "axios";
import UserModel from "../Models/UserModel";
import appConfig from "../Utils/Config";
import { store } from "../Redux/Store";
import { connect, disconnect } from "../Redux/AuthSlice";
import CredentialsModel from "../Models/CredentialsModel";
import { getVacations, vacationsFollowedByUser } from "../Redux/VacationsSlice";

class AuthService {
    public async register(user: UserModel): Promise<void> {
        const response = await axios.post<string>(appConfig.registerUrl, user);
        const token = response.data;
        store.dispatch(connect(token));
    }

    public async login(credentials: CredentialsModel): Promise<void> {
        const response = await axios.post<string>(appConfig.loginUrl, credentials);
        const token = response.data;
        store.dispatch(connect(token));
    }

    public logout(): void {
        store.dispatch(getVacations([]))
        store.dispatch(vacationsFollowedByUser([])); 
        store.dispatch(disconnect())
    }
}

const authService = new AuthService();
export default authService;