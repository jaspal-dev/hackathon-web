import { Navigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const AuthGaurd = ({ children }) => {
  const location = useLocation();
  const authorization = localStorage.getItem("authorization");
  const user = JSON.parse(localStorage.getItem("user") ?? "{}");
  if (authorization && user) {
    if (!user.isEmailVerified || !user.isPhoneNumberVerified) {
      if (
        location.pathname === "/otp-verification" ||
        location.pathname === "/logout"
      ) {
        return <>{children}</>;
      } else {
        return <Navigate to="/otp-verification" />;
      }
    }
    return <>{children}</>;
  }
  return <Navigate to="/login" replace={true} />;
};

export default AuthGaurd;
