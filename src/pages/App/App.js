import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { routes } from "./../../routes";
import { Bounce, ToastContainer } from "react-toastify";

const router = createBrowserRouter(routes);

const App = () => {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Bounce}
      />
      <RouterProvider router={router} />
    </>
  );
};

export default App;
