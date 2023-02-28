import { BsHeadphones, BsWatch } from "react-icons/bs";

import { GiConverseShoe } from "react-icons/gi";
import { MdOutlineSportsSoccer, MdSportsEsports } from "react-icons/md";
import { FaBaby } from "react-icons/fa";

export const categories = [
  {
    name: "Electronics",
    icon: <BsHeadphones />,
    link: "/categories/electronics",
  },
  { name: "Watches", icon: <BsWatch />, link: "/categories/watches" },
  {
    name: "Shoes & Sneakers",
    icon: <GiConverseShoe />,
    link: "/categories/shoes",
  },
  {
    name: "Sports",
    icon: <MdOutlineSportsSoccer />,
    link: "/categories/sports",
  },
  { name: "Gaming", icon: <MdSportsEsports />, link: "/categories/gaming" },
  { name: "Kids & Babies", icon: <FaBaby />, link: "/categories/kids" },
  { name: "Gifts", icon: <FaBaby />, link: "/categories/gifts" },
];
