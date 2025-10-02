
import {Routes,Route,Navigate} from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import CallPage from "./pages/CallPage.jsx";
import ChatPage from "./pages/ChatPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import NotificationsPage from "./pages/NotificationsPage.jsx";
import OnboardingPage from "./pages/OnboardingPage.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import Layout from "./components/Layout.jsx";

import {Toaster} from "react-hot-toast";
import PageLoader from "./components/PageLoader.jsx";
import {useThemeStore} from "./store/useThemeStore.js";
import useAuthUser from "./hooks/useAuthUser.js";

const App =()=>{

     const{isLoading,authUser}=useAuthUser() ;

     const {theme} = useThemeStore();
      const isAuthenticated =Boolean(authUser)
      const isOnboarded=authUser?.isOnboarded ;

      
    
 if(isLoading) return <PageLoader></PageLoader> ;


  return <div className="h-screen" data-theme= {theme}>
       <Routes>
        <Route  
         path="/"
         element={
          isAuthenticated && isOnboarded ? (
            <Layout showSidebar={true}>
              <HomePage/>
            </Layout>
          ) : (<Navigate to={!isAuthenticated ?"/login" :"/onboarding"}/>)
         }
        />
       <Route path="/signup" element={!isAuthenticated ?<SignUpPage/>:<Navigate to={isOnboarded ? "/" : "/onboarding"}/>}/>
       <Route path="/onboarding" element={isAuthenticated ?(!isOnboarded ? (
        <OnboardingPage/>
       ):(
        <Navigate to="/"/>
       )):(
        <Navigate to="/login"/>
       )}/>
       <Route path="/friends" element={ isAuthenticated && isOnboarded ? (
         <Layout showSidebar={true}>
            <HomePage/>
         </Layout>
       ):(
         <Navigate to={!isAuthenticated ? "/login" :"/onboarding"}></Navigate>
       )}/>
       <Route path="/notification" element={ isAuthenticated && isOnboarded ? (
         <Layout showSidebar={true}>
            <NotificationsPage/>

         </Layout>

       ):(
         <Navigate to={!isAuthenticated ? "/login" :"/onboarding"}></Navigate>

       )}/>
       <Route path="/login"
        element={
          !isAuthenticated ?<LoginPage/>:<Navigate to={isOnboarded ? "/" : "/onboarding"}/>}/>
       <Route path="/call/:id" element={isAuthenticated && isOnboarded ? (
             <CallPage/>

       ):(
<Navigate to={!isAuthenticated ? "/login" :"/onboarding"}/>

       )}/>
       
       <Route 
       path="/chat/:id" 
       element={
            isAuthenticated && isOnboarded ? (
                       <Layout showSidebar={false}>
            <ChatPage/>

         </Layout>


            ):(
              <Navigate to={!isAuthenticated ? "/login" :"onboarding"}/>
            )
       }/>
        </Routes>
      
      <Toaster/> 
        </div>
  
} ;
export default App ;