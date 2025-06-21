"use client";

import "../../assets/css/appComp/Common.css";
import { navItems } from "../../assets/data/HomePage";

import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarLoader } from "react-spinners";

const layout = ({ children }) => {
  const { isLoaded } = useUser();
  const pathName = usePathname();

  //console.log("pathname : ",pathName,"\n","is Loaded : ",isLoaded);

  return (
    <div>
      {!isLoaded && <BarLoader width={"100%"} color="rgb(0, 137, 123)" />}
      <div className="flex flex-col h-screen bg-gradient-to-b from-teal-50 to-white  md:flex-row">
        <aside className="hidden md:block w-48 bg-white">
          <nav className="mt-8">
            <ul>
              {navItems.map((item) => {
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`flex items-center p-4 gap-4 text-gray-800 hover:bg-teal-50 ${
                        pathName == item.href ? `bg-teal-50 text-teal-800` : ``
                      }`}
                    >
                      <item.Icon />
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </aside>
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <header className="flex justify-between items-center mb-4">
            <h2 className="gradient-title text-4xl lg:text-5xl pt-2 md:pt-0 text-center w-full">
              {navItems.find((item) => item.href === pathName)?.label ||
                "Dashboard"}
            </h2>
          </header>
          {children}
        </main>
      </div>
      {/* mobile nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white shadow-md overflow-x-auto">
        <ul className="flex justify-between">
          {navItems.map((item) => {
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex flex-col items-center px-4 py-2 text-gray-800 ${
                    pathName == item.href ? `bg-teal-50 text-teal-800` : ``
                  }`}
                >
                  <item.Icon />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default layout;
