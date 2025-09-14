import { generateStreamToken} from "../lib/stream.js"

export async function getStreamToken(req,res){
    try{
  const token=generateStreamToken(req.res.id);
  res.status(200).json({token});

    }
    catch(error){
        console.log("error in getstreamToken controller".error.message);
        res.status(500).json({message:"internal server error"});
    }
    
}