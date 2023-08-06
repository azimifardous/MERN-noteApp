const DeleteBtn = ({ onOpenModal }) => {
  return (
    <button type="button" onClick={onOpenModal} className="authBtn deleteAcc">
      Delete Account
    </button>
  );
};

export default DeleteBtn;
