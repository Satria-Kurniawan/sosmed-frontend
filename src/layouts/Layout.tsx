import { Outlet } from "react-router-dom";

import SideNav from "../components/SideNav";
import MobileNav from "../components/MobileNav";

export default function Layout() {
  return (
    <div className="container mx-auto flex">
      <SideNav />
      <MobileNav />
      <main className="w-full">
        <Outlet />
      </main>
    </div>
  );
}
