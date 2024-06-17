import classes from "./Sidebar.module.css";
import { useEffect, useState } from "react";
import { IoMdMenu } from "react-icons/io";
import { Link } from "react-router-dom";
import * as Bucket from "@spica-devkit/bucket";
import Upload from "../../pages/Upload/Upload";
import Tasks from "../../pages/Tasks/Tasks";
import Admin from "../../pages/Admin/Admin";
import useCreateAccountStore from "../../store/store";
type Page = { root: string; name: string };
type Pages = { patient: Page; doctor: Page; admin: Page };

const pages: Pages = {
  patient: { root: "/home/upload", name: "Upload" },
  doctor: { root: "/home/tasks", name: "Tasks" },
  admin: { root: "/home/admin", name: "Admin" },
};

const SideBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { currentUser } = useCreateAccountStore();

  const role: keyof Pages = currentUser.role;

  const currentRoot: string | undefined = pages[role]?.root || "/home";
  const currentName: string | undefined = pages[role]?.name || "";
  function toggleSidebar() {
    setIsOpen((prevOpen) => !prevOpen);
  }

  const sidebarClass = isOpen ? `${classes.sidebar} ${classes.open}` : classes.sidebar;

  const divStyle = isOpen ? { transform: "translateX(125px)", transition: "all 0.3s ease" } : { transition: "all 0.3s ease" };
  return (
    <>
      <div className={classes.container}>
        <div style={divStyle}>
          <button className={classes.toggleBtn} onClick={toggleSidebar}>
            <span>
              <IoMdMenu />
            </span>{" "}
            {/* {isOpen ? "Close" : "Open"} Sidebar */}
          </button>
        </div>

        <div className={sidebarClass}>
          <ul className={classes.menu}>
            <li className={classes.links}>
              <Link to="/home">Home</Link>
            </li>
            <li className={classes.links}>
              <Link to={currentRoot}>{currentName}</Link>
            </li>
            {role === "admin" ? (
              <li className={classes.links}>
                <Link to="/home/report">Report</Link>
              </li>
            ) : undefined}

            <li className={classes.links}>
              <Link to="#">Contact</Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};
export default SideBar;
