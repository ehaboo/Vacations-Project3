import express, {Request, Response, NextFunction} from "express"; 
import followService from "../5-services/follow-service";
import cyber from "../4-utils/cyber";
import FollowerModel from "../2-models/follower-model";
import verifyLoggedIn from "../3-middleware/verify-logged-in";


const router = express.Router(); 

router.post("/:vacationId",verifyLoggedIn, async(request:Request, response:Response, next:NextFunction) => {
    try{
        const user = await cyber.verifyToken(request);
        const userId = user.userId; 
        const vacationId = +request.params.vacationId;
        const follow = new FollowerModel(userId,vacationId)
        const addedFollow = await followService.addFollow(follow);
        response.status(201).json( addedFollow );
    }catch(err:any){
        next(err);
}})

router.delete("/:vacationId",verifyLoggedIn, async (request: Request, response: Response, next:NextFunction  ) => {
    try{
        const user = await cyber.verifyToken(request);
        const userId = user.userId; 
        const vacationId = +request.params.vacationId;
        const follow = new FollowerModel(userId,vacationId)
        await followService.deleteFollow(follow);
        response.sendStatus(204);
    }catch(err:any){
        next(err);
    }
});

router.get("/followers-count", async (request: Request, response: Response, next:NextFunction  ) => {
    try{
        const followersCount = await followService.followersCount();
        response.json(followersCount);
    }catch(err:any){
        next(err);
    }
});

router.get("/followed-by-user/:userId([0-9]+)",verifyLoggedIn, async (request: Request, response: Response, next:NextFunction  ) => {
    try{
        const userId = +request.params.userId; 
        const vacationsFollowedByUser = await followService.vacationsFollowedByUser(userId);
        response.json(vacationsFollowedByUser);
    }catch(err:any){
        next(err);
    }
});


export default router; 
