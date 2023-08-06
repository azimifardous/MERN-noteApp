const Input = ({ data, onChange, name, label, value, type = "text" }) => {
  const { user, errors } = data;
  const error = errors[name];
  return (
    <div className="w-full text-sm mb-6">
      <label className="authLabel">{label}</label>
      <input
        className="authInput disabled:bg-gray-100"
        name={name}
        type={type}
        value={user[name] || value}
        onChange={onChange}
        disabled={value ? true : false}
      />
      {error && (
        <p className="error">
          <span className="font-medium">Oh, snapp!</span> {error}
        </p>
      )}
    </div>
  );
};

export default Input;
