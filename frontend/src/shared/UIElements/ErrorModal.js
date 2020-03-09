import React from "react";

import Modal from "./Modal";
import Button from "./Button";

const ErrorModal = props => {
  return (
    <Modal
      onCancel={props.onClear}
      header="Something went wrong"
      show={!!props.error}
      footer={
        <Button id="modal-button" onClick={props.onClear}>
          Okay
        </Button>
      }
    >
      <p>{props.error}</p>
    </Modal>
  );
};

export default ErrorModal;
