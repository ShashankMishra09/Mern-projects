
import { initializeApp } from "firebase/app";
import {GoogleAuthProvider,getAuth, signInWithPopup} from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyBtBTcgd1_NNxuK3m-doDmrwPpXW1IPFIk",
  authDomain: "blog-web-app-425aa.firebaseapp.com",
  projectId: "blog-web-app-425aa",
  storageBucket: "blog-web-app-425aa.appspot.com",
  messagingSenderId: "1035329160114",
  appId: "1:1035329160114:web:5fb5bd6b6a1ae3594a9aab"
};

const app = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

const auth = getAuth();

export const authGoogle  = async () => {
  let user = null;
  await signInWithPopup(auth, provider)
  .then((result)=>{
    user = result.user
  })
  .catch((err)=>{
    console.log(err);
  })

  return user;
}