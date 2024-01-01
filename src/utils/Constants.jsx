import { AiOutlineBgColors, AiOutlineShoppingCart } from "react-icons/ai";
import { BiCategory } from "react-icons/bi";
import { FaBlogger } from "react-icons/fa";
import { ImBlog } from "react-icons/im";
import { SiBrandfolder } from "react-icons/si";
import { UilClipboardAlt, UilUsdSquare } from "@iconscout/react-unicons";

export const catlog = [
  {
    name: "Add Product",
    icon: <AiOutlineShoppingCart className="fs-4" />,
    path: "product",
  },
  {
    name: "Product List",
    icon: <AiOutlineShoppingCart className="fs-4" />,
    path: "product-list",
  },
  // {
  //   path: "brand",
  //   icon: <SiBrandfolder className="fs-4" />,
  //   name: "Brand",
  // },
  // {
  //   path: "list-brand",
  //   icon: <SiBrandfolder className="fs-4" />,
  //   name: "Brand List",
  // },
  // {
  //   path: "category",
  //   icon: <BiCategory className="fs-4" />,
  //   name: "Category",
  // },
  {
    path: "list-category",
    icon: <BiCategory className="fs-4" />,
    name: "Category List",
  },
  // {
  //   path: "color",
  //   icon: <AiOutlineBgColors className="fs-4" />,
  //   name: "Color",
  // },
  // {
  //   path: "list-color",
  //   icon: <AiOutlineBgColors className="fs-4" />,
  //   name: "Color List",
  // },
];

export const blog = [
  {
    path: "blog",
    icon: <ImBlog className="fs-4" />,
    name: "Add Blog",
  },
  {
    path: "blog-list",
    icon: <FaBlogger className="fs-4" />,
    name: " Blog List",
  },
  {
    path: "blog-catgeory",
    icon: <ImBlog className="fs-4" />,
    name: "Add Blog Category",
  },
  {
    path: "blog-catgeory-list",
    icon: <FaBlogger className="fs-4" />,
    name: "Blog Category List",
  },
];

export const CardsData = [
  {
    title: "Sales",
    color: {
      backGround: "linear-gradient(180deg,#bb67ff 0%,#c484f3 100%)",
      boxShadow: "0 10px 20px 0 #e0c6f5",
    },
    barValue: 70,
    value: "25,970",
    png: UilUsdSquare,
    series: [
      {
        name: "Sales",
        data: [31, 40, 28, 51, 42, 109, 100],
      },
    ],
  },
  {
    title: "Revenue",
    color: {
      backGround: "linear-gradient(180deg,#ff919d 0%,#fc929d 100%)",
      boxShadow: "0 10px 20px 0 #fdc0c7",
    },
    barValue: 80,
    value: "14,270",
    png: UilClipboardAlt,
    series: [
      {
        name: "Revenue",
        data: [11, 32, 45, 32, 34, 52, 41],
      },
    ],
  },
  {
    title: "Expenses",
    color: {
      backGround:
        "linear-gradient(rgb(248,212,154) -146.42%,rgb(255,202,113) 100%)",
      boxShadow: "0 10px 20px 0 #f9d59b",
    },
    barValue: 60,
    value: "25,970",
    png: UilClipboardAlt,
    series: [
      {
        name: "Expenses",
        data: [10, 25, 15, 25, 15, 25, 10],
      },
    ],
  },
];
