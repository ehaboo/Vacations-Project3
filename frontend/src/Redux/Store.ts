import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./AuthSlice";
import vacationReducer from "./VacationsSlice"


export const store = configureStore({
    reducer: {
        vacations: vacationReducer,
        auth: authReducer
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: false })
})

export type RootState = ReturnType<typeof store.getState>
