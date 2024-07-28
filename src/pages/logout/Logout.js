import { Navigate } from "react-router-dom";

const Logout = () => {
  localStorage.removeItem("authorization");
  localStorage.removeItem("user");
  return <Navigate to="/login" />;
};

export default Logout;
