import { Navigate, Route, Routes } from "react-router-dom";
import "./Routing.css";
import Home from "../../HomeArea/Home/Home";
import RouteNotFound from "../RouteNotFound/RouteNotFound";
import Login from "../../AuthArea/Login/Login";
import Register from "../../AuthArea/Register/Register";
import Vacations from "../../VacationsArea/Vacations/Vacations";
import AddVacation from "../../VacationsArea/AddVacation/AddVacation";
import EditVacation from "../../VacationsArea/EditVacation/EditVacation";
import Chart from "../../DataAnalysisArea/Chart/Chart";


function Routing(): JSX.Element {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<Home />} />

            <Route path="/vacations" element={<Vacations />} />
            <Route path="/vacations/add-vacation" element={<AddVacation />} />
            <Route path="/vacations/edit-vacation/:vacationId" element={<EditVacation />} />
            <Route path="/vacations/chart" element={<Chart />} />


            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route path="*" element={<RouteNotFound />} />
        </Routes>
    );
}

export default Routing;
