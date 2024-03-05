import { AiOutlineBgColors, AiOutlineShoppingCart } from "react-icons/ai";
import { BiCategory } from "react-icons/bi";
import { FaBlogger } from "react-icons/fa";
import { ImBlog } from "react-icons/im";
import { SiBrandfolder } from "react-icons/si";
import { categoryiesType } from "./types";
// import { UilClipboardAlt, UilUsdSquare } from "@iconscout/react-unicons";


export const categoryies: categoryiesType[] = [
  "Syringe",
  "Ortho",
  "Pathology machine",
  "Pratient monitor",
  "Cartical care",
  "Baby",
  "Dental care",
  "Gauze product",
];


export const catlog = [
  {
    name: "Post Product",
    icon: AiOutlineShoppingCart,
    path: "create",
  },
  {
    name: "Draft Products",
    icon: AiOutlineShoppingCart,
    path: "draft-list",
  },
  {
    name: "Published Products",
    icon: AiOutlineShoppingCart,
    path: "published-list",
  },
];

export const blog = [
  {
    path: "blog",
    icon: ImBlog,
    name: "Add Blog",
  },
  {
    path: "blog-list",
    icon: FaBlogger,
    name: " Blog List",
  },
  {
    path: "blog-catgeory",
    icon: ImBlog,
    name: "Add Blog Category",
  },
  {
    path: "blog-catgeory-list",
    icon: FaBlogger,
    name: "Blog Category List",
  },
];
