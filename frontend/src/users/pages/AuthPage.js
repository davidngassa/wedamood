import React, { useState } from "react";

import "./AuthPage.css";
import Input from "../../shared/UIElements/Input";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH
} from "../../shared/Util/validators";
import { useForm } from "../../shared/hooks/form-hook";
import ErrorModal from "../../shared/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/UIElements/LoadingSpinner";
import AuthAnimation from "../components/AuthAnimation";
import Button from "../../shared/UIElements/Button";

const AuthPage = () => {
  const [isLoginMode, setIsLoginMode] = useState(true);

  const [formState, inputHandler, setFormData] = useForm({
    email: {
      value: "",
      isValid: false
    },
    password: {
      value: "",
      isValid: false
    }
  });

  // Switch between sign up and sign in
  const swicthModeHandler = () => {
    if (!isLoginMode) {
      setFormData(
        {
          username: undefined
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          username: {
            value: "",
            isValid: false
          }
        },
        false
      );
    }
    setIsLoginMode(prevMode => !prevMode);
  };

  // Submit form inputs
  const authSubmitHandler = event => {
    event.preventDefault();
    console.log(formState.inputs);
  };

  return (
    <div className="wrapper">
      <div className="auth-section__container">
        <div className="auth-section__header">
          <h1>{isLoginMode ? "Sign In" : "Sign Up"}</h1>

          <p>
            {isLoginMode
              ? "Welcome back! Login to SupWeather home."
              : "Sign up to create your SupWeather account."}
          </p>
          <p>
            {isLoginMode ? "Not registered yet?" : "Already registered?"}
            <button
              id="auth-page__switch-mode-button"
              onClick={swicthModeHandler}
            >
              {isLoginMode ? "Sign Up" : "Sign In"}
            </button>
          </p>
        </div>
        <form className="auth-page__form" onSubmit={authSubmitHandler}>
          {!isLoginMode && (
            <Input
              id="username"
              element="input"
              type="text"
              placeholder="Username"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter a user name"
              onInput={inputHandler}
            />
          )}

          <Input
            id="email"
            element="input"
            type="email"
            placeholder="E-Mail"
            validators={[VALIDATOR_EMAIL()]}
            errorText="Please enter a valid email"
            onInput={inputHandler}
          ></Input>
          <Input
            id="password"
            element="input"
            type="password"
            placeholder="Password"
            validators={[VALIDATOR_MINLENGTH(6)]}
            errorText="Password (at least 6 characters)"
            onInput={inputHandler}
          ></Input>
          <Button
            type="submit"
            className="auth-page__form__submit-button"
            disabled={!formState.isValid}
          >
            LET'S go
          </Button>
        </form>
      </div>
      <AuthAnimation />
    </div>
  );
};

export default AuthPage;
