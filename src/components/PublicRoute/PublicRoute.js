import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const authorization = localStorage.getItem("authorization");
  const user = JSON.parse(localStorage.getItem("user") ?? "{}");
  if (authorization && user) {
    return <Navigate to="/" replace={true} />;
  } else {
    return <>{children}</>;
  }
};

export default PublicRoute;
