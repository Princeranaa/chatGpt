import React, { useEffect } from "react";
import { RouterProvider } from "react-router";
import { router } from "./app.routes.jsx";
import { useAuth } from "../features/auth/hook/useAuth.js";

const App = () => {

  const auth = useAuth();

  useEffect(() => {
    auth.handlGetme();
  }, []);

  return <RouterProvider router={router} />;
};

export default App;
