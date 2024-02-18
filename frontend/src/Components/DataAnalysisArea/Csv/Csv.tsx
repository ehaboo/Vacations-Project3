import { useState, useEffect } from "react";
import FollowsCountModel from "../../../Models/FollowsCountModel";
import followsService from "../../../Services/FollowsService";
import { CSVLink } from "react-csv";
import csvIcon from "../../../Assets/images/csv-icon.png";
import "./Csv.css";
import notifyService from "../../../Services/NotifyService";


function Csv(): JSX.Element {

    const [followerCount, setFollowerCount] = useState<FollowsCountModel[]>([]);

    useEffect(() => {
        followsService.followersCount()
            .then(setFollowerCount)
            .catch(error => notifyService.error(error))
    }, []);

    const headers = [
        { label: "Destination", key: "destination" },
        { label: "Followers", key: "followersCount" }
    ];

    return (
        <div className="Csv">
            <CSVLink data={followerCount} headers={headers} filename={"Vacation Followers.csv"}>
            <img src={csvIcon} alt="" /> 
            CSV
            </CSVLink>
        </div>
    );
}

export default Csv;
