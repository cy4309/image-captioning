const BaseButton = ({
  label,
  className,
  onClick,
  children,
  disabled,
  type = "button",
}) => {
  return (
    <button
      className={`py-2 px-6 cursor-pointer inline-flex justify-center items-center border transition-colors duration-150 rounded-xl ${
        disabled ? "cursor-not-allowed opacity-30" : ""
      } ${className}`}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {/* {label || children} */}
      {children ?? label}
    </button>
  );
};

export default BaseButton;
