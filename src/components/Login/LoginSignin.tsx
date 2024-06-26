import { useState } from "react";
import Login from "./Login.module.css";
import { Link, useNavigate } from "react-router-dom";
import { dataService } from "../../services/api/Data";
import { Outlet } from "react-router-dom";
import authService from "../../services/api/Authentication";
import useCreateAccountStore from "../../store/store";
import { AxiosError } from "axios";
import Spinner from "../Spinner";

const LoginSignin = () => {
  const [loginValues, setLoginValues] = useState<{ email: string; password: string }>({
    email: "",
    password: "",
  });
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const navigate = useNavigate();

  function handleInputChange(identifier: string, value: string) {
    setLoginValues({
      ...loginValues,
      [identifier]: value,
    });
  }
  async function handleSubmit(event: any) {
    event.preventDefault();
    setIsLoggingIn(true);

    try {
      const signInResponse = await authService.signIn({ email: loginValues.email, password: loginValues.password });
      if (signInResponse) {
        navigate("/home");
      }
    } catch (error: any) {
      alert("your email or password is wrong");
      setIsLoggingIn(false);
      console.log(error?.response.data);
    }

    return;
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
              onChange={(e) => handleInputChange("email", e.target.value)}
              value={loginValues.email}
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
              onChange={(e) => handleInputChange("password", e.target.value)}
              value={loginValues.password}
            />
          </p>
        </div>
        <div className={Login.actions}>
          <Link to="/signup" className={Login.create}>
            Create a new account
          </Link>
          {isLoggingIn ? (
            <div style={{ marginLeft: "4px" }} className={Login.spinner}>
              <Spinner />
            </div>
          ) : (
            <button className={Login.sign}>SIGN IN</button>
          )}
        </div>
      </div>
    </form>
  );
};
export default LoginSignin;
