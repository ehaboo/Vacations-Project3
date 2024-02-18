import "./AdminMenu.css";
import addIcon from "../../../Assets/images/add-icon.png";
import vacationIcon from "../../../Assets/images/vacations-icon.png";
import chartIcon from "../../../Assets/images/chart-icon.png";
import Csv from "../../DataAnalysisArea/Csv/Csv";
import { Link } from "react-router-dom";


function AdminMenu(): JSX.Element {
    return (
        <aside className="AdminMenu">
            <Link to="/vacations"><img src={vacationIcon} alt="" /> Vacations</Link>
            <Link to="/vacations/add-vacation"><img src={addIcon} alt="" /> Add</Link>
            <Link to="/vacations/chart"><img src={chartIcon} alt="" /> Chart</Link>
            <Csv />
        </aside>
    );
}

export default AdminMenu;
