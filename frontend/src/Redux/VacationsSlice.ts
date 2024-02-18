import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import VacationModel from "../Models/VacationModel"
import FollowerModel from "../Models/FollowerModel"
import FollowsCountModel from "../Models/FollowsCountModel"


interface VacationsState {
    vacationsList: VacationModel[],
    followersCountList: FollowsCountModel[],
    followedByUser: FollowerModel[]
}

const initialState: VacationsState = {
    vacationsList: [],
    followersCountList: [],
    followedByUser: []
}

const vacationsSlice = createSlice({
    name: "vacations",
    initialState,
    reducers: {
        getVacations: (state, action: PayloadAction<VacationModel[]>) => {
            state.vacationsList = action.payload;        
                
        },
        addVacation: (state, action: PayloadAction<VacationModel>) => {
            state.vacationsList.push(action.payload)
            state.vacationsList.sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
            
        },
        updateVacation: (state, action: PayloadAction<VacationModel>) => {
            const i = state.vacationsList.findIndex(v => v.vacationId === action.payload.vacationId);
            if (i >= 0) state.vacationsList[i] = action.payload;
        },
        deleteVacation: (state, action: PayloadAction<number>) => {
            state.vacationsList = state.vacationsList.filter(v => v.vacationId !== action.payload);
        },
        followersCount: (state, action: PayloadAction<FollowsCountModel[]>) => {
            state.followersCountList = action.payload;
        },
        vacationsFollowedByUser: (state, action: PayloadAction<FollowerModel[]>) => {
            state.followedByUser = action.payload;
        },
        addFollow: (state, action: PayloadAction<FollowerModel>) => {
            state.followedByUser.push(action.payload);
            const vacations  = state.vacationsList.map(v => {
                let vac = { ...v };
                if(v.vacationId === action.payload.vacationId){
                vac.isLiked = true;
                }
                return vac; 
            })
            state.vacationsList = vacations;
            
            const isFollowersCount = state.followersCountList.find(f => f.vacationId === action.payload.vacationId);
            if (isFollowersCount) {
                isFollowersCount.followersCount++;
            } else {
                const vacation = state.vacationsList.find(v => v.vacationId === action.payload.vacationId)
                const addFollowersCount = new FollowsCountModel(vacation.destination, vacation.vacationId, 1)
                state.followersCountList.push(addFollowersCount);
            }
        },
        deleteFollow: (state, action: PayloadAction<number>) => {
            state.followedByUser = state.followedByUser.filter(f => f.vacationId !== action.payload);
            const vacations  = state.vacationsList.map(v => {
                let vac = { ...v };
                if(v.vacationId === action.payload){
                vac.isLiked = false;
                }
                return vac; 
            })
            state.vacationsList = vacations;
            
            const isFollowersCount = state.followersCountList.find(f => f.vacationId === action.payload);
            if (isFollowersCount.followersCount > 1) {
                isFollowersCount.followersCount--;
            } else {
                state.followersCountList = state.followersCountList.filter(f => f.vacationId !== action.payload);
            }
        }
    }
})

export const { getVacations, addVacation, updateVacation, deleteVacation, vacationsFollowedByUser, addFollow, deleteFollow, followersCount } = vacationsSlice.actions;
export default vacationsSlice.reducer; 