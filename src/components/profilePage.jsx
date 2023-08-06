import React, { useState } from "react";
import registerService from "../services/registerService";
import DeleteModal from "./deleteModal";
import ProfileForm from "./profileForm";
import useUser from "./hooks/useUser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotateRight } from "@fortawesome/free-solid-svg-icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const ProfilePage = () => {
  const [isModalActive, setIsModalActive] = useState(false);
  const handleCloseModal = () => setIsModalActive(false);
  const handleOpenModal = () => setIsModalActive(true);

  const mutation = useMutation(registerService.updateUserAvatar);
  const queryClient = useQueryClient();

  const handleChangeAvatar = () => {
    mutation.mutate("", {
      onSuccess: () => {
        queryClient.invalidateQueries(["user"]);
      },
    });
  };

  const handleDelete = () => {
    // deleting the account
  };

  const { data: user, isLoading } = useUser();
  if (isLoading) return;

  return (
    <>
      <DeleteModal
        onDelete={handleDelete}
        handleClosingModal={handleCloseModal}
        isModalActive={isModalActive}
      />
      <h1 className="profileHeader">My Profile</h1>
      <div className="profileDiv">
        <div className="relative">
          <img src={user.data.avatar} alt="avatar" className="avatar" />
          <button className="avatarBtn" onClick={handleChangeAvatar}>
            <FontAwesomeIcon icon={faRotateRight} />
          </button>
        </div>
        <ProfileForm onOpenModal={handleOpenModal} />
      </div>
    </>
  );
};

export default ProfilePage;
