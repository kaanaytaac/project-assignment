import Nav from "./Nav.module.css";

const Navbar = () => {
  return (
    <nav className={Nav.navigator}>
      <div className={Nav.listItemContainer}>
        <ul className={Nav.listItems}>
          <li className={Nav.singleItem}>
            <a href="">Home</a>
          </li>
          <li className={Nav.singleItem}>
            <a href="">About</a>
          </li>
          <li className={Nav.singleItem}>
            <a href="">Tasks</a>
          </li>
          <li className={Nav.singleItem}>
            <a href="">Help</a>
          </li>
        </ul>
      </div>
    </nav>
  );
};
export default Navbar;
