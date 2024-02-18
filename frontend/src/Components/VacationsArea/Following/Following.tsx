import { useState } from "react";
import "./Following.css";
import { useSelector } from "react-redux";
import { RootState } from "../../../Redux/Store";
import FollowsCountModel from "../../../Models/FollowsCountModel";
import followsService from "../../../Services/FollowsService";
import notifyService from "../../../Services/NotifyService";


interface FollowingProps {
    vacationId: number,
    isLiked: boolean,
    onChanging: (boolean: boolean) => void
}

function Following({ vacationId, isLiked, onChanging }: FollowingProps): JSX.Element {
    const [isFollowed, setIsFollowed] = useState<boolean>(isLiked);

    const followersCountObject = useSelector((state: RootState): FollowsCountModel => {
        return state.vacations.followersCountList.find(fc => fc.vacationId === vacationId)
    });

    const handelLike = async () => {
        try {
            onChanging(true)
            setIsFollowed(true);
            await followsService.addFollow(vacationId);
        } catch (error: any) {
            notifyService.error(error);
        }
    }

    const handelUnLike = async () => {
        try {
            onChanging(false)
            setIsFollowed(false);
            await followsService.deleteFollow(vacationId);
        } catch (error: any) {
            notifyService.error(error);
        }
    }

    return (
        <div className="Following">
            {isFollowed
                ?
                <span className="pointer" onClick={handelUnLike}>❤️</span>
                :
                <span className="pointer" onClick={handelLike}>🩶</span>
            }
            <span className="followers">Like {followersCountObject?.followersCount}</span>
        </div>
    );
}

export default Following;
