import {StreamChat} from "stream-chat";
import "dotenv/config" ;

const apiKey =process.env.STREAM_API_KEY ; 
const apiSecret =process.env.STREAM_API_SECRET ;

if(!apiKey || !apiSecret) {
    console.error(" stream API key or Secret is missing")
}
const streamClient =StreamChat.getInstance(apiKey,apiSecret) ;

export const upsertStreamUser =async (userData)=>{
    try{
            await streamClient.upsertUsers([userData]);
            return userData
    }catch(error){
    console.error("Errror  upserting stream useer :",error);
    }
};
 
export const generateStreamToken =(userId)=>{
  try{
   const userIdStr =userId.toString();
   return streamClient.createToken(userIdStr);
  }catch(error){
   console.error("error in geeneratre stream token",error.message);
   
  }

}; 