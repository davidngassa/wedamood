import React, { useState, useContext } from "react";

import "./AuthPage.css";
import Input from "../../shared/UIElements/Input";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH
} from "../../shared/Util/validators";
import { AuthContext } from "../../shared/context/auth-context";
import { useForm } from "../../shared/hooks/form-hook";
import AuthAnimation from "../components/AuthAnimation";
import LoadingSpinner from "../../shared/UIElements/LoadingSpinner";
import Button from "../../shared/UIElements/Button";
import ErrorModal from "../../shared/UIElements/ErrorModal";

const AuthPage = () => {
  const auth = useContext(AuthContext);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: "",
        isValid: false
      },
      password: {
        value: "",
        isValid: false
      }
    },
    false
  );

  // Switch between sign up and sign in
  const swicthModeHandler = () => {
    if (!isLoginMode) {
      setFormData(
        {
          ...formState.inputs,
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
  const authSubmitHandler = async event => {
    event.preventDefault();

    setIsLoading(true);

    if (isLoginMode) {
      try {
        const response = await fetch("http://localhost:5000/api/users/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value
          })
        });

        const responseData = await response.json();

        if (!response.ok) {
          throw new Error(responseData.message);
        }

        setIsLoading(false);
        auth.login(responseData.userId, responseData.token);
      } catch (err) {
        setIsLoading(false);
        setError(err.message || "Something went wrong, please try again.");
      }
    } else {
      try {
        const response = await fetch("http://localhost:5000/api/users/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            username: formState.inputs.username.value,
            email: formState.inputs.email.value,
            password: formState.inputs.password.value
          })
        });

        const responseData = await response.json();

        if (!response.ok) {
          throw new Error(responseData.message);
        }

        setIsLoading(false);
        auth.login(responseData.userId, responseData.token);
      } catch (err) {
        setIsLoading(false);
        setError(err.message || "Something went wrong, please try again.");
      }
    }
  };

  const errorHandler = () => {
    setError(null);
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={errorHandler} />

      <div className="wrapper">
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <React.Fragment>
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
          </React.Fragment>
        )}
      </div>
    </React.Fragment>
  );
};

export default AuthPage;
