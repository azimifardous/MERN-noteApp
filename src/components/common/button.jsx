const Button = ({ label, isValid }) => {
  return (
    <button type="submit" disabled={isValid} className="authBtn mt-0">
      {label}
    </button>
  );
};

export default Button;
