
import express from "express";
import { protectRoute} from "../middleware/auth.middleware.js";
import {getMyFriends,getRecommendedUsers,sendFriendRequest,acceptFriendRequest ,getFriendRequests,getOutgoingFriendReqs} from "../controller/user.controller.js";
const router =express.Router();

router.use(protectRoute);


router.get("/",getRecommendedUsers)
router.get("/friends",getMyFriends)

router.post("/friends-request/:id",sendFriendRequest);
 router.put("/friends-request/:id/accept",acceptFriendRequest);
 router.get("/friend-requests",getFriendRequests);
router.get("/outgoing-friend-requests",getOutgoingFriendReqs)

export default router ;