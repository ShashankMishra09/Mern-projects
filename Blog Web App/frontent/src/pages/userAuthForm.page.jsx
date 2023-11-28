import React, { useContext, useEffect, useRef } from "react";
import InputBox from "../components/input.component";
import googleIcon from "../imgs/google.png";
import { Link, Navigate } from "react-router-dom";
import AnimationWrapper from "../common/page-animation";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast"; // to make ui alert Toaster is html component and toast knows where to show alert
import { storeInSession } from "../common/session";
import { UserContext } from "../App";
import { authGoogle } from "../common/firebase";

const UserAuthForm = ({ type }) => {
  let {
    userAuth: { access_token },
    setUserAuth,
  } = useContext(UserContext);
  console.log(access_token);

  const userAuthThroughServer = (serverRoute, formData) => {
    axios
      .post(import.meta.env.VITE_SERVER_DOMAIN + serverRoute, formData)
      .then(({ data }) => {
        storeInSession("user", JSON.stringify(data));
        setUserAuth(data);
      })
      .catch(({ response }) => {
        toast.error(response.data.error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let serverRoute = type == "sign-in" ? "/signin" : "/signup";
    let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

    let form = new FormData(formElement);
    let formData = {};
    for (let [key, value] of form.entries()) {
      formData[key] = value;
    }
    let { fullname, email, password } = formData;

    if (fullname) {
      if (fullname.length < 3) {
        return toast.error("Full name must contain atleast 3 letters");
      }
    }

    if (!email.length) {
      return toast.error("Enter email");
    }
    if (!emailRegex.test(email)) {
      return toast.error("Email is invalid");
    }
    if (!passwordRegex.test(password)) {
      return toast.error(
        "Password must contain 6 to 20 characters and have atleast a numeric, a lower case,an uppercase and a special character e.g:@,#,$ etc"
      );
    }

    userAuthThroughServer(serverRoute, formData);
  };

  const handleGoogleAuth = (e) => {
    e.preventDefault();
    authGoogle().then(user=>{
      let serverRoute = "/google-auth";
      let formData = {
        access_token:user.accessToken
      }

      userAuthThroughServer(serverRoute,formData)
    })
    .catch(err=>{
      toast.error('trouble login to google')
      return console.log(err);
    })
  }

  return access_token ? (
    <Navigate to="/" />
  ) : (
    <AnimationWrapper keyVal={type}>
      <section className="h-cover flex items-center justify-center">
        <Toaster />
        <form
          id="formElement"
          className="w-[60%] max-w-[400] flex items-center justify-center flex-col"
        >
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

          <button
            className="btn-dark center mt-14"
            type="submit"
            onClick={handleSubmit}
          >
            {type.replace("-", " ")}
          </button>
          <div className="relative w-full flex items-center gap-2 my-10 opacity-40 uppercase text-black font-bold">
            <hr className="w-1/2 border-black" />
            <h1 className="text-black">or</h1>
            <hr className="w-1/2 border-black" />
          </div>
          <button className="btn-dark flex items-center justify-center gap-4 md:w-[40%] sm:w-[100%] center" onClick={handleGoogleAuth}>
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
