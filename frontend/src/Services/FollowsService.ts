import axios from "axios";
import FollowerModel from "../Models/FollowerModel";
import FollowsCountModel from "../Models/FollowsCountModel";
import appConfig from "../Utils/Config";
import { store } from "../Redux/Store";
import { vacationsFollowedByUser, addFollow, deleteFollow, followersCount } from "../Redux/VacationsSlice"


class FollowsService {
    public async vacationsFollowedByUser(userId: number): Promise<FollowerModel[]> {
        let followedByUser = store.getState().vacations.followedByUser;
        if (!followedByUser.length) {
            const response = await axios.get<FollowerModel[]>(appConfig.followedByUserUrl + userId);
            followedByUser = response.data;
            store.dispatch(vacationsFollowedByUser(followedByUser))
        }

        return followedByUser;
    }

    public async addFollow(vacationId: number): Promise<void> {
        const response = await axios.post<FollowerModel>(appConfig.followsUrl + vacationId);
        const addedFollow = response.data;
        store.dispatch(addFollow(addedFollow))
    }

    public async deleteFollow(vacationId: number): Promise<void> {
        await axios.delete<void>(appConfig.followsUrl + vacationId);
        store.dispatch(deleteFollow(vacationId));
    }

    public async followersCount(): Promise<FollowsCountModel[]> {
        let followersCountArr = store.getState().vacations.followersCountList;
        if (!followersCountArr.length) {
            const response = await axios.get<FollowsCountModel[]>(appConfig.followersCountUrl);
            followersCountArr = response.data;
            store.dispatch(followersCount(followersCountArr))
        }

        return followersCountArr;
    }
}

const followsService = new FollowsService();
export default followsService; 