import {
  HashtagFillIcon,
  //   BookmarkIcon,
  HashtagIcon,
  HomeFillIcon,
  HomeIcon,
  MessageFillIcon,
  //   ListIcon,
  MessageIcon,
  NotifFillIcon,
  // MoreIcon,
  NotifIcon,
  ProfileFillIcon,
  ProfileIcon,
  //   TwitterBlueIcon,
} from "../assets/icons";

export const navMenus = [
  {
    name: "Beranda",
    icon: <HomeIcon size={26} />,
    filledIcon: <HomeFillIcon size={26} />,
    path: "/home",
  },
  {
    name: "Jelajahi",
    icon: <HashtagIcon size={26} />,
    filledIcon: <HashtagFillIcon size={26} />,
    path: "/explore",
  },
  {
    name: "Notifikasi",
    icon: <NotifIcon size={26} />,
    filledIcon: <NotifFillIcon size={26} />,
    path: "/notifications",
  },
  {
    name: "Pesan",
    icon: <MessageIcon size={26} />,
    filledIcon: <MessageFillIcon size={26} />,
    path: "/messages",
  },
  //   { name: "Daftar", icon: <ListIcon size={26} />, path: '/' },
  //   { name: "Markah", icon: <BookmarkIcon size={26} />, path: '/' },
  //   { name: "Twitter Blue", icon: <TwitterBlueIcon size={26} />, path: '/' },
  {
    name: "Profil",
    icon: <ProfileIcon size={26} />,
    filledIcon: <ProfileFillIcon size={26} />,
    path: "/profile",
  },
  // { name: "Lainnya", icon: <MoreIcon size={26} />, path: '/' },
];

export const mobileNavMenus = [
  {
    name: "Jelajahi",
    icon: <HashtagIcon size={26} />,
    filledIcon: <HashtagFillIcon size={26} color="#fff" />,
    path: "/explore",
  },
  {
    name: "Notifikasi",
    icon: <NotifIcon size={26} />,
    filledIcon: <NotifFillIcon size={26} color="#fff" />,
    path: "/notifications",
  },
  {
    name: "Beranda",
    icon: <HomeIcon size={26} />,
    filledIcon: <HomeFillIcon size={26} color="#fff" />,
    path: "/home",
  },
  {
    name: "Pesan",
    icon: <MessageIcon size={26} />,
    filledIcon: <MessageFillIcon size={26} color="#fff" />,
    path: "/messages",
  },
  //   { name: "Daftar", icon: <ListIcon size={26} />, path: '/' },
  //   { name: "Markah", icon: <BookmarkIcon size={26} />, path: '/' },
  //   { name: "Twitter Blue", icon: <TwitterBlueIcon size={26} />, path: '/' },
  {
    name: "Profil",
    icon: <ProfileIcon size={26} />,
    filledIcon: <ProfileFillIcon size={26} color="#fff" />,
    path: "/profile",
  },
  // { name: "Lainnya", icon: <MoreIcon size={20} />, path: '/' },
];
