import React from "react";
import { Link } from "react-router-dom";
import { MdAddCircle } from "react-icons/md";

import "./AddCityButton.css";

const AddCityButton = () => {
  return (
    <Link to="/search">
      <div className="add-button">
        <h1>Add City</h1>
        <div className="add-icon">
          <MdAddCircle size={100} />
        </div>
      </div>
    </Link>
  );
};

export default AddCityButton;
