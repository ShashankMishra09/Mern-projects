import React, { useContext, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import logo from "../imgs/logo.png";
import { UserContext } from "../App";
import UserNavigationPanel from "./user-navigation.component";

const Navbar = () => {
  const [searchBoxVisibility, setSearchBoxVisibility] = useState();
  const [userNavPanel, setUserNavPanel] = useState(false);

  const {
    userAuth,
    userAuth: { access_token, profile_img },
  } = useContext(UserContext);

  const handleUserNavPanel = () => {
    setUserNavPanel((currentVal) => !currentVal);
  };
  const handleBlur = () => {
    setTimeout(() => {
      setUserNavPanel(false);
    }, 300);
  };
  return (
    <>
      <nav className="navbar">
        <Link to="/" className="flex-none w-10">
          <img src={logo} className="w-full" />
        </Link>

        <div
          className={
            "absolute bg-white w-full left-0 top-full mt-0.5 border-b border-grey py-4 px-[5vw] border-0 block sm:relative md:relative sm:inset-0 md:inset-0 sm:p-0 md:p-0 sm:w-auto md:w-auto " +
            (searchBoxVisibility ? "show" : "hide")
          }
        >
          <input
            type="text"
            placeholder="Blogs"
            className="w-full md:w-auto bg-grey p-4 pl-6 pr-[12%] md:pr-6 rounded-full placeholder:text-dark-grey sm:pl-12"
          />
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
                  <i className="fi fi-rr-bell-concierge text-2xl block mt-1"></i>
                </button>
              </Link>
              <div
                className="relative"
                onClick={handleUserNavPanel}
                onBlur={handleBlur}
              >
                <button className="w-12 h-12 mt-1">
                  <img
                    src={profile_img}
                    className="w-full h-full object-cover rounded-full"
                  />
                </button>

                {userNavPanel ? <UserNavigationPanel /> : ""}
              </div>
            </>
          ) : (
            <>
              <Link className="btn-dark py-2" to="/signin">
                Sign In
              </Link>
              <Link className="btn-light py-2 hidden md:block" to="/signup">
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
