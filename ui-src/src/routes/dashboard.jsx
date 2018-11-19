// dash route core components
import Dashboard from "../views/Dashboard/Dashboard.jsx";

import RegisterApp from "../views/Applications/RegisterApp.tsx";
import AppRegisterLayout from "/views/Applications/AppRegisterLayout.jsx";
import AppDetails from "../views/Applications/AppDetails.jsx"
import Notifications from "../views/Applications/NotificationInbox.jsx";

import HoloHostedApps from "../views/Holo/HoloHostedAppOverview.jsx";

import Buttons from "../views/Applications/Buttons.jsx";
import GridSystem from "../views/Applications/GridSystem.jsx";
import Panels from "../views/Applications/Panels.jsx";
import SweetAlert from "../views/Applications/SweetAlert.jsx";
import RegularForms from "../views/Applications/RegularForms.jsx";
import ExtendedForm from "../views/Applications/ExtendedForms.jsx";

// page route core components
import UserProfile from "../views/Pages/UserProfile.jsx";

// @material-ui/icons
import DashboardIcon from "@material-ui/icons/Dashboard";
import Store from "@material-ui/icons/Store";
import MonetizationOn from "@material-ui/icons/MonetizationOn";
import OpenInBrowser from "@material-ui/icons/OpenInBrowser";
import Info from "@material-ui/icons/Info";
import Pageview from "@material-ui/icons/Pageview";
import Edit from "@material-ui/icons/Edit";
import Image from "@material-ui/icons/Image";
import Apps from "@material-ui/icons/Apps";

const dashRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: Apps,
    component: Dashboard
  },
  {
    path: "/userprofile",
    name: "User Profile",
    icon: Image,
    component: UserProfile
  },
  {
    path: "/registerapp",
    name: "Register New App",
    icon: OpenInBrowser,
    component: RegisterApp
  },
  {
    path: "/update/:happID",
    name: "Update App",
    icon: Edit,
    component: AppRegisterLayout
  },
  {
    path: "/details/:happID",
    name: "View App Details",
    icon: Pageview,
    component: AppDetails
  },
  {
    path: "/holohost",
    name: "Holo Hosted Apps",
    icon: Store,
    component: HoloHostedApps
  },
  {
    path: "/notifications",
    name: "Notifications",
    icon: Info,
    component: Notifications
    // Buttons
    // GridSystem
    // ExtendedForm
    // RegularForms
    // Panels
    // SweetAlert
  },
  { redirect: true, path: "/", pathTo: "/dashboard", name: "Dashboard" }
];
export default dashRoutes;



// Expandable Sidebar :
// {
//   collapse: true,
//   path: "/happ",
//   name: "hApplications",
//   state: "openApplications",
//   icon: Apps,
//   views: [
//     {
//       path: "/happ/allhapps",
//       name: "View All",
//       component: Buttons
//     },
//     {
//       path: "/happ/happdetails/:happID",
//       name: "View Details",
//       component: GridSystem
//
//     },
//     {
//       path: "/happ/update/:happID",
//       name: "Add Updates",
//       component: Panels
//     },
//     {
//       path: "/happ/registernew/:happID",
//       name: "Register New",
//       component: RegisterApp
//     }
//   ]
// },
