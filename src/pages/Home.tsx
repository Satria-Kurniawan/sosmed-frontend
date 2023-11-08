import React, { ChangeEvent } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useFetch } from "../hooks/useFetch";
import EmojiPicker from "emoji-picker-react";

import {
  // ControllIcon,
  EmoteIcon,
  GifIcon,
  LocationIcon,
  MediaIcon,
  // ScheduleIcon,
  UserIcon,
  CloseIcon,
} from "../assets/icons";
import Header from "../components/Header";
import Tweet from "../components/Tweet";
import Button from "../components/Button";
import SearchInput from "../components/SearchInput";
import Tren from "../components/Tren";

import { TweetType } from "../types";

export default function Home() {
  const [activeMenu, setActiveMenu] = React.useState<string>("Untuk Anda");
  const [tweet, setTweet] = React.useState<string>("");
  const [searchQuery, setSearchQuery] = React.useState<string>("");
  const { state } = useAuthContext();
  const [files, setFiles] = React.useState<FileList | null>(null);
  const [showEmojiPicker, setShowEmojiPicker] = React.useState<boolean>(false);
  const [location, setLocation] = React.useState<string>("");

  const emojiPickerRef = React.useRef<HTMLDivElement>(null);

  const menus = ["Untuk Anda", "Mengikuti"];

  const { data } = useFetch<{ tweets: TweetType[] }>("api/tweet/all");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("test");
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    setFiles(selectedFiles);
  };

  const createFileList = (files: File[]): FileList => {
    const dataTransfer = new DataTransfer();
    files.forEach((file) => dataTransfer.items.add(file));
    return dataTransfer.files;
  };

  const handleRemoveImage = (index: number) => {
    if (files) {
      const updatedFiles = Array.from(files);
      updatedFiles.splice(index, 1);
      setFiles(createFileList(updatedFiles));
    }
  };

  const handleOutsideClickEmojiPicker = (event: MouseEvent) => {
    if (
      emojiPickerRef.current &&
      !emojiPickerRef.current.contains(event.target as Node)
    ) {
      setShowEmojiPicker(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener("click", handleOutsideClickEmojiPicker);
    return () => {
      document.removeEventListener("click", handleOutsideClickEmojiPicker);
    };
  }, []);

  const handleClickLocationPicker = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          const apiUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;

          fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => {
              const address = data.display_name;
              setLocation(address);
            })
            .catch((error) => {
              console.error("Gagal mendapatkan nama daerah:", error);
            });
        },
        (error) => {
          console.error("Gagal mendapatkan lokasi:", error);
        }
      );
    } else {
      console.error("Geolocation tidak didukung di peramban ini.");
    }
  };

  return (
    <main className="flex min-h-screen">
      <section className="w-full border-x md:w-[65%]">
        <Header title="Beranda">
          <div className="mb-3 grid grid-cols-2 border-b">
            {menus.map((menu) => {
              return (
                <div
                  key={menu}
                  className="relative cursor-pointer"
                  onClick={() => setActiveMenu(menu)}
                >
                  <div className="absolute bottom-0 left-0 right-0 top-0 z-10 opacity-10 hover:bg-black/50" />
                  <div
                    className={`relative mx-auto w-fit py-4 font-medium ${
                      activeMenu === menu && "font-semibold"
                    }`}
                  >
                    {menu}
                    {activeMenu === menu && (
                      <hr className="absolute bottom-0 h-1 w-full rounded-full bg-primary" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </Header>
        <div className="border-b px-5 py-3">
          <div className="flex gap-x-3 md:gap-x-5">
            {state?.user?.avatar ? (
              <img
                src={state.user.avatar}
                alt="Profile pict"
                className="h-10 w-10 rounded-full md:h-12 md:w-12"
                width={40}
                height={40}
                referrerPolicy="no-referrer"
              />
            ) : (
              <UserIcon size={40} color="#536471" />
            )}
            <form
              onSubmit={handleSubmit}
              className="mt-2 flex w-full flex-col sm:gap-y-7"
            >
              <div className="relative mb-3 sm:mb-0">
                <input
                  type="text"
                  placeholder=""
                  className="w-full text-lg focus:outline-none sm:text-xl"
                  onChange={(e) => setTweet(e.target.value)}
                  value={tweet}
                />
                {tweet.length === 0 && (
                  <span className="pointer-events-none absolute left-0 top-0 text-lg text-gray-300 sm:text-xl">
                    Apa yang sedang dibicarakan?
                  </span>
                )}
              </div>
              <div className="flex flex-col justify-between gap-y-3 sm:flex-row">
                <div className="flex gap-x-3">
                  <label className="h-fit cursor-pointer rounded-full p-1 hover:bg-gray-50">
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      hidden
                      onChange={handleFileChange}
                    />
                    <MediaIcon size={20} color={"rgb(29, 155, 240)"} />
                  </label>
                  <label className="h-fit cursor-pointer rounded-full p-1 hover:bg-gray-50">
                    <input
                      type="file"
                      accept="image/gif"
                      multiple
                      hidden
                      onChange={handleFileChange}
                    />
                    <GifIcon size={20} color={"rgb(29, 155, 240)"} />
                  </label>
                  {/* <span className="hidden sm:block">
                  <ControllIcon size={20} color={"rgb(29, 155, 240)"} />
                </span> */}
                  <span
                    ref={emojiPickerRef}
                    className="relative h-fit cursor-pointer rounded-full p-1 hover:bg-gray-50"
                    onClick={() => setShowEmojiPicker((show) => !show)}
                  >
                    <EmoteIcon size={20} color={"rgb(29, 155, 240)"} />
                    {showEmojiPicker && (
                      <div className="absolute top-10 z-10">
                        <EmojiPicker
                          onEmojiClick={(e) =>
                            setTweet((currentTweet) => currentTweet + e.emoji)
                          }
                        />
                      </div>
                    )}
                  </span>
                  {/* <span className="hidden sm:block">
                  <ScheduleIcon size={20} color={"rgb(29, 155, 240)"} />
                </span> */}
                  <span
                    onClick={handleClickLocationPicker}
                    className="h-fit cursor-pointer rounded-full p-1 hover:bg-gray-50"
                  >
                    <LocationIcon size={20} color={"rgb(29, 155, 240)"} />
                  </span>
                </div>
                <div className="ml-auto w-fit">
                  <Button
                    text={"Tweet"}
                    variant="primary"
                    disabled={tweet.length === 0}
                  />
                </div>
              </div>
            </form>
          </div>
          {location.length > 0 && (
            <div className="mt-5">
              <span className="relative rounded-full bg-purple-100 px-3 py-1 text-primary">
                {location}
                <div
                  onClick={() => setLocation("")}
                  className="absolute -right-1 -top-2 w-fit cursor-pointer rounded-full bg-secondary p-1.5 duration-300 hover:bg-black/50"
                >
                  <CloseIcon size={8} color="#fff" />
                </div>
              </span>
            </div>
          )}

          <div
            className={`mt-5 ${
              files && files?.length > 1 ? "grid grid-cols-2 gap-3" : ""
            }`}
          >
            {files &&
              Array.from(files).map((file, i) => (
                <div key={i} className="relative">
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`Uploaded ${i}`}
                    className="rounded-xl"
                  />
                  <span
                    onClick={() => handleRemoveImage(i)}
                    className="absolute right-3 top-3 cursor-pointer rounded-full bg-secondary p-3 duration-300 hover:bg-black/50"
                  >
                    <CloseIcon size={15} color="#fff" />
                  </span>
                </div>
              ))}
          </div>
        </div>
        <article className="w-full">
          {data?.tweets.map((tweet) => (
            <Tweet key={tweet._id} tweet={tweet} />
          ))}
        </article>
      </section>
      <section className="hidden w-[35%] md:block">
        <div className="sticky top-0 bg-white px-5 py-3">
          <SearchInput
            onChange={(e) => setSearchQuery(e.target.value)}
            value={searchQuery}
            deleteValue={() => setSearchQuery("")}
          />
        </div>
        <div className="px-5">
          <Tren />
        </div>
      </section>
    </main>
  );
}
