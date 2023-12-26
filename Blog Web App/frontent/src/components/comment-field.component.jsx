import { useContext, useState } from "react"
import { UserContext } from "../App"
import toast, { Toaster } from "react-hot-toast"

const CommentField = ({action}) => {
    let {userAuth:{access_token}} = useContext(UserContext)
      const [comment ,setComment] = useState("")
      const handleComment = () => {
        if(!access_token){
            return toast.error("login first to leave a comment ")
        }
        if(!comment.length){
            return toast.error("Write something to make a comment 📓 ")
        }
        
      }
    return(
        <>
            <Toaster />
            <textarea value={comment} onChange={(e)=> setComment(e.target.value)} placeholder="Write a comment..." className="input-box pl-5 placeholder:text-dark-grey resize-none h-[150px] overflow-auto"></textarea>
            <button onClick={handleComment} className="btn-dark mt-5 px-10">{action}</button>
        </>
    )
}

export default CommentField