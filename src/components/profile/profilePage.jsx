import React, { useState } from "react";
import registerService from "../registration/registerService";
import DeleteModal from "./deleteModal";
import ProfileForm from "./profileForm";
import useUser from "../hooks/useUser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotateRight } from "@fortawesome/free-solid-svg-icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const ProfilePage = () => {
  const [isModalActive, setIsModalActive] = useState(false);
  const handleCloseModal = () => setIsModalActive(false);
  const handleOpenModal = () => setIsModalActive(true);

  const updateUserMutation = useMutation(registerService.updateUserAvatar);
  const queryClient = useQueryClient();

  const handleChangeAvatar = () => {
    updateUserMutation.mutate("", {
      onSuccess: () => {
        queryClient.invalidateQueries(["user"]);
      },
    });
  };

  const deleteUserMutation = useMutation(registerService.deleteUser);
  const handleDelete = () => {
    deleteUserMutation.mutate("", {
      onSuccess: () => (window.location = "/logout"),
      onError: (ex) => console.log(ex),
    });
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
          <img src={user.avatar} alt="avatar" className="avatar" />
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
