import classes from "./Sidebar.module.css";
import { useEffect, useState } from "react";
import { IoMdMenu } from "react-icons/io";
import { Link } from "react-router-dom";
import * as Bucket from "@spica-devkit/bucket";
const SideBar = () => {
  const [isOpen, setIsOpen] = useState(false);

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
              <Link to="#">Home</Link>
            </li>
            <li className={classes.links}>
              <Link to="/home/tasks">Tasks</Link>
            </li>
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
