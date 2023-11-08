import { HeaderPropsType } from "../types";

export default function Header({ title, children }: HeaderPropsType) {
  return (
    <header className="sticky top-0 z-20 bg-white/80 backdrop-blur-sm">
      <h1 className="px-5 py-3 text-xl font-semibold">{title}</h1>
      <section>{children}</section>
    </header>
  );
}
