 import {useState} from "react" ;
import useAuthUser from "../hooks/useAuthUser";
import {useMutation} from "@tanstack/react-query"
import toast from "react-hot-toast";
import { completeOnboarding } from "../lib/api";
import { useQueryClient } from "@tanstack/react-query";
import { CameraIcon ,ShuffleIcon ,MapPinIcon ,ShipWheelIcon,LoaderIcon} from "lucide-react";


const OnboardingPage=()=>{
    const {authUser}= useAuthUser();
     const queryClient=useQueryClient();


  const [formState,setFormState]=useState({
     fullName:authUser?.fullName ||"",
     bio:authUser?.bio||"",
     nativeLanguage:authUser?.nativeLanguage||"",
     learningLanguage:authUser?.learningLanguage||"",
    location:authUser?.location||"",
    profilePic:authUser?.profilePic||"",

  }) ;

  const{mutate:onboardingMutation,isPending}=useMutation({
    mutationFn:completeOnboarding,
    onSuccess:()=>{
        toast.success("Profile onboarded successfully");
        queryClient.invalidateQueries({queryKey :["authUser"]}) ;
    },
    onError:(error)=>{
       console.log(error.response.data.message)
    }
  })
   const handleSubmit =(e)=>{
    e.preventDefault();
    onboardingMutation(formState);
   };

   const handleRandomAvatar =()=>{
    const idx= Math.floor(Math.random()*100)+1 ;
    const randomAvatar =`https://robohash.org/${idx}.png?set=set2`
     setFormState({...formState,profilePic:randomAvatar}) ;
     toast.success("avatar changed successfully");
   } ;

 return (<div className="min-h-screen bg-base-100 flex items-center justify-center p-4">
      <div className="card bg-base-200 w-full max-w-3xl shadow-xl">
        <div className=" card-body p-6 sm:p-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6">Complete your profile</h1>
            <form onSubmit ={handleSubmit} className="space-y-6">

                <div className="flex flex-col items-center justify-center space-y-4">
                   
                <div className="size-32 rounded-full bg-base-300 overflow-hidden">

                     {formState.profilePic?(
                                <img
                                    src ={formState.profilePic}
                                    alt ="Profile Preview"
                                    className="w-full h-full object-cover"
                                ></img>
                              ):( 
                                <div className ="flex items-center justify-center h-full">
                                    <CameraIcon className ="size-12 text-base-content opacity-40"/>
                                    </div>
                            

                              )}

                   </div>
                        {/* generate random avatar button*/}
                        <div className="flex items-center gap-2">
                       <button type="button" onClick={handleRandomAvatar} className="btn btn-accent">
                        <ShuffleIcon className="size-4 mr-2"/>
                        Generate Random Avatar
                       </button>

                        </div>
                      
           


                       
                </div>
                <div className="form-control">
                        <label className="label">
                          <span className="label-text">Full Name</span>
                        </label>
                        <input
                         type="text"
                         name="fullName"
                         value={formState.fullName}
                         onChange={(e)=>setFormState({...formState,fullName:e.target.value})}
                          className="input input-bordered w-full"
                          placeholder="Your full name"
                        ></input>
                      </div>
                       {/* bio inpurt element*/}

                                  <div className="form-control">
                        <label className="label">
                          <span className="label-text">Bio</span>
                        </label>
                        <input
                         type="bio"
                         name="fullName"
                         value={formState.bio}
                         onChange={(e)=>setFormState({...formState,bio:e.target.value})}
                          className="input input-bordered w-full"
                          placeholder="tell other about yourself"
                        ></input>
                      </div>

                      {/*langages*/}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                            <div className="form-control">
                        <label clasName="label-text"> Native Languages</label>
                    <select name="nativeLanguages"
                       value={formState.nativeLanguage}
                       onChange={(e)=>setFormState({...formState,nativeLanguage:e.target.value})}
                       className="select select-bordered w-full"
                    >
                     <option value="">Select your native Language</option>
                     {LANGUAGES.map((lang)=>(
                      <option key={`native-${lang}`} value={lang.toLowerCase()}>
                        {lang}
                      </option>
                     ))}


                    </select>
                  
 
                      
                     
                      </div>
        {/* learning languages */}
                             <div className="form-control">
                        <label clasName="label-text"> Native Languages</label>
                    <select name="learningLanguages"
                       value={formState.learningLanguage}
                       onChange={(e)=>setFormState({...formState,learningLanguage:e.target.value})}
                       className="select select-bordered w-full"
                    >
                     <option value="">Select your native Learning</option>
                     {LANGUAGES.map((lang)=>(
                      <option key={`learning-${lang}`} value={lang.toLowerCase()}>
                        {lang}
                      </option>
                     ))}


                    </select>
                  
               
                      </div>
                      </div>
                      <div className="form-control">
                        <label>
                          <span className="label-text"> Location</span>
                        </label>
                        <div className ="relative">
                          <MapPinIcon className="absolute top-1/2 transform -translate-y-1/2 left-3 size-5 text-base-content opacity-70"/>
                          <input
                           type="text"
                           name="location"
                           value ={formState.location}
                           onChange={(e)=>setFormState({...formState,location:e.target.value})}
                           className="input input-bordered w-full pl-10"
                           placeholder="City,Country"
                          ></input>
                        </div>
                      </div>
               {/*submit*/}
               <button className="btn btn-primary w-full" disabled={isPending} type="submit">
                {!isPending ?(
                  <>
                  <ShipWheelIcon className="size-5 mr-2"/>
                  Complete Onboarding 
                  </>
                ):(
                     <>
                     <LoaderIcon className="animate-spin size-5 mr-2"/>
                     Onboarding...
                     </>

                )}
               </button>
            </form>
        </div>
      </div>
     </div>)
}
export default OnboardingPage ;