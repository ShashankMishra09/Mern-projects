import React, { useContext, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import logo from "../imgs/logo.png";
import { UserContext } from "../App";

const Navbar = () => {
  const [searchBoxVisibility, setSearchBoxVisibility] = useState();

  const {
    userAuth,
    userAuth: { access_token, profile_img },
  } = useContext(UserContext);

  return (
    <>
      <nav className="navbar">
        <Link to="/" className="flex-none w-10">
          <img src={logo} className="w-full" />
        </Link>

        <div
          className={
            "absolute bg-white w-full left-0 top-full mt-0.5 border-b border-grey py-4 px-[5vw] border-0 block md:relative md:inset-0 md:p-0 md:w-auto " +
            (searchBoxVisibility ? "show" : "hide")
          }
        >
          <input
            type="text"
            placeholder="Blogs"
            className="w-full md:w-auto bg-grey p-4 pl-6 pr-[12%] md:pr-6 rounded-full placeholder:text-dark-grey md:pl-12"
          />

          <i className="fi fi-rr-search absolute right-[10%]  pointer-events-none left-5 top-1/2 -translate-y-1/2 text-2xl text-dark-grey sm:hidden "></i>
        </div>

        <div className="flex items-center gap-3 md:gap-6 ml-auto ">
          <button
            className="  bg-grey w-12 h-12 rounded-full flex items-center justify-center"
            onClick={() => setSearchBoxVisibility((currentVal) => !currentVal)}
          >
            <i className="fi fi-rr-search text-2xl"></i>
          </button>
          <Link to="/editor" className="hidden md:flex gap-2 link">
            <i className="fi fi-rr-file-edit"></i>
            <p>Write</p>
          </Link>
          {access_token ? (
            <>
              <Link to="/dashboard/notification">
                <button className="w-12 h-12 rounded-full bg-grey relative hover:bg-black/10">
                <i class="fi fi-rr-bell-concierge text-2xl block mt-1"></i>
                </button>
              </Link>
              <div className="relative">
                <button className="w-12 h-12 mt-1">
                  <img src={profile_img}  className="w-full h-full object-cover rounded-full" />
                </button>
              </div>
            </>
          ) : (
            <>
              <Link className="btn-dark py-2" to="/signin">
                Sign In
              </Link>
              <Link className="btn-light py-2 sm:hidden md:block" to="/signup">
                Sign up
              </Link>
            </>
          )}
        </div>
      </nav>
      <Outlet />
    </>
  );
};

export default Navbar;
