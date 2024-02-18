import { NavLink, Navigate } from "react-router-dom";
import "./Home.css";
import useVerifyLoggedIn from "../../../Hooks/useVerifyLoggedIn";

function Home(): JSX.Element {
    const user = useVerifyLoggedIn();


    if (user) return <Navigate to="/vacations" />

    return (
        <div className="Home">
            <div className="upperPart">
                <h3>Great destinations for </h3>
                <h1>Creating new memories</h1>
            </div>
            <div className="lowerPart">
                <button><NavLink to="/login">Login</NavLink></button> |
                <button><NavLink to="/register">Register</NavLink></button>
            </div>
        </div>
    );
}

export default Home;
