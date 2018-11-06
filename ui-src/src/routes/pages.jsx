import LoginPage from "../views/Pages/LoginPage.jsx";
import RegisterPage from "../views/Pages/RegisterPage.jsx";
import LockScreenPage from "../views/Pages/LockScreenPage.jsx";

// @material-ui/icons
import PersonAdd from "@material-ui/icons/PersonAdd";
import Fingerprint from "@material-ui/icons/Fingerprint";
import LockOpen from "@material-ui/icons/LockOpen";

const pagesRoutes = [
  {
    path: "/pages/register-page",
    name: "Register Page",
    short: "Register",
    mini: "",
    icon: PersonAdd,
    component: RegisterPage
  },
  {
    path: "/pages/login-page",
    name: "Login Page",
    short: "Login",
    mini: "",
    icon: Fingerprint,
    component: LoginPage
  },
  {
    path: "/pages/lock-screen-page",
    name: "Lock Screen Page",
    short: "Lock",
    mini: "",
    icon: LockOpen,
    component: LockScreenPage
  },
  {
    redirect: true,
    path: "/pages",
    pathTo: "/pages/register-page",
    name: "Register Page"
  }
];

export default pagesRoutes;
