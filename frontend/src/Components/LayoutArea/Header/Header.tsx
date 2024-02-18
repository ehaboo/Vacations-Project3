import AuthMenu from "../../AuthArea/AuthMenu/AuthMenu";
import "./Header.css";

function Header(): JSX.Element {
    return (
        <header className="Header">
            <h1>Vacations</h1>
            <AuthMenu />
        </header>
    );
}

export default Header;
