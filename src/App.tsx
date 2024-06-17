import "./App.css";
import LoginSignin from "./components/Login/LoginSignin";
import CreateAccount from "./components/Login/CreateAccount";
import { dataService } from "./services/api/Data";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Root from "./pages/Root";
import HomeRoot from "./pages/HomeRoot";
import Verification from "./components/Login/Verification";
import Upload from "./pages/Upload/Upload";
import Tasks from "./pages/Tasks/Tasks";
import Admin from "./pages/Admin/Admin";
import Reports from "./pages/Reports/Reports";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { path: "/signin", element: <LoginSignin /> },
      { path: "/signup", element: <CreateAccount /> },
      { path: "/signup/verification", element: <Verification /> },
    ],
  },
  {
    path: "/home",
    element: <HomeRoot />,
    children: [
      { path: "/home/upload", element: <Upload /> },
      { path: "/home/tasks", element: <Tasks /> },
      { path: "/home/admin", element: <Admin /> },
      { path: "/home/report", element: <Reports /> },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
