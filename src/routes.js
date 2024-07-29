import { Signup } from "./pages/signup";
import { Flight } from "./pages/flight";
import { OTPVerification } from "./pages/otp-verification";
import { Login } from "./pages/login";
import { Logout } from "./pages/logout";
import { AuthGaurd } from "./components/AuthGaurd";
import { PublicRoute } from "./components/PublicRoute";
import { ResponsiveAppBar } from "./components/Appbar";
import { ListFlight } from "./pages/list-flight";
import { Passenger } from "./pages/passenger";
import { Welcome } from "./pages/Welcome";

export const routes = [
  {
    path: "/",
    element: <ResponsiveAppBar />,
    children: [
      {
        path: "/",
        element: (
          <AuthGaurd>
            <Welcome />
          </AuthGaurd>
        ),
      },
      {
        path: "signup",
        element: (
          <PublicRoute>
            <Signup />
          </PublicRoute>
        ),
      },
      {
        path: "login",
        element: (
          <PublicRoute>
            <Login />
          </PublicRoute>
        ),
      },
      {
        path: "logout",
        element: (
          <AuthGaurd>
            <Logout />
          </AuthGaurd>
        ),
      },
      {
        path: "otp-verification",
        element: (
          <AuthGaurd>
            <OTPVerification />
          </AuthGaurd>
        ),
      },
      {
        path: "flight",
        element: (
          <AuthGaurd>
            <Flight />
          </AuthGaurd>
        ),
      },
      {
        path: "passenger",
        element: (
          <AuthGaurd>
            <Passenger />
          </AuthGaurd>
        ),
      },
      {
        path: "list-flight",
        element: (
          <AuthGaurd>
            <ListFlight />
          </AuthGaurd>
        ),
      },
    ],
  },
];
