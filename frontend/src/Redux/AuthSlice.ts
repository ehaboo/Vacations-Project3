import { jwtDecode } from "jwt-decode";
import UserModel from "../Models/UserModel";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";


interface AuthState {
    token: string;
    user: UserModel;
}

const initialState: AuthState = {
    token: localStorage.getItem("token"),
    user: null
}

if (initialState.token) {
    const container: { user: UserModel } = jwtDecode(initialState.token);
    initialState.user = container.user;
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        connect: (state, action: PayloadAction<string>) => {
            const container: { user: UserModel } = jwtDecode(action.payload);
            localStorage.setItem("token", action.payload);
            state.token = action.payload;
            state.user = container.user;
        },
        disconnect: (state) => {
            state.token = null;
            state.user = null;
            localStorage.removeItem("token")
    
        }
    }
})

export const { connect, disconnect } = authSlice.actions;
export default authSlice.reducer; 