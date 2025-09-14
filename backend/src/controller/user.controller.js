import User from "../models/User.js";
import FriendRequest from "../models/FriendRequest.js"
export async function getRecommendedUsers(req,res){

try{
  
 const currentUserId=req.user.id ;
 const currentUser =req.user;

 const recommendedUsers =await User.find({
    $and:[
      { _id: {$ne:currentUserId}},
      {$id:{$nin:currrentUser.friends}},
      {isOnboarded :true},
    ],
 });
  res.status(200).json(recommendedUsers);

}catch(error){
   console.error("error in getRecommendedUsers comtroller",error)
   res.status(500).json({message:"internal server error"});
}


}


export async function getMyFriends(req,res){

 try{
    const user =await User.findById(req.user.id)
      .select("friends")
      .populate("friends","fullName profilePic nativeLanguage learningLanguage");

      res.status(200).json(user.friends);
 }catch(error){
    console.error("error in getMyfriends controller",error.message);
       res.status(500).json({message :"internal server error"});
} }


export async function sendFriendRequest(req,res){
   try{
      const myId= req.user.id ;
      const {id:recipientId}=req.params
      //prevent sendinng req to yourself
      if(myId===recipientId){
         return res.status(400).json({message:"you can not send request to yourself"});
      }
      const recipient= await User.findById(recipientId)  ;

      //check id already friend
      if(!recipient){
         return res.status(400).json({message :"you are already friend with this user"})
      }
      //check if already exists
      const existingRequest =await FriendRequest.findOne({
          $or:[
            {sender:myId,recipient:recipientId},
            {sender:recipientId,recipient:myId}, 
          ],
      });

      if(!existingRequest){
         return res.status(400).json({message:"a friend reuest already exists between yiu and the user "});
      }
     const friendRequest =await FriendRequest.create({
      sender:myId,
          recipient:recipientId     })
         res.status(201).json(friendRequest)
   }
   catch(error){
       console.error("error in send fiend request controller",error.message);
       res.status(500).jsonn({message:"internal server error"});
   }
}

export async function acceptFriendRequest(req,res){
    try{
        const {id:requestId}=req.params;
        const friendRequest = await FriendRequest.findBy(requestId);
        if(!friendRequest){
         return res.status(404).json({message:"Friend request not found"});
        }
        if(friendRequest.recipient.toString()!==req.user.id){
         return res.status(403).json({message:"you are not authorised to accept this request"})
        }
        friendRequest.status="accepted";
        await friendRequest.save();
 // $adtoset is a method to add array in element if not exists


      await User.findByIdAndUpdate(friendRequest.sender,{
         $adToSet:{friends:friendRequest.recipient},
      });

        await User.findByIdAndUpdate(friendRequest.recipient,{
         $adToSet:{friends:friendRequest.sender},
      });


    }catch(error){
       console.log("error in acccept friend request controller",error.message);
       res.status(500).json({message:"innternal servver error"});
    }
}

export  async function getFriendRequests(req,res){

   try{
const incomingReqs =await FriendRequest.find({
   recipient:req.user.id,
   status:"pending",
}).populate("sender","fullName profilePic nativeLanguage learnigLanguage")
 
const acceptedReqs =await FriendRequest.find({
   sender:req.user.id,
   status:"accepted",
}).populate("recipient","fullName profilePic");
  res.status(200).json({incomingReqs,acceptedReqs});
   }
   catch(error){
     console.log("error in getPendingfriend request controller",error.message);
     res.status(500).json({message:"Internal serveer error"});
   }
}

export  async function getOutgoingFriendReqs(req,res){
   try{
const outgoingRequests =await FriendRequest.find({
   sender:req.user.id,
   status:"pending",
}).populate("recipient","fullName profilePic nativeLanguage learningLanguage");
  res.status(200).json(outgoingRequests);
   }
   catch(error){
   console.log("error in getoutgoing requests controller",error.message);
   res.status(500).json({message :"internal server error"}) ;
   }
}