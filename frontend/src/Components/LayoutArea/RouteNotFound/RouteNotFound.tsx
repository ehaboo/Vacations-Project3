import "./RouteNotFound.css";
import pageNotFoundImage from "../../../Assets/images/pageNotFound-image.png"


function RouteNotFound(): JSX.Element {
    return (
        <div className="RouteNotFound">
            <img src={pageNotFoundImage} alt="page-not-found-img" />
        </div>
    );
}

export default RouteNotFound;
