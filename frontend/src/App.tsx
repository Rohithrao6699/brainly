import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import { Signin } from "./pages/Signin";
import { Signup } from "./pages/Signup";
import { Dashboard } from "./pages/Dashboard";
import { JSX } from "react";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

function ProtectedRoute(): JSX.Element {
  const token: string | null = localStorage.getItem("token");
  return token ? <Outlet /> : <Navigate to="/signin" />;
}

//JSX.Element -->
//"jsx": "react-jsx",
// "types": ["react"],
//add these 2 in tsconfig.node.json under compiler options

export default App;
