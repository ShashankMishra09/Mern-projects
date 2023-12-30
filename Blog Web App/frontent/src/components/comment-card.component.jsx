import { useContext, useState } from "react";
import { getDay } from "../common/date";
import { UserContext } from "../App";
import toast, { Toaster } from "react-hot-toast";
import CommentField from "./comment-field.component";

const CommentCard = ({ index, leftVal, commentData }) => {
  let {
    commented_by: {
      personal_info: { profile_img, fullname, username },
    },
    commentedAt,
    comment,
    _id,
  } = commentData;

  let { userAuth: {access_token} } = useContext(UserContext)
   const [isReplying,setIsReplying] = useState(false)

  const handleReply= () => {
    if(!access_token){
      return toast.error("login to reply")
    }
    setIsReplying(preVal => !preVal)

  }
  return (
    <div className="w-full" style={{ paddingLeft: `${leftVal * 10}px` }}>
      <div className="my-5 p-6 rounded-md border border-grey">
        <div className="flex gap-3 items-center mb-8 ">
          <img src={profile_img} className="w-6 h-6 rounded-full" />
          <p className="lineclamp-1">
            {fullname} @{username}
          </p>
          <p>{getDay(commentedAt)}</p>
        </div>
        <p className="font-xl font-gelasio ml-3">{comment}</p>
        <div className="flex gap-5 items-center mt-5"> 
          <button className="underline" onClick={handleReply}> Reply </button> 
        </div>
        {
          isReplying ? 
          <div className="mt-8">
            <CommentField action="reply" index={index} replyingTo={_id} setIsReplying={setIsReplying} />
          </div>
          : ""
        }
      </div>
    </div>
  );
};

export default CommentCard;
