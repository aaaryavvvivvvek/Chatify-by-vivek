 import { useState} from "react";
   import {useMutation ,useQueryClient} from "@tanstack/react-query"  ;
  import {ShipWheelIcon} from "lucide-react"
  import { Link } from "react-router-dom";
  import {login} from "../lib/api"
  import useLogin from "../hooks/useLogin";


const LoginPage=()=>{

    const [loginData,setLoginData] =useState ({
        email:"",
        password:"",
    }) ;
   // const queryClient =useQueryClient();
   /*  const {mutate:loginMutation ,isPending,error} =useMutation({
        mutationFn :login ,
        onSuccess:()=>queryClient.invalidateQueries({queryKey:["authUser"]}),
    });*/
       const {isPending ,error,loginMutation}= useLogin() ;
     const handelLogin =(e)=>{
        e.preventDefault();
        loginMutation(loginData);
     }
    return <div className="h-screen flex items-center justify-center p-4 sm:p-6 md:p-8" data-theme>
         <div className="border border-primary/25 flex flex-col lg:flex lg:flex-row w-full max-w-5xl mx-auto bg-base-100 rounded-xl shadow-lg overflow-hidden">
          {/* loginsection*/}
             <div className="w-full lg:w-1/2 p-4 sm:p-8 flex flex-col">
             {/*logo*/}
             <div className ="mb-4 flex items-center justify-start gap-2">
               <ShipWheelIcon className=" size-9 text-primary"></ShipWheelIcon>
               <span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wide">
                Chatify
               </span>

             </div>
                   {/* error messsaage display*/}
      {error&&( 
           <div className="alert alert-error mb-4"> 
           <span>
             {error.response.data.message}
            </span></div>
      ) }

                   <div className="w-full ">
                    <form onSubmit={handelLogin}>
                        <div className="space-y-4">
                   <div>
                    <h2 className="text-xl font-semibold"> Welcome Back</h2>
                    <p className="text-sm opacity-70">
                        Sign in your account continue have fun
                    </p>
                   </div>
                    <div className=" flex flex-col gap-3">
                    <div className="form-control w-full space-y-2">
                       <label className="label">
                        <span className="label-text">Email</span>
                       </label>
                        
                        <input
                            type="email"
                            placeholder="helllo@gmail.com"
                            className="input input-bordered w-full"
                            value={loginData.email}
                            onChange={(e)=>setLoginData({...loginData,email:e.target.value})}
                            required
                        ></input>
                    </div>
                      
                         <div className="form-control w-full space-y-2">
                       <label className="label">
                        <span className="label-text">Password</span>
                       </label>
                        
                        <input
                            type="password"
                            placeholder="......"
                            className="input input-bordered w-full"
                            value={loginData.password}
                            onChange={(e)=>setLoginData({...loginData,password:e.target.value})}
                            required
                        ></input>
                    </div>

                    <button type="submit" className="btn btn-primary w-full" disable={isPending}> 
                        {isPending ? (
                            <>
                            <span className="loading loading-spinner loading-xs">
                                Signing in...
                            </span>
                            </>
                        ):(
                            "Sign In"
                        )}


                    </button>
                         <div className ="text-center mt-4">
                            <p className ="text-sm">DO not have an account ?{""}
                                <Link to="/signup" className="text-primary hover:underline">
                                Create One</Link>
                            </p>

                         </div>
                    </div>
                        </div>
                    </form>
                   </div>

             </div>
                   
                  {/* image right side*/}
                    <div className="hidden lg:flex w-full lg:w-1/2 bg-primary/10 items-center justify-center">
          <div className="max-w-md p-8">
            <div className="relative aspect-square max-w-sm mx-auto">
              <img
                src="Halloween video call-bro.png"
                alt="Language connection illustration"
                className="w-full h-full"
              />
            </div>
            <div className="text-center space-y-3 mt-6">
              <h2 className="text-xl font-semibold">
                Connection with Language partners worldwide
              </h2>
              <p className="opacity-70">
                Practice conversation, make friends, improve your language
                skills together
              </p>
            </div>
          </div>
        </div>
         
         </div>  
        
         </div>
}
export default LoginPage ;