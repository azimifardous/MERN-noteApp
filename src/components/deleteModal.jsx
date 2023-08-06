import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";

const DeleteModal = ({ isModalActive, handleClosingModal, handleDelete }) => {
  return (
    <div className={isModalActive ? "visible" : "hidden"}>
      <div className="overlay active"></div>
      <div className="modal">
        <FontAwesomeIcon
          icon={faCircleExclamation}
          className="text-2xl sm:text-3xl mb-2"
        />
        <p className="text-sm sm:text-lg">
          Are you sure you want to delete your account?
        </p>
        <div className="text-sm flex justify-around w-full">
          <button
            onClick={handleDelete}
            className="authBtn bg-red-500 hover:bg-red-600"
          >
            Delete
          </button>
          <button onClick={handleClosingModal} className="authBtn">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
