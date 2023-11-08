import React from "react";

type DropupContextType = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

type Props = {
  children: React.ReactNode;
  className?: string;
};

const DropupContext = React.createContext<DropupContextType>({
  open: false,
  setOpen: () => undefined,
});

const Dropup = ({ children }: Props) => {
  const [open, setOpen] = React.useState<boolean>(false);

  return (
    <DropupContext.Provider value={{ open, setOpen }}>
      <div className="relative">{children}</div>
    </DropupContext.Provider>
  );
};

const Trigger: React.FC<Props> = ({ children, className = "" }: Props) => {
  const { open, setOpen } = React.useContext(DropupContext);

  return (
    <div className={className}>
      <button
        className="w-full cursor-pointer rounded-full p-2 hover:bg-black/5"
        onClick={() => setOpen((open) => !open)}
      >
        {children}
      </button>
      {open && <div className="fixed inset-0" onClick={() => setOpen(false)} />}
    </div>
  );
};

const Content: React.FC<Props> = ({ children, className = "" }: Props) => {
  const { open, setOpen } = React.useContext(DropupContext);

  return (
    <>
      <div
        className={`absolute -top-[360%] w-fit rounded-2xl bg-white shadow-lg  duration-300 md:-top-[300%] ${
          !open ? "pointer-events-none translate-y-5 opacity-0" : "opacity-100"
        } ${className}`}
        onClick={() => setOpen(false)}
      >
        <main className="my-3 border-y">{children}</main>
      </div>
    </>
  );
};

Dropup.Trigger = Trigger;
Dropup.Content = Content;

export default Dropup;
