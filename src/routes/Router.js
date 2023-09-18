import { lazy } from "react";
import { useRoutes } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Login from "../auth/login.js";
import Signup from "../auth/signup.js";
import LandingPage from "../views/ui/landingpage.js";
import { useAuthContext } from "../shared/useAuthContext";
import Swal from "sweetalert2";
import Administration from "../views/ui/Administration.js";
const FullLayout = lazy(() => import("../layouts/FullLayout.js"));


const ProjectTables= lazy(() => import("../views/ui/ProjectTable"));

const User = lazy(() => import("../views/ui/User"));
const Contact = lazy(() => import("../views/ui/Contact"));
//const ProjectTables = lazy(() => import("../views/Starter.js"));
const Tables = lazy(() => import("../views/ui/Tables"));
const Forms = lazy(() => import("../views/ui/Forms"));
const ErrorPage = lazy(() => import("../views/ui/Errorpage"));


export default function Router(){
  const { user } = useAuthContext() 
  const alert =()=>{
    Swal.fire({ 
      
      text:   "You have no access . You will be redirected to the form",
      confirmButtonText: 'Cancel',
      icon : "error" ,
      confirmButtonColor:"#979292 "
  
    }) 
  }
  let ThemeRoutes = useRoutes([
 
    {  path: "/login",
      element:!user ? <Login/> : <Navigate to="/" />}
        
        
      ,
      {
        path: "/signup",
        element:user?.role!=="Admin"?  <Navigate to="/" />:<Signup /> ,
        
      },
      {
        path: "/",
        element: <FullLayout />,
        children: [
          { path: "/", element: <LandingPage/> },
          { path: "/errorpage", element: <ErrorPage/> },
          { path: "/dashboard", exact: true, element: user?<ProjectTables /> : <Navigate to="/login" /> },
          { path: "/table", exact: true, element: user? ((user.role!=="Admin" )?  <Navigate to="/errorpage" />:<Tables /> ): <Navigate to="/login" />},
          { path: "/forms", exact: true, element: user ? <Forms /> : <Navigate to="/login" /> },
          { path: "/administration", exact: true, element: user ? ((user.role!=="Administration" && user.role!=="Admin")? <Navigate to="/errorpage" />:<Administration />) : <Navigate to="/login" /> },
          { path: "/user", exact: true, element: <User /> },
          { path: "/contact", exact: true, element: <Contact /> },
        ],
      },
    ]);
    

return ThemeRoutes ;}

 