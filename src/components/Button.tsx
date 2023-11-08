import { ButtonPropsType } from "../types";

export default function Button({
  type,
  text,
  variant,
  icon,
  iconPosition,
  disabled = false,
  className = "",
  onClick,
}: ButtonPropsType) {
  const variantStyle =
    variant === "primary"
      ? "bg-primary text-white"
      : variant === "secondary"
      ? "bg-secondary text-white hover:bg-black/80"
      : variant === "outline-primary"
      ? "border border-solid border-primary text-primary"
      : "border border-solid border-[#dadce0] text-secondary hover:bg-black/5";

  return (
    <button
      type={type}
      className={`${variantStyle} flex items-center justify-center gap-x-3 rounded-full px-5 py-2 transition-colors duration-300 ease-in-out ${
        disabled ? "pointer-events-none opacity-50" : "hover:brightness-90"
      } ${className}`}
      onClick={onClick}
    >
      {iconPosition === "left" && <span>{icon}</span>}
      <span>{text}</span>
      {iconPosition === "right" && <span>{icon}</span>}
    </button>
  );
}
