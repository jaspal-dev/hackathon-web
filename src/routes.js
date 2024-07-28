import { Signup } from "./pages/signup";
import { OTPVerification } from "./pages/otp-verification";
import { Login } from "./pages/login";
import { Logout } from "./pages/logout";
import { AuthGaurd } from "./components/AuthGaurd";
import { PublicRoute } from "./components/PublicRoute";
import { ResponsiveAppBar } from "./components/Appbar";

export const routes = [
  {
    path: "/",
    element: <ResponsiveAppBar />,
    children: [
      {
        path: "/",
        element: (
          <AuthGaurd>
            <div>Logged IN</div>
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
    ],
  },
];
