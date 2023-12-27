import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import AnimationWrapper from "../common/page-animation";
import Loader from "../components/loader.component";
import { getDay } from "../common/date";
import BlogInteraction from "../components/blog-interaction.component";
import { createContext } from "react";
import BlogPostCard from "../components/blog-post.component";
import BlogContent from "../components/blog-content.component";
import CommentsContainer, {
  fetchComment,
} from "../components/comments.component";

export const blogStructure = {
  title: "",
  des: "",
  content: [],
  author: { personal_info: {} },
  banner: "",
  publishedAt: "",
};

export const BlogContext = createContext({});

const BlogPage = () => {
  let { blog_id } = useParams();
  const [blog, setBlog] = useState(blogStructure);
  const [similarBlog, setSimilarBlog] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [loading, setLoading] = useState(true);
  const [commentsWrapper, setCommentsWrapper] = useState(false);
  const [parentComments, setParentComments] = useState(0);

  let {
    title,
    content,
    banner,
    author: {
      personal_info: { fullname, username: author_username, profile_img },
    },
    publishedAt,
  } = blog;

  const fetchBlog = () => {
    axios
      .post(import.meta.env.VITE_SERVER_DOMAIN + "/get-blog", { blog_id })
      .then(async ({ data: { blog } }) => {

        blog.comments = await fetchComment({
          blog_id: blog._id,
          setParentCommentCount: setParentComments,
        });

        setBlog(blog);

        axios
          .post(import.meta.env.VITE_SERVER_DOMAIN + "/search-blogs", {
            tag: blog.tags[0],
            limit: 6,
            eliminate_blog: blog_id,
          })
          .then(({ data }) => {
            setSimilarBlog(data.blogs);
            console.log(data.blogs);
          });
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };
  useEffect(() => {
    resetState();
    fetchBlog();
  }, [blog_id]);

  const resetState = () => {
    setBlog(blogStructure);
    setSimilarBlog(null);
    setLoading(true);
    setIsLiked(false);
    setCommentsWrapper(false);
    setParentComments(0);
  };

  return (
    <AnimationWrapper>
      {loading ? (
        <Loader />
      ) : (
        <BlogContext.Provider
          value={{
            blog,
            setBlog,
            isLiked,
            setIsLiked,
            commentsWrapper,
            setCommentsWrapper,
            parentComments,
            setParentComments,
            comments: blog.comments
          }}
        >
          <CommentsContainer />

          <div className="max-w-[900px] center py-10 max-lg:px-[5vw]">
            <img src={banner} className="aspect-video" />
            <div className="mt-12">
              <h2>{title}</h2>
              <div className="flex max-sm:flex-col justify-between my-8">
                <div className="flex gap-5 items-start">
                  <img src={profile_img} className="h-12 w-12 rounded-full" />
                  <p className="capitalize">
                    {fullname}
                    <br />@
                    <Link to={`/user/${author_username}`}>
                      {author_username}
                    </Link>
                  </p>
                </div>
                <p className="text-black opacity-75 max-sm:mt-6 max-sm:ml-12 max-sm:pl-5">
                  Published on {getDay(publishedAt)}
                </p>
              </div>
            </div>

            <BlogInteraction />

            <div className="my-12 font-gelasio blog-page-content">
              {content[0].blocks.map((block, i) => {
                return (
                  <div key={i} className="my-4 md:my-8">
                    <BlogContent block={block} />
                  </div>
                );
              })}
            </div>

            <BlogInteraction />

            {similarBlog != null && similarBlog.length ? (
              <>
                <h1 className="text-2xl mt-14 mb-10 font-medium">
                  Similar Blog
                </h1>
                {similarBlog.map((blog, i) => {
                  let {
                    author: { personal_info },
                  } = blog;
                  return (
                    <AnimationWrapper
                      key={i}
                      transition={{ duration: 1, delay: i * 0.08 }}
                    >
                      <BlogPostCard content={blog} author={personal_info} />
                    </AnimationWrapper>
                  );
                })}
              </>
            ) : (
              " "
            )}
          </div>
        </BlogContext.Provider>
      )}
    </AnimationWrapper>
  );
};

export default BlogPage;
