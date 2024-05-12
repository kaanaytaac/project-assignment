import { Outlet, useNavigate } from "react-router-dom";
import SideBar from "../components/Navbar/SideBar";
import { useEffect } from "react";
import useCreateAccountStore from "../store/store";
import { dataService } from "../services/api/Data";
import authService from "../services/api/Authentication";
const HomeRoot = () => {
  const { currentUser, setCurrentUser } = useCreateAccountStore();

  const navigate = useNavigate();
  useEffect(() => {
    const user: string | null = localStorage.getItem("user");
    const userObject = JSON.parse(user || "{}");
    dataService
      .getDataAll("65ef137ca1ccd0002cea9989", { filter: { "email": { "$eq": userObject.identifier } } })
      .then((users: any) => {
        if (users[0]) {
          const user = users[0];
          if (user.ispassive) {
            authService.logOut();
            alert("your account is on hold");
            navigate("/signin");
          }

          setCurrentUser(users[0]);
        } else {
          console.log("no user with a provided e-mail");
        }
      })
      .catch((err) => console.log(err));
  }, []);
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
