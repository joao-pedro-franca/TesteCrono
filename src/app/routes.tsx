import { createBrowserRouter } from "react-router";
import { SplashScreen } from "./components/auth/SplashScreen";
import { LoginScreen } from "./components/auth/LoginScreen";
import { SignupScreen } from "./components/auth/SignupScreen";
import { ForgotPasswordScreen } from "./components/auth/ForgotPasswordScreen";
import { Dashboard } from "./components/dashboard/Dashboard";
import { GamificationScreen } from "./components/gamification/GamificationScreen";
import { StatsScreen } from "./components/stats/StatsScreen";
import { ProfileScreen } from "./components/profile/ProfileScreen";
import { ShopScreen } from "./components/gamification/ShopScreen";
import { CoursesScreen } from "./components/courses/CoursesScreen";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: SplashScreen,
  },
  {
    path: "/login",
    Component: LoginScreen,
  },
  {
    path: "/signup",
    Component: SignupScreen,
  },
  {
    path: "/forgot-password",
    Component: ForgotPasswordScreen,
  },
  {
    path: "/dashboard",
    Component: Dashboard,
  },
  {
    path: "/gamification",
    Component: GamificationScreen,
  },
  {
    path: "/shop",
    Component: ShopScreen,
  },
  {
    path: "/stats",
    Component: StatsScreen,
  },
  {
    path: "/profile",
    Component: ProfileScreen,
  },
  {
    path: "/courses",
    Component: CoursesScreen,
  },
]);
