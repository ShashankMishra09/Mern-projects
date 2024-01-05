import { useContext, useState } from "react";
import { getDay } from "../common/date";
import { UserContext } from "../App";
import toast, { Toaster } from "react-hot-toast";
import CommentField from "./comment-field.component";
import { BlogContext } from "../pages/blog.page";
import axios from "axios";

const CommentCard = ({ index, leftVal, commentData }) => {

  let {
    commented_by: {
      personal_info: { profile_img, fullname, username: commented_user },
    },
    commentedAt,
    comment,
    _id,
    children
  } = commentData;

  let {
    blog,
    blog: {
      comments,
      activity,
      activity: { total_parent_comments },
      comments: { results: commentsArr },
      author: {
        personal_info: { username: blog_author },
      },
    },
    setBlog,
    setTotalParentCommentsLoaded,
  } = useContext(BlogContext);

  let {
    userAuth: { access_token, username },
  } = useContext(UserContext);

  const [isReplying, setReplying] = useState(false);

  const getParentIndex = () => {
    let startingPoint = index - 1;

    try {
      while (
        commentsArr[startingPoint].childrenLevel >= commentData.childrenLevel
      ) {
        startingPoint--;
      }
    } catch {
      startingPoint = undefined;
    }

    return startingPoint;
  };

  const handleReply = () => {
    if (!access_token) {
      return toast.error("login to reply");
    }
    setReplying((preVal) => !preVal);
  };

  const removeCommentsCard = (startingPoint, isDelete = false) => {
    if (commentsArr[startingPoint]) {
      while (
        commentsArr[startingPoint].childrenLevel > commentData.childrenLevel
      ) {
        commentsArr.splice(startingPoint, 1);

        if (!commentsArr[startingPoint]) {
          break;
        }
      }
    }

    if (isDelete) {
      let parentIndex = getParentIndex();
      if (parentIndex != undefined) {
        commentsArr[parentIndex].children = commentsArr[
          parentIndex
        ].children.filter((child) => child != _id);
        if (commentsArr[parentIndex].children.length) {
          commentsArr[parentIndex].isReplyLoaded = false;
        }
      }
      commentsArr.splice(index, 1);
    }

    if (commentData.childrenLevel == 0 && isDelete) {
      setTotalParentCommentsLoaded((preVal) => preVal - 1);
    }

    setBlog({
      ...blog,
      comments: { results: commentsArr },
      activity: {
        ...activity,
        total_parent_comments:
          total_parent_comments -
          (commentData.childrenLevel == 0 && isDelete ? 1 : 0),
      },
    });
  };

  const hideReplies = () => {
    commentData.isReplyLoaded = false;

    removeCommentsCard(index + 1);
  };

  const loadReplies = ({ skip = 0,currentIndex = index }) => {
    if (commentsArr[currentIndex].children.length) {
      hideReplies();
      axios
        .post(import.meta.env.VITE_SERVER_DOMAIN + "/get-replies", {
          _id,
          skip,
        })
        .then(({ data: { replies } }) => {
          commentData.isReplyLoaded = true;
          for (let i = 0; i < replies.length; i++) {
            replies[i].childrenLevel = commentData.childrenLevel + 1;

            commentsArr.splice(currentIndex + 1 + i + skip, 0, replies[i]);
          }
          setBlog({ ...blog, comments: { ...comments, results: commentsArr } });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const deleteComment = (e) => {
    e.target.setAttribute("disabled", true);
    axios
      .post(
        import.meta.env.VITE_SERVER_DOMAIN + "/delete-comment",
        {
          _id,
        },
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      )
      .then(() => {
        e.target.removeAttributes("disable");
        removeCommentsCard(index + 1, true);
      })
      .catch((err) => console.log(err));
  };

  // const LoadMoreReplies = () => {
  //   let parentIndex = getParentIndex();
  //   if (commentsArr[index + 1]) {
  //     if (
  //       commentsArr[index + 1].childrenLevel < commentsArr[index].childrenLevel
  //     ) {
  //       return <button onClick={()=> loadReplies({skip:index-parentIndex, currentIndex : parentIndex})} className="text-dark-grey p-2 px-3 hover:bggrey/30 rounded-md flex items-center gap-2">Load More</button>;
  //     }
  //   }
  // };

  return (
    <div className="w-full" style={{ paddingLeft: `${leftVal * 10}px` }}>
      <div className="my-5 p-6 rounded-md border border-grey">
        <div className="flex gap-3 items-center mb-8 ">
          <img src={profile_img} className="w-6 h-6 rounded-full" />
          <p className="lineclamp-1">
            {fullname} @{commented_user}
          </p>
          <p>{getDay(commentedAt)}</p>
        </div>
        <p className="font-xl font-gelasio ml-3">{comment}</p>
        {/* <div className="flex gap-5 items-center mt-5">
          {commentData.isReplyLoaded ? (
            <button
              onClick={hideReplies}
              className="text-dark-grey rounded-md flex items-center gap-2 p-2 px-3 hover:bg-grey/30 "
            >
              <i className="fi fi-rr-angle-small-down text-2xl"></i>
            </button>
          ) : (
            <button
              onClick={loadReplies}
              className="text-dark-grey rounded-md flex items-center gap-2 p-2 px-3 hover:bg-grey/30 "
            >
              <i className="fi fi-rr-angle-small-right text-2xl"></i>{" "}
              {children.length} Reply
            </button>
          )}
          <button className="underline" onClick={handleReply}>
            Reply
          </button>*/}
          {username == commented_user || username == blog_author ? (
            <button
              onClick={deleteComment}
              className="p-2 px-3 rounded-md border border-grey ml-auto hover:bg-red/30 hover:text-red flex items-center"
            >
              <i className="fi fi-rr-trash text-xl pointer-events-none"></i>
            </button>
          ) : (
            ""
          )}
       {/* </div>
        {isReplying ? (
          <div className="mt-8">
            <CommentField
              action="reply"
              index={index}
              replyingTo={_id}
              setReplying={setReplying}
            />
          </div>
        ) : (
          ""
        )}*/}
      </div> 
      {/* <LoadMoreReplies /> */}
    </div>
  );
};

export default CommentCard;
