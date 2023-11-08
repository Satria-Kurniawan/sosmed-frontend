import { ThreeDotsIcon } from "../assets/icons";

export default function Tren() {
  const TrenItem = () => {
    return (
      <div className="flex justify-between">
        <section className="flex flex-col gap-y-[0.1rem]">
          <div className="flex items-center gap-x-1 text-sm font-medium text-label">
            <span>1</span>
            <div className="h-[2px] w-[2px] rounded-full bg-secondary" />
            <span>Tren seluruh dunia</span>
          </div>
          <h1 className="font-semibold">#SquidGrowEth</h1>
          <p className="text-sm text-label">12,5 rb Tweet</p>
        </section>
        <section className="mt-2">
          <ThreeDotsIcon size={20} />
        </section>
      </div>
    );
  };

  return (
    <div className="rounded-2xl bg-tertiary px-5 py-3">
      <TrenItem />
    </div>
  );
}
