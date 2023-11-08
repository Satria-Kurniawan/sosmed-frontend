import React from "react";
import { TextInputPropsType } from "../types";

export default function TextInput({
  label,
  icon,
  errorMessage,
  onIconClick,
  ...inputProps
}: TextInputPropsType) {
  const [focused, setFocused] = React.useState<boolean>(false);
  const [done, setDone] = React.useState<boolean>(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (inputRef.current && done) inputRef.current.setAttribute("done", "true");
  }, [done]);

  return (
    <div className="relative w-full">
      {(focused || inputRef.current?.value) && (
        <label
          className={`absolute -top-3 left-3 bg-white px-3 ${
            focused ? "text-primary" : "text-label"
          } `}
        >
          {label}
        </label>
      )}
      <input
        ref={inputRef}
        {...inputProps}
        className={`w-full rounded-[0.25rem] border border-solid border-[#dadce0] px-4 py-3.5 text-lg focus:outline-primary ${
          focused && "placeholder-transparent"
        }`}
        onFocus={() => setFocused(true)}
        onBlur={() => {
          setFocused(false);
          setDone(true);
        }}
      />
      <div
        className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
        onClick={onIconClick}
      >
        {icon}
      </div>
      <span className="hidden text-danger">{errorMessage}</span>
    </div>
  );
}
