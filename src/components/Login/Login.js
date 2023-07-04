import React, { useState, useReducer } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";

const emailReducer = (state, action) => {
  if (action.type === "EMAIL_USER_INPUT") {
    return { value: action.val, isValid: action.val.includes("@") };
  }
  if (action.type === "EMAIL_ON_BLUR") {
    console.log("value: " + state.value + " " + state.isValid);
    return { value: state.value, isValid: state.value.includes("@") };
  }
  return { value: "", isValid: false };
};

const pwdReducer = (state, action) => {
  if (action.type === "PWD_USER_INPUT") {
    return { value: action.val, isValid: action.val.trim().length > 6 };
  }
  if (action.type === "PWD_ON_BLUR") {
    return { value: state.value, isValid: state.value.trim().length > 6 };
  }
  return { value: "", isValid: false };
};

const Login = (props) => {
  //const [enteredEmail, setEnteredEmail] = useState("");
  //const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState("");
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: null,
  });

  const [pwdState, dispatchPwd] = useReducer(pwdReducer, {
    value: "",
    isValid: null,
  });

  // useEffect(() => {
  //   const timerID = setTimeout(() => {
  //     console.log("checking form validity");
  //     setFormIsValid(
  //       enteredEmail.includes("@") && enteredPassword.trim().length > 6
  //     );
  //   }, 1000);

  //   return () => {
  //     console.log("CLEAN UP");
  //     clearTimeout(timerID);
  //   };
  // }, [enteredEmail, enteredPassword]);

  const emailChangeHandler = (event) => {
    dispatchEmail({ type: "EMAIL_USER_INPUT", val: event.target.value });
    setFormIsValid(emailState.isValid && pwdState.isValid);
  };

  const passwordChangeHandler = (event) => {
    dispatchPwd({ type: "PWD_USER_INPUT", val: event.target.value });
    setFormIsValid(emailState.isValid && event.target.value.trim().length > 6);
  };

  const onBlurEmailHandler = () => {
    console.log("on blur email handler");
    dispatchEmail({ type: "EMAIL_ON_BLUR" });
    setFormIsValid(emailState.isValid && pwdState.isValid);
  };

  const onBlurPasswordHandler = () => {
    dispatchPwd({ type: "PWD_ON_BLUR" });
    setFormIsValid(pwdState.isValid && emailState.isValid);
  };

  const onClickHandler = () => {
    console.log("click");
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, pwdState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onClick={onClickHandler}
            onBlur={onBlurEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            pwdState.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={pwdState.value}
            onChange={passwordChangeHandler}
            onBlur={onBlurPasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
