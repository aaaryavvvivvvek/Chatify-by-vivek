import express from "express" ;
import "dotenv/config" ;
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.js"
import { connectDB } from "./lib/db.js";
import userRoutes from "./routes/user.route.js";
import chatRoutes from "./routes/chat.route.js";
import cors from "cors"
const app = express();

const PORT= process.env.PORT

app.use(cors({
    origin: "http://localhost:5173",
    credentials :true // allow front end to send cookies
})) ;

app.use(express.json());
app.use(cookieParser()) ;
app.use("/api/auth",authRoutes)
 app.use("/api/users",userRoutes)
 app.use("/api/chat",chatRoutes);

app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`) ;
    connectDB(); 
}) ;