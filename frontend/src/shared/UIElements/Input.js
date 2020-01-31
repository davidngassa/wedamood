import React, { useReducer, useEffect } from "react";

import { MdError } from "react-icons/md";
import { validate } from "../Util/validators";
import "./Input.css";

const inputReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE":
      return {
        ...state,
        value: action.val,
        isValid: validate(action.val, action.validators)
      };

    case "TOUCH":
      return {
        ...state,
        isTouched: true
      };

    default:
      return state;
  }
};

const Input = props => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.value || "",
    isTouched: false,
    isValid: props.valid || false
  });

  const { id, onInput } = props;
  const { value, isValid } = inputState;

  useEffect(() => {
    onInput(id, inputState.value, inputState.isValid);
  }, [id, value, isValid, onInput, inputState.value, inputState.isValid]);

  const changeHandler = event => {
    dispatch({
      type: "CHANGE",
      val: event.target.value,
      validators: props.validators
    });
  };

  const touchHandler = () => {
    dispatch({
      type: "TOUCH"
    });
  };

  const determinePlaceholder = type => {
    switch (type) {
      case "email":
        return "johndoe@email.com";
      case "password":
        return "It will be your secret";
      case "text":
        return "John Doe";
      default:
        return null;
    }
  };

  return (
    <div
      className={`form-control ${!inputState.isValid &&
        inputState.isTouched &&
        "form-control--invalid"}`}
    >
      <div className="input-header">
        <p className="input-title">{props.placeholder}</p>
        {!inputState.isValid && inputState.isTouched && (
          <div className="input-error">
            <MdError />
            <p>{props.errorText}</p>
          </div>
        )}
      </div>

      <input
        autoCorrect="off"
        id={props.id}
        type={props.type}
        placeholder={determinePlaceholder(props.type)}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={inputState.value}
      />
    </div>
  );
};

export default Input;
