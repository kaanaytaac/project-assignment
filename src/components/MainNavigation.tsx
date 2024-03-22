import { NavLink } from "react-router-dom";
import classes from "./MainNavigation.module.css";
const MainNavigation = () => {
  return (
    <header className={classes.header}>
      <nav style={{ width: "100%" }}>
        <ul className={classes.list}>
          <li>
            <NavLink
              to="/signin"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              Sign in
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/signup"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              Sign up
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};
export default MainNavigation;
