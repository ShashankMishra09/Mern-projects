import { Link } from "react-router-dom";
import AnimationWrapper from "../common/page-animation";
import { useContext } from "react";
import { UserContext } from "../App";
import { removedFromSession } from "../common/session";

const UserNavigationPanel = () => {
  const {
    userAuth: { username },
    setUserAuth
  } = useContext(UserContext);
  const signOutUser = ()=>{
    removedFromSession("user")
    setUserAuth({access_token:null})
    console.log(username);
  }
  return (
    <AnimationWrapper
      className="absolute right-0 z-50"
      transition={{ duration: 0.2 }}
    >
      <div className="bg-white absolute right-0 border border-grey w-60 overflow-hidden duration-200">
        <Link to="/editor" className="flex gap-2 link md:hidden pl-8 py-4">
          <i className="fi fi-rr-file-edit"></i>
          <p>Write</p>
        </Link>
        <Link to={`/user/${username}`} className="link pl-8 py-4">
          Profile
        </Link>
        <Link to={`/dashboard/blogs`} className="link pl-8 py-4">
          dashboard
        </Link>
        <Link to={`/settings/edit-profile`} className="link pl-8 py-4">
          Settings
        </Link>
        <span className="absolute border-t border-grey  w-[100%]"></span>
        <button onClick={signOutUser} className="text-left p-4 hover:bg-grey w-full pl-8 py-4">
          <h1 className="font-bold text-xl m-1">Sign Out</h1>
          <p className="text-dark-grey">@{username}</p>
        </button>
      </div>
    </AnimationWrapper>
  );
};

export default UserNavigationPanel;
