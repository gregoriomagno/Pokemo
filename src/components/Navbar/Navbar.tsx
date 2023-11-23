"use client";
import Link from "next/link";
import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import Image from "next/image";

interface navLink {
    id: number,
    link: string,
    label: string,
}
const Navbar = () => {
  const [nav, setNav] = useState(false);

  const links:navLink[] = [
    {
      id: 1,
      link: "home",
      label: "Home",

    },
    {
      id: 2,
      link: "historico-trocas",
      label: "Histórico"
    },
  ];

  return (
    <div className="flex justify-between items-center w-full h-20 px-4 text-white bg-green-500 fixed nav z-50  ">
      <div>
        {/* <h1 className="text-5xl font-signature ml-2"><a className="link-underline hover:transition ease-in-out delay-150 hover:underline hover:decoration-solid" href="">Logo</a></h1> */}
        <h1 className="text-5xl font-signature ml-2">
          <a
            className="link-underline link-underline-black"
            href=""
            target="_blank"
            rel="noreferrer"
          >
            {" "}
            <Image
              src="/assets/pokemon-logo.png"
              width={150}
              height={40}
              alt="Logo"
            />
          </a>
        </h1>
      </div>

      <ul className="hidden md:flex">
        {links.map(({ id, link,label }: navLink) => (
          <li
            key={id}
            className="nav-links px-4 cursor-pointer capitalize font-medium text-white hover:scale-105 hover:text-white duration-200 link-underline"
          >
            <Link href={link}>{label}</Link>
          </li>
        ))}
      </ul>

      <div
        onClick={() => setNav(!nav)}
        className="cursor-pointer pr-4 z-10 text-gray-500 md:hidden"
      >
        {nav ? <FaTimes size={30} /> : <FaBars size={30} />}
      </div>

      {nav && (
        <ul className="flex flex-col justify-center items-center absolute top-0 left-0 w-full h-screen bg-gradient-to-b from-black to-gray-800 text-gray-500">
          {links.map(({ id, link }) => (
            <li
              key={id}
              className="px-4 cursor-pointer capitalize py-6 text-4xl"
            >
              <Link onClick={() => setNav(!nav)} href={link}>
                {link}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Navbar;
