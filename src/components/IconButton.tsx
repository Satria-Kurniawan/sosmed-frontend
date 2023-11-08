import { IconButtonPropsType } from "../types";

export default function IconButton({ icon, onClick }: IconButtonPropsType) {
  return (
    <button
      type="button"
      className="rounded-full p-2 hover:bg-black/5"
      onClick={onClick}
    >
      {icon}
    </button>
  );
}
