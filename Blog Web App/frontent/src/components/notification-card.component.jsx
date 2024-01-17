import { Link } from "react-router-dom"

const NotificationCard = ({data, index, notificationState}) => {
    let {user:{personal_info:{profile_img,fullname,username}}} = data
    return(
        <div className="p-6 border-b border-grey border-l-black">
        <div className="flex gap-5 mb-3">
            <img src={profile_img} className="w-14 h-14 flex-none rounded-full" />
            <div className="w-full">
                <h1>
                    <span>
                        {fullname}
                    </span>
                    <Link to={`/user/${username}`}>@{username}</Link>
                    <span>
                        {
                            type=='like' 
                        }
                    </span>
                </h1>
            </div>
        </div>

        </div>
    )
}

export default NotificationCard