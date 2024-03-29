"use client";

import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/Logo.png";
import { useContext, useState } from "react";
import { AuthContext } from "@/Providers/AuthProviders";
import { usePathname } from "next/navigation";
import Container from "@/app/common/components/shared/Container";
import Button from "@/app/common/components/ui/Button";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { user } = useContext(AuthContext);
const route = `${user ? "/dashboard" : "/sign-in"}`;
    const isAdmin = user?.email === "admin@gmail.com";

    const navLinks = [
        { route: "Home", path: "/" },
        { route: "Pricing", path: "/pricing" },
        { route: "About Us", path: "/about-us" },
        { route: "Contact Us", path: "/contact" },
    ];

    const pathname = usePathname();
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
      <header className="border-b-2 sticky top-0 bg-white z-50">
        <Container>
          <div className="relative">
            <div className="rounded-full pb-4 pt-4 text-base font-semibold">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-16">
                  <div className="">
                    <Link href={"/"}>
                      <Image
                        className="mb-2.5 h-10 w-auto  lg:mb-0.5"
                        src={logo}
                        alt="heartbeat givers' logo"
                      ></Image>
                    </Link>
                  </div>
                  <nav className="hidden lg:block">
                    <ul className="flex gap-2">
                      {navLinks.map((link, idx) => (
                        <Link
                          href={link.path}
                          className={`px-3 text-base font-medium ${
                            pathname == link.path ? "activeNav" : "inactiveNav"
                          } `}
                          key={idx}
                        >
                          {link.route}
                        </Link>
                      ))}
                      {isAdmin ? (
                        <Link
                          href={"/admin-dashboard"}
                          className={` ${
                            pathname == "/admin-dashboard"
                              ? "activeNav"
                              : "inactiveNav"
                          } px-3 text-base font-medium`}
                        >
                          Dashboard
                        </Link>
                      ) : (
                        <Link
                          href={"/dashboard"}
                          className={` ${
                            pathname == "/dashboard"
                              ? "activeNav"
                              : "inactiveNav"
                          } px-3 text-base font-medium`}
                        >
                          Dashboard
                        </Link>
                      )}
                    </ul>
                  </nav>
                </div>
                <div className="hidden items-center gap-3 lg:block">
                    <Button route={route} text='Get started'/>

                </div>
                {/* mobile menu button  */}
                <div className="block lg:hidden">
                  <button
                    className=" rounded-full text-2xl font-bold text-primary"
                    onClick={toggleMenu}
                  >
                    <div className="space-y-2">
                      <div className="h-0.5 w-8 bg-black"></div>
                      <div className="h-0.5 w-8 bg-black"></div>
                    </div>
                  </button>
                </div>
              </div>
              {/* for mobile sidebar  */}
              <div
                className={`fixed z-40 top-0 right-0 h-screen overflow-hidden ${
                  isMenuOpen ? "w-full" : "w-0"
                } transition-all duration-300`}
              >
                <div
                  className="absolute right-0 top-0 h-full w-full bg-black bg-opacity-50"
                  onClick={toggleMenu}
                ></div>
                <div className="h-full w-80 transform bg-white transition-transform ease-in-out">
                  <div className="flex items-end justify-between p-10">
                    <div className="">
                      <Link href={"/"} onClick={toggleMenu}>
                        <Image
                          className="mb-2.5 h-8 w-auto"
                          src={logo}
                          alt="heartbeat givers' logo"
                        ></Image>
                      </Link>
                    </div>
                    <div className="block lg:hidden">
                      <button onClick={toggleMenu} className=" mb-5">
                        <div className="relative w-10 h-10">
                          <div className="absolute top-1/2 left-1/2 w-full h-0.5 bg-black transform -translate-x-1/2 -translate-y-1/2 rotate-45"></div>
                          <div className="absolute top-1/2 left-1/2 w-full h-0.5 bg-black transform -translate-x-1/2 -translate-y-1/2 -rotate-45"></div>
                        </div>
                      </button>
                    </div>
                  </div>
                  <nav className="ps-1">
                    <ul className="flex flex-col gap-y-2 px-10">
                      {navLinks.map((link, idx) => (
                        <Link
                          href={link.path}
                          className="  text-base font-medium"
                          key={idx}
                          onClick={toggleMenu}
                        >
                          {link.route}
                        </Link>
                      ))}
                    </ul>
                  </nav>
                  <nav className="mt-3 ps-11">
                    <ul className="flex gap-2">
                      {isAdmin ? (
                        <Link
                          href={"/admin-dashboard"}
                          className=" text-base font-medium"
                        >
                          Dashboard
                        </Link>
                      ) : (
                        <Link
                          href={"/dashboard"}
                          className=" text-base font-medium"
                        >
                          Dashboard
                        </Link>
                      )}
                    </ul>
                  </nav>
                  <div className="mt-5 ps-10">
                    <div className=" items-center gap-3">
                      <Link
                        className="rounded-sm bg-gradient-to-br from-[#93C648] to-[#50B577] px-6 py-3 text-base font-bold text-white"
                        href={`${user ? "/dashboard" : "/sign-in"}`}
                      >
                        Get Started
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </header>
    );
};

export default Navbar;
