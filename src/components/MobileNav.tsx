import { useLocation, Link } from "react-router-dom";

import { mobileNavMenus } from "../constants";

export default function MobileNav() {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 z-[999] block w-full border-t sm:hidden">
      <div className="flex justify-between bg-white px-3 py-1">
        {mobileNavMenus.map((item, i) => {
          return (
            <Link key={i} to={item.path} className="relative">
              <div
                className={`rounded-full p-3 ${
                  item.path === location.pathname ? "invisible" : ""
                }`}
              >
                {item.icon}
              </div>

              {item.path === location.pathname && (
                <>
                  {/* <div className="absolute -top-1 h-2 w-full rounded-b-full bg-black p-3" /> */}
                  <div className="absolute -top-5 left-1/2 flex -translate-x-1/2 justify-center rounded-full bg-primary p-3">
                    {item.filledIcon}
                  </div>
                </>
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
