import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import SideBar from "../components/Navbar/SideBar";

const HomeRoot = () => {
  return (
    <>
      {/* <Navbar /> */}
      <SideBar />
      <main>
        <Outlet />
      </main>
    </>
  );
};
export default HomeRoot;
