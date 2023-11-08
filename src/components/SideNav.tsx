import { Link, useLocation } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useAuth } from "../hooks/useAuth";

import {
  BrandIcon,
  LockIcon,
  ThreeDotsIcon,
  TweetIcon,
  UserIcon,
} from "../assets/icons";
import Button from "./Button";
import IconButton from "./IconButton";
import Dropup from "./Dropup";

import { navMenus } from "../constants";

export default function SideNav() {
  const location = useLocation();
  const { state } = useAuthContext();
  const { signOut } = useAuth();

  return (
    <aside className="sticky top-0 z-30 hidden h-screen w-16 flex-col justify-between border-r bg-white p-2 sm:flex md:w-80 md:p-4 md:pr-10">
      <section>
        <div className="mb-3">
          <Link to="/">
            <IconButton icon={<BrandIcon size={35} color="#D000FF" />} />
          </Link>
        </div>
        <ul className="mb-6 flex w-full flex-col gap-y-5">
          {state?.authenticated ? (
            <>
              {navMenus.map((menu, i) => {
                return (
                  <li key={i}>
                    <Link
                      to={menu.path}
                      className="mx-auto flex w-fit items-center justify-center rounded-full p-2 hover:bg-black/5 md:mx-0 md:w-full md:justify-start"
                    >
                      <div className="inline-flex items-center gap-x-5">
                        <span>
                          {location.pathname === menu.path
                            ? menu.filledIcon
                            : menu.icon}
                        </span>
                        <span
                          className={`hidden text-[1.28rem] md:block ${
                            location.pathname === menu.path && "font-bold"
                          }`}
                        >
                          {menu.name}
                        </span>
                      </div>
                    </Link>
                  </li>
                );
              })}
              <div className="hidden md:block">
                <Button
                  text={"Tweet"}
                  variant="primary"
                  className="w-full py-[0.75rem] text-[1.1rem]"
                />
              </div>
              <div className="block md:hidden">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary">
                  <TweetIcon size={25} color="#fff" />
                </div>
              </div>
            </>
          ) : (
            <li>
              <Link
                to="/explore"
                className="flex items-center rounded-full p-2 hover:bg-black/5"
              >
                <div className="inline-flex items-center gap-x-5">
                  <span>{navMenus[1].filledIcon}</span>
                  <span className="hidden text-[1.28rem] font-bold md:block">
                    {navMenus[1].name}
                  </span>
                </div>
              </Link>
            </li>
          )}
        </ul>
      </section>
      {state?.authenticated && (
        <Dropup>
          <Dropup.Trigger>
            <div className="flex w-full items-center gap-x-3">
              <section className="h-fit w-12">
                {state.user?.avatar ? (
                  <>
                    <img
                      src={state.user?.avatar}
                      alt="Profile pict"
                      className="h-fit w-full rounded-full"
                      width={40}
                      height={40}
                    />
                  </>
                ) : (
                  <UserIcon size={40} color="#536471" />
                )}
              </section>
              <section className="hidden leading-5 md:block">
                <div className="flex items-center gap-x-1">
                  <span className="font-semibold">
                    {state.user?.name.substring(0, 8) + "..."}
                  </span>
                  <span>
                    <LockIcon size={18} />
                  </span>
                  <span className="ml-auto">
                    <ThreeDotsIcon size={20} />
                  </span>
                </div>
                <span className="text-label">{`@${state?.user?.username}`}</span>
              </section>
            </div>
          </Dropup.Trigger>
          <Dropup.Content className="w-[16rem]">
            <div className="cursor-pointer px-5 py-3 font-semibold hover:bg-black/5">
              Tambahkan akun yang sudah ada
            </div>
            <div
              onClick={signOut}
              className="cursor-pointer px-5 py-3 font-semibold hover:bg-black/5"
            >
              Keluar dari {state?.user?.username}
            </div>
          </Dropup.Content>
        </Dropup>
      )}
    </aside>
  );
}
