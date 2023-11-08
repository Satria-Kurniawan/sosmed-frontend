import React from "react";

import { SearchInputPropsType } from "../types";
import { CloseIcon, SearchIcon } from "../assets/icons";

export default function SearchInput({
  onChange,
  value,
  deleteValue,
}: SearchInputPropsType) {
  const inputRef = React.useRef<HTMLInputElement>(null);

  return (
    <div className="relative">
      <span className="absolute left-4 top-1/2 -translate-y-1/2">
        <SearchIcon size={20} />
      </span>
      <input
        type="text"
        placeholder="Cari di Vibegram"
        className="w-full rounded-full bg-tertiary px-12 py-2.5 focus:outline-primary"
        onChange={onChange}
        value={value}
        ref={inputRef}
      />
      {value.length > 0 && (
        <span
          className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer rounded-full bg-primary p-1.5"
          onClick={(event) => {
            deleteValue(event);
            inputRef.current?.focus();
          }}
        >
          <CloseIcon size={12} color="#fff" />
        </span>
      )}
    </div>
  );
}
