import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import { UserIcon, VerifiedIcon } from "../assets/icons";

import { TweetType } from "../types";

type TweetPropsType = {
  tweet: TweetType;
};

export default function Tweet({ tweet }: TweetPropsType) {
  const [isMobile, setIsMobile] = React.useState<boolean>(false);

  React.useEffect(() => {
    const checkIsMobile = () => {
      const isMobileDevice = window.innerWidth <= 768;
      setIsMobile(isMobileDevice);
    };

    checkIsMobile();

    window.addEventListener("resize", checkIsMobile);

    return () => {
      window.removeEventListener("resize", checkIsMobile);
    };
  }, []);

  return (
    <main className="border-b px-5 py-3">
      <div className="flex items-start gap-x-3 overflow-hidden">
        {tweet?.user.avatar ? (
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/JavaScript-logo.png/800px-JavaScript-logo.png"
            alt="Profile pict"
            width={50}
            height={50}
            className="h-10 w-10 rounded-full md:h-12 md:w-12"
          />
        ) : (
          <div className="h-12 w-12">
            <UserIcon size={50} color="#536471" />
          </div>
        )}

        <div className="relative w-full">
          <div className="mb-2 items-center gap-x-1 md:mb-0 md:flex">
            <span className="flex items-center gap-x-1 text-lg font-semibold">
              {tweet?.user.name}{" "}
              <VerifiedIcon size={20} color={"rgb(29, 155, 240)"} />
            </span>
            <span className="font-medium text-label">
              @{tweet?.user.username}
            </span>
          </div>
          <p className="mb-1 text-label">{tweet?.text}</p>
          <p className="mb-3 text-primary">
            {tweet?.hastags.map((hashtag) => (
              <span key={hashtag}>#{hashtag}</span>
            ))}
          </p>

          <section className="md:max-w-[45vw]">
            {tweet?.media.length === 1 ? (
              <div>
                <img
                  src={tweet?.media[0]}
                  alt="Cyberpunk city"
                  className="w-full rounded-2xl"
                />
              </div>
            ) : (
              <Swiper
                spaceBetween={isMobile ? 10 : 20}
                slidesPerGroup={1}
                slidesPerView={isMobile ? 1.5 : 1.8}
              >
                <div>
                  {tweet?.media.map((me, i) => (
                    <SwiperSlide key={i}>
                      <div>
                        <img
                          key={i}
                          src={me}
                          alt="Cyberpunk city"
                          className="h-[14rem] w-full rounded-2xl md:h-[20rem]"
                        />
                      </div>
                    </SwiperSlide>
                  ))}
                </div>
              </Swiper>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
