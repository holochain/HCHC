// dash route core components
import Dashboard from "../views/Dashboard/Dashboard.jsx";
import Buttons from "../views/Applications/Buttons.jsx";
import GridSystem from "../views/Applications/GridSystem.jsx";
import Panels from "../views/Applications/Panels.jsx";
import SweetAlert from "../views/Applications/SweetAlert.jsx";
import RegularForms from "../views/Financial/RegularForms.jsx";

// page route core components
import UserProfile from "../views/Pages/UserProfile.jsx";

// @material-ui/icons
import DashboardIcon from "@material-ui/icons/Dashboard";
import MonetizationOn from "@material-ui/icons/MonetizationOn";
import Image from "@material-ui/icons/Image";
import Apps from "@material-ui/icons/Apps";

const dashRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: DashboardIcon,
    component: Dashboard
  },
  {
    path: "/userprofile",
    name: "User Profile",
    icon: Image,
    component: UserProfile
  },
  {
    collapse: true,
    path: "/happ",
    name: "hApplications",
    state: "openApplications", //openComponents
    icon: Apps,
    views: [
      {
        path: "/happ/allhapps",
        name: "View All",
        component: Buttons
      },
      {
        path: "/happ/happdetails",
        name: "View Details",
        component: GridSystem
      },
      {
        path: "/happ/update",
        name: "Add Updates",
        component: Panels
      },
      {
        path: "/happ/registernew",
        name: "Register New",
        component: SweetAlert
      }
    ]
  },
  {
    collapse: true,
    path: "/holohost",
    name: "Holo Hosted Apps",
    state: "openHolo", //openForms
    icon: Store,
    views: [
      {
        path: "/holohost/overview",
        name: "Overview",
        component: RegularForms
      }
    ]
  },
  { redirect: true, path: "/", pathTo: "/dashboard", name: "Dashboard" }
];
export default dashRoutes;
