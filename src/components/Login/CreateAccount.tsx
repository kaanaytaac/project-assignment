import { useState, useEffect } from "react";
import Create from "./CreateAccount.module.css";
import * as Bucket from "@spica-devkit/bucket";
import useCreateAccountStore from "../../store/store";
import { dataService } from "../../services/api/Data";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { sendMail } from "../sendmail/sendMail";
import { log } from "console";
import authService from "../../services/api/Authentication";

const CreateAccount = () => {
  const { users, setUsers, enteredValues, setEnteredValues, setVerificationNumber } = useCreateAccountStore();

  const navigate = useNavigate();

  const checkValidity: boolean = users.some((user) => {
    return user.email === enteredValues.email;
  });

  const emailIsValid: boolean = !checkValidity && enteredValues.email.includes("@gmail.com");
  const passwordIsValid: boolean = enteredValues.password.trim().length > 6;

  function handleInputChange(identifier: string, value: string) {
    setEnteredValues({
      ...enteredValues,
      [identifier]: value,
    });
  }
  function getNumber() {
    const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    const codeLength = 6;
    function getRandomNumber() {
      return Math.floor(Math.random() * numbers.length);
    }
    let verificationCode: string = "";
    for (let i = 0; i < codeLength; i++) {
      verificationCode += numbers[getRandomNumber()];
    }
    setVerificationNumber(verificationCode);
    return verificationCode;
  }

  function handleSubmit(event: any) {
    event.preventDefault();
    if (emailIsValid && passwordIsValid) {
      setUsers([...users, enteredValues]);
      sendMail(enteredValues.email, getNumber());
      navigate("/signup/verification");
    } else {
      alert("You provide an wrong information.");
    }
  }

  return (
    <form className={Create.container} onSubmit={handleSubmit}>
      <div className={Create.items}>
        <div className={Create.head}>Better Work With Us</div>
        <div className={Create.inputs}>
          <p>
            <label htmlFor="name">Name and Surname</label>
            <input
              className={Create.input}
              type="name"
              id="name"
              name="name"
              placeholder="Your name and surname"
              onChange={(event) => handleInputChange("name", event.target.value)}
              value={enteredValues.name}
              required
            />
          </p>

          <p>
            <label htmlFor="email">Email</label>
            <input
              className={Create.input}
              id="email"
              type="email"
              name="email"
              // onBlur={() => handleInputBlur("email")}
              placeholder="Please enter your e-mail"
              onChange={(event) => handleInputChange("email", event.target.value)}
              value={enteredValues.email}
              required
            />
          </p>
          {!emailIsValid && <p>Please enter a valid gmail address.</p>}
          <p>
            <label htmlFor="password">Password</label>
            <input
              className={Create.input}
              id="password"
              type="password"
              name="password"
              placeholder="Please enter your password"
              onChange={(event) => handleInputChange("password", event.target.value)}
              // onBlur={() => handleInputBlur("password")}
              value={enteredValues.password}
              required
            />
          </p>
          {!passwordIsValid && <p>Please enter more than 6 characters.</p>}
        </div>
        <div className={Create.actions}>
          <button className={Create.create}>Create a new account</button>
        </div>
      </div>
    </form>
  );
};
export default CreateAccount;
