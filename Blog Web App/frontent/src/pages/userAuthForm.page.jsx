import React from "react";
import InputBox from "../components/input.component";
import googleIcon from "../imgs/google.png";
import { Link } from "react-router-dom";
import AnimationWrapper from "../common/page-animation";

const UserAuthForm = ({ type }) => {
  return (
    <AnimationWrapper>
      <section className="h-cover flex items-center justify-center">
        <form className="w-[60%] max-w-[400] flex items-center justify-center flex-col">
          <h1 className="text-4xl font-gelasio capitalize text-center mb-24">
            {type == "sign-in" ? "Welcome back" : "Join now"}
          </h1>

          {type != "sign-in" ? (
            <InputBox
              name="full name"
              type="text"
              placeholder="full name"
              icon="fi-rr-user"
            />
          ) : (
            ""
          )}
          <InputBox
            name="email"
            type="email"
            placeholder="email"
            icon="fi-rr-envelope  "
          />
          <InputBox
            name="password"
            type="password"
            placeholder="password"
            icon="fi-rr-lock  "
          />

          <button className="btn-dark center mt-14">
            {type.replace("-", " ")}
          </button>
          <div className="relative w-full flex items-center gap-2 my-10 opacity-40 uppercase text-black font-bold">
            <hr className="w-1/2 border-black" />
            <h1 className="text-black">or</h1>
            <hr className="w-1/2 border-black" />
          </div>
          <button className="btn-dark flex items-center justify-center gap-4 w-[40%] center">
            <img src={googleIcon} className="w-5" />
            continue with google
          </button>
          {type == "sign-in" ? (
            <p className="mt-6 text-dark-grey text-xl text-center">
              Don't have an account?
              <Link to="/signup" className="underline text-black text-xl ml-1">
                Join Now
              </Link>
            </p>
          ) : (
            <p className="mt-6 text-dark-grey text-xl text-center">
              Have an account?
              <Link to="/signin" className="underline text-black text-xl ml-1">
                Sign In here
              </Link>
            </p>
          )}
        </form>
      </section>
    </AnimationWrapper>
  );
};

export default UserAuthForm;
