import { OkPacket } from "mysql";
import dal from "../4-utils/dal"
import FollowerModel from "../2-models/follower-model";
import FollowsCountModel from "../2-models/follows-count-model";
import { ResourceNotFoundError } from "../2-models/client-errors";


async function addFollow(follow: FollowerModel): Promise<FollowerModel> {
    follow.validate();

    const sql = `INSERT INTO followers VALUES(?, ?)`;
    await dal.execute(sql, [follow.userId, follow.vacationId]);

    return follow;
};

async function deleteFollow(follow: FollowerModel): Promise<void> {
    follow.validate();

    const sql = `DELETE FROM followers WHERE userId = ? AND vacationId = ?`;
    const result: OkPacket = await dal.execute(sql, [follow.userId, follow.vacationId]);

    if (result.affectedRows === 0) throw new ResourceNotFoundError(follow.vacationId);
};

async function followersCount(): Promise<FollowsCountModel[]> {
    const sql = `SELECT 
                    vacations.destination, followers.vacationId, COUNT(userId) AS followersCount
                    FROM followers JOIN vacations
                    ON vacations.vacationId = followers.vacationId
                    GROUP BY followers.vacationId`;
    const followersCount = await dal.execute(sql);

    return followersCount;
};

async function vacationsFollowedByUser(id: number): Promise<FollowerModel[]> {
    const sql = `SELECT vacationId FROM followers WHERE userId = ?`;
    const vacationsFollowedByUser = await dal.execute(sql, [id]);

    return vacationsFollowedByUser;
}

export default {
    addFollow,
    deleteFollow,
    followersCount,
    vacationsFollowedByUser
}