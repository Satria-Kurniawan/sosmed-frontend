import SpinnerSVG from "../assets/spinner.svg";

export default function Spinner() {
  return (
    <div className="flex items-center justify-center">
      <img src={SpinnerSVG} alt="Spinner" width={50} height={50} />
    </div>
  );
}
