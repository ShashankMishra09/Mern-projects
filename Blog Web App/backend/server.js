import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import bcrypt from "bcryptjs";
import User from "./Schema/User.js";
import superheroes from "superheroes";
import jwt from "jsonwebtoken";
import cors from "cors";
import admin from "firebase-admin";
import serviceAccountKey from "./blog-web-app-425aa-firebase-adminsdk-mkf1s-c2143ddd08.json" assert { type: "json" };
import { getAuth } from "firebase-admin/auth";

const app = express();
app.use(cors());
const PORT = 8000;
admin.initializeApp({
  credential: admin.credential.cert(serviceAccountKey),
});
let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

app.use(express.json());

mongoose.connect(process.env.DB_LOCATION, { autoIndex: true });

const formatDatatoSend = (user) => {
  const access_token = jwt.sign(
    { id: user._id },
    process.env.SECRET_ACCESS_KEY
  );
  return {
    access_token,
    profile_img: user.personal_info.profile_img,
    username: user.personal_info.username,
    fullname: user.personal_info.fullname,
  };
};

const generateUserName = async (email) => {
  let username = email.split("@")[0];
  let userNameExist = await User.exists({
    "personal_info.username": username,
  }).then((result) => result);
  userNameExist ? (username += superheroes.random()) : "";
  return username;
};

app.post("/signup", (req, res) => {
  let { fullname, email, password } = req.body;
  let length = fullname?.length;
  if (length < 3) {
    return res
      .status(403)
      .json({ error: "Fullname should be longer than 3 letters" });
  }
  if (!email.length) {
    return res.status(403).json({ error: "Enter your email" });
  }
  if (!emailRegex.test(email)) {
    return res.status(403).json({ error: "Write a valid email" });
  }
  if (!passwordRegex.test(password)) {
    return res.status(403).json({ error: "Write a valid password" });
  }

  bcrypt.hash(password, 10, async (err, hashed_password) => {
    let username = await generateUserName(email);
    let user = new User({
      personal_info: {
        fullname,
        email,
        password: hashed_password,
        username,
      },
    });
    user
      .save()
      .then((u) => {
        return res.status(200).json(formatDatatoSend(u));
      })
      .catch((err) => {
        if (err.code == 11000) {
          return res.status(500).json({ error: "Email already exist" });
        }
        return res.status(500).json({ error: err.message });
      });
    console.log(hashed_password);
  });
});

app.post("/signin", (req, res) => {
  let { email, password } = req.body;
  User.findOne({ "personal_info.email": email })
    .then((user) => {
      if (!user) {
        return res.status(403).json({ error: "Email not found" });
      }
      bcrypt.compare(password, user.personal_info.password, (err, result) => {
        if (err) {
          return res
            .status(403)
            .json({ error: "Error occurred while login please try again" });
        }
        if (!result) {
          return res.status(403).json({ error: "Incorrect password" });
        } else {
          return res.status(200).json(formatDatatoSend(user));
        }
      });
      console.log(user);
      //   return res.json({ status: "got user document" });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({ error: err.message });
    });
});

app.post("/google-auth", async (req, res) => {
  let { access_token } = req.body;
  getAuth()
    .verifyIdToken(access_token)
    .then(async (decodedUser) => {
      let { email, name, picture } = decodedUser;
      picture = picture.replace("s96-c", "s384-c");

      let user = await User.findOne({ "personal_info.email": email })
        .select(
          "personal_info.fullname personal_info.username personal_info.profile_img personal_info.google_auth"
        )
        .then((u) => {
          return u || null;
        })
        .catch((err) => res.status(500).json({ error: err.message }));

      if (user) {
        if (!user.google_auth) {
          return res.status(403).json({
            error:
              "This account is not a google signed. Please login with email and password",
          });
        }
      } else {
        let username = await generateUserName(email);
        user = new User({
          personal_info: {
            fullname: name,
            email,
            profile_img: picture,
            username,
          },
          google_auth: true,
        });
        await user
          .save()
          .then((u) => {
            user = u;
          })
          .catch((err) => {
            return res.status(500).json({ error: err.message });
          });
      }
      return res.status(200).json(formatDatatoSend(user));
    })
    .catch((err) => {
      res
        .status(500)
        .json({ error: "Failed to authenticate.Try another google account" });
    });
});

app.listen(PORT, () => {
  console.log(`We are running on ${PORT}`);
});
