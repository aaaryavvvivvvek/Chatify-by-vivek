 import  useAuthUser from "../hooks/useAuthUser"
 import {useLocation,Link} from "react-router-dom"

 import {ShipWheelIcon,BellIcon, LogOutIcon} from "lucide-react"
 import ThemeSelector from "./ThemeSelector.jsx"
 import useLogout from "../hooks/useLogout";
const Navbar=()=>{

    const{ authUser} =useAuthUser();
    const location =useLocation() ;
    const isChatPage =location.pathname?.startsWith("/chat");
   /* const queryClient =useQueryClient();

    const{mutate:logoutMutation}=useMutation({

        mutationFn:logout,
    onSuccess:()=> queryClient.invalidateQueries({queryKey:["authUser"]})
    })*/
  const {logoutMutation}  =useLogout()

    return <nav className="bg-base-200 border-b border-base-300 sticky tip-0 z-30 h-16 flex items-center">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    {/* log0 -int the chatpage*/}
                    {isChatPage && (
                     <div className="p-5">
                        <Link to="/" className="flex items-center gap-2.5">
             <ShipWheelIcon className="size-9 text-primary"/>
             <span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r
             from-primary to-secondary tracking-wider">
                Chatify
             </span>
            </Link>
                          
                     </div>

                    )}
                  <div className="flex items-center gap-3 sm:gap-4 ml-auto" >
                             <Link to={"/notification"}>
                             <button className="btn btn-ghost btn-circle">
                                <BellIcon className="h-6 w-6 text-base-content opacity-70"></BellIcon>
                             </button>
                             </Link>
                 

                  </div>

                  <ThemeSelector></ThemeSelector>

                  <div className="avatar">
                      <div className= "w-9 rounded-full">

                <img src ={authUser?.profilePic} alt="User Avatar"  rel ="noreferrer"/>
            </div>
                  </div>
              <button className="btn btn-ghost btn-circle" onClick={logoutMutation}>
                <LogOutIcon className="h-6 w-6 text-base-content opacity-70"></LogOutIcon>
              </button>


            </div>
        
        </nav>
}
export default Navbar ;
