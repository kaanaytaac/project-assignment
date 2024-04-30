import { Outlet } from "react-router-dom";
import SideBar from "../components/Navbar/SideBar";

const HomeRoot = () => {
  return (
    <div>
      <SideBar />
      <main style={{ marginLeft: "150px", marginTop: "2rem" }}>
        <Outlet />
      </main>
    </div>
  );
};
export default HomeRoot;
