import { BsHeadphones, BsWatch } from "react-icons/bs";

import { GiConverseShoe } from "react-icons/gi";
import { MdOutlineSportsSoccer, MdSportsEsports } from "react-icons/md";
import { FaBaby } from "react-icons/fa";

export const categories = [
  { name: "Electronics", icon: <BsHeadphones />, link: "/categories/" },
  { name: "Watches", icon: <BsWatch />, link: "/categories/" },
  { name: "Shoes & Sneakers", icon: <GiConverseShoe />, link: "/categories/" },
  { name: "Sports", icon: <MdOutlineSportsSoccer />, link: "/categories/" },
  { name: "Gaming", icon: <MdSportsEsports />, link: "/categories/" },
  { name: "Kids & Babies", icon: <FaBaby />, link: "/categories/" },
  { name: "Gifts", icon: <FaBaby />, link: "/categories/" },
];
