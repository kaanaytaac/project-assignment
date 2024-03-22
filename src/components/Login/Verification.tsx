import classes from "./Verification.module.css";
import authService from "../../services/api/Authentication";
import useCreateAccountStore from "../../store/store";
import { useState } from "react";
import { dataService } from "../../services/api/Data";
import { useNavigate } from "react-router-dom";
const Verification = () => {
  const { enteredValues, verificationNumber, setEnteredValues } = useCreateAccountStore();
  const [enteredCode, setEnteredCode] = useState();
  const navigate = useNavigate();
  function handleChange(e: any) {
    setEnteredCode(e.target.value);
  }
  function handleSubmit() {
    if (verificationNumber === enteredCode) {
      authService.signUp(enteredValues).then(function () {
        let document = {
          fullname: enteredValues.name,
          email: enteredValues.email,
          password: enteredValues.password,
        };

        dataService.insertData("65ef137ca1ccd0002cea9989", document);
        setEnteredValues({
          name: "",
          email: "",
          password: "",
        });
        navigate("/signin");
      });
    } else {
      alert("Your verification code does not match");
    }
  }
  return (
    <>
      <div className={classes.container}>
        <div>
          <label htmlFor="verification">Please provide your verification code.</label>
          <input className={classes.input} id="verification" onChange={handleChange} />
          <button onClick={handleSubmit}>submit</button>
        </div>
      </div>
    </>
  );
};
export default Verification;