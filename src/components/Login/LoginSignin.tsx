import { useRef, useState } from "react";
import Login from "./Login.module.css";
import { Link, useNavigate } from "react-router-dom";
import { dataService } from "../../services/api/Data";
import { Outlet } from "react-router-dom";
import useCreateAccountStore from "../../store/store";

const LoginSignin = () => {
  const [emailIsInvalid, setEmailIsInvalid] = useState();
  const [passwordIsInvalid, setPasswordIsInvalid] = useState();
  const { users, setUsers } = useCreateAccountStore();
  console.log(users);
  const navigate = useNavigate();

  function navigateHandler() {
    navigate("/signup");
  }
  function navbarHandler() {
    navigate("/home");
  }

  function handleSubmit(event: any) {
    event.preventDefault();
  }

  return (
    <form onSubmit={handleSubmit} className={Login.container}>
      <div className={Login.items}>
        <div className={Login.head}>Better Work With Us</div>
        <div className={Login.inputs}>
          <p>
            <label htmlFor="email">Email</label>

            <input
              className={Login.input}
              id="email"
              name="email"
              type="email"
              placeholder="Please enter your e-mail"
              // onChange={(event) =>
              //   handleInputChange("email", event.target.value)
              // }
            />
          </p>
          <p>
            <label htmlFor="password">Password</label>
            <input
              className={Login.input}
              type="password"
              id="password"
              name="password"
              placeholder="Please enter your password"
              minLength={6}

              // onChange={(event) =>
              //   handleInputChange("password", event.target.value)
              // }
            />
          </p>
        </div>
        <div className={Login.actions}>
          <Link to="/signup" className={Login.create}>
            Create a new account
          </Link>
          <button
            className={Login.sign}
            //  onClick={navbarHandler}
          >
            SIGN IN
          </button>
        </div>
        {emailIsInvalid || passwordIsInvalid ? <div className={Login.popup}>Your email or password is invalid!</div> : undefined}
      </div>
    </form>
  );
};
export default LoginSignin;
