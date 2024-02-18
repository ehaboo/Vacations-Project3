import "./AuthMenu.css";
import loginIcon from "../../../Assets/images/loginIcon.png";
import logoutIcon from "../../../Assets/images/logoutIcon.png";
import useVerifyLoggedIn from "../../../Hooks/useVerifyLoggedIn";
import { Link } from "react-router-dom";
import authService from "../../../Services/AuthService";
import notifyService from "../../../Services/NotifyService";

function AuthMenu(): JSX.Element {
    const user = useVerifyLoggedIn();

    const logoutUser = () => {
        authService.logout();
        notifyService.success(`Bye ${user.firstName}, See You Later...`); 
    }

    return (
        <div className="AuthMenu">
            {user
                ?
                <div className="onAir">
                    <span>Welcome <span className="userName">{user?.firstName} {user?.lastName}</span>, You are on Air Already ✈️</span>
                    <Link to="/home"><img onClick={logoutUser} src={loginIcon} alt="" /> </Link>
                </div>
                :
                <div className="onAir">
                    <span className="noConnect">You are on the floor 🛬</span>
                    <img src={logoutIcon} alt="" />
                </div>
            }
        </div>
    );
}

export default AuthMenu;
