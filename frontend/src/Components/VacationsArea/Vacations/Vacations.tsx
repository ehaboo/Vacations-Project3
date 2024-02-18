import { useEffect, useState } from "react";
import VacationModel from "../../../Models/VacationModel";
import "./Vacations.css";
import vacationService from "../../../Services/VacationsService";
import VacationCard from "../VacationCard/VacationCard";
import Loader from "../../ToolsArea/Loader/Loader";
import useVerifyLoggedIn from "../../../Hooks/useVerifyLoggedIn";
import followsService from "../../../Services/FollowsService";
import { Navigate, useNavigate } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import UserMenu from "../../MenuArea/UserMenu/UserMenu";
import AdminMenu from "../../MenuArea/AdminMenu/AdminMenu";
import notifyService from "../../../Services/NotifyService";
import { format } from "date-fns";
import { useSelector } from "react-redux";
import { RootState } from "../../../Redux/Store";






function Vacations(): JSX.Element {
    const user = useVerifyLoggedIn();
    const navigate = useNavigate();

    const vacationsFullArray =  useSelector((state: RootState) => state.vacations.vacationsList);

    const [vacations, setVacations] = useState<VacationModel[]>([]);


    const [vacationsPerPage] = useState(9);
    const [currentPage, setCurrentPage] = useState(1);
    const handlePageChanging = (event: React.ChangeEvent<unknown>, value: number) => {
        setCurrentPage(value);
    };
    const indexOfLastVacation = currentPage * vacationsPerPage;
    const indexOfFirstVacation = indexOfLastVacation - vacationsPerPage;
    const currentVacations = vacations.slice(indexOfFirstVacation, indexOfLastVacation)
    let countPages = Math.ceil(vacations.length / vacationsPerPage)


    const [filters, setFilters] = useState({
        isVacationsArr: true,
        isLikedVacations: false,
        isComingVacations: false,
        isCurrentVacations: false
    })

    const fetchData = async () => {
        try {
            await followsService.followersCount()
            const vacationsData = await vacationService.getAllVacations();
            if (filters.isVacationsArr) setVacations(vacationsData);
        } catch (error) {
            notifyService.error(error);
        }
    };

    useEffect(() => {
        fetchData();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);



    async function filteringVacations() {

        let filteredVacations = [...vacationsFullArray];

        if (filters.isLikedVacations) {
            filteredVacations = filteredVacations.filter(v => v.isLiked === true);

        }

        const now = new Date().toLocaleDateString();
        const formattedDate = format(now, 'yyyy-MM-dd');

        if (filters.isComingVacations) {
            filteredVacations = filteredVacations.filter(v => v.startDate.toLocaleString() > formattedDate);

        }

        if (filters.isCurrentVacations) {
            filteredVacations = filteredVacations.filter(v => (v.startDate.toLocaleString() < formattedDate) && (formattedDate < v.endDate.toLocaleString()));

        }

        setVacations(filteredVacations)
        setCurrentPage(1);
        countPages = Math.ceil(vacations.length / vacationsPerPage);


    }


    useEffect(() => {
        filteringVacations()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filters]);


    const deleteVacation = async (vacationId: number) => {
        try {
            await vacationService.deleteVacation(vacationId)
            notifyService.success("This Vacation Successfully Deleted...");
            const vacationsAfterDel = vacations.filter(v => v.vacationId !== vacationId)
            setVacations(vacationsAfterDel)
            countPages = Math.ceil(vacationsAfterDel.length / vacationsPerPage)
            if (currentPage > countPages) setCurrentPage(currentPage - 1)
            navigate("/vacations")

        } catch (error: any) {
            notifyService.error(error);
        }

    }

    

    if (!vacationsFullArray.length) return <Loader />

    return (
        <div className="Vacations">
            {user
                ?
                <>
                    {user?.userId === 1
                        ?
                        <AdminMenu />
                        :
                        <UserMenu onFilter={(filters) => { setFilters(filters) }} />
                    }
                    <div className="VacationsContainer">
                        {(!filters.isVacationsArr && !vacations.length) && <h3>Sorry, we couldn't find any matching results</h3>}
                        {currentVacations.map(v => <VacationCard key={v.vacationId} vacation={v} onDelete={deleteVacation} />)}
                    </div>

                    <Pagination count={countPages} page={currentPage} onChange={handlePageChanging} color="primary" />
                </>
                :
                <Navigate to="/home" />
            }
        </div>
    );
}

export default Vacations;


