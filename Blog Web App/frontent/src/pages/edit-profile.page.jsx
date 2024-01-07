import { useContext, useEffect, useState } from "react"
import { UserContext } from "../App"
import axios from "axios"
import { profileDataStructure } from "./profile.page"
import AnimationWrapper from "../common/page-animation"
import Loader from "../components/loader.component"
import { Toaster } from "react-hot-toast"
import InputBox from "../components/input.component"

const EditProfile = () => {
    let {userAuth,userAuth:{access_token}} = useContext(UserContext)
    const [profile,setProfile] = useState(profileDataStructure)
    const [loading,setLoading] = useState(true)

    let {personal_info:{fullname,username:profile_username,profile_img,email,bio}} = profile;


    useEffect(()=>{
        if(access_token){

            axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/get-profile",{username:userAuth.username})
            .then(({data})=>{
                setProfile(data)
                setLoading(false)
            })
            .catch(err=>{
                console.log(err);
            })
        }
    },[access_token])
    return(
        <AnimationWrapper>
            {
                loading ? <Loader/> : 
                <form>
                    <Toaster/>
                    <h1 className="max-md:hidden">Edit Profile</h1>
                    <div className="flex flex-col lg:flex-row items-start py-10 gap-8 lg:gap-10">
                        <div className="max-lg:center mb-5">
                            <label htmlFor="uploadImg" id="profileImgLable" className="relative block w-48 h-48 bg-grey rounded-full overflow-hidden">
                                <div className="w-full h-full top-0 left-0 flex items-center justify-center text-white bg-black/80 opacity-0 hover:opacity-100 cursor-pointer">
                                    Upload image
                                </div>
                                <img src={profile_img} />
                            </label>
                            <input type="file" id="uploadImg" accept=".jpeg,.png,.jpg" hidden/>

                            <button className="btn-light mt-5 max-lg:center lg:w-full px-10">Upload</button>
                        </div>
                        <div className="w-full">

                        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-5">
                            <div>
                                <InputBox name="fullname" type="text" value={fullname} placeholder="Full Name" disable={true} icon="fi-rr-user" />
                            </div>

                            <div>
                                <InputBox name="email" type="email" value={email} placeholder="Email" disable={true} icon="fi-rr-envelope" />
                            </div>
                        </div>

                        <InputBox type="text" name="username" value={profile_username} placeholder="User Name" icon="fi-rr-at" />

                        </div>
                    </div>
                </form>
            }
        </AnimationWrapper>
    )
}

export default EditProfile