import { Link } from "react-router-dom";
import logo from "../imgs/logo.png";
import AnimationWrapper from "../common/page-animation";
import defaultBanner from "../imgs/blog banner.png";
import { UploadImage } from "../common/aws";
import { useContext, useEffect } from "react";
import { Toaster, toast } from "react-hot-toast";
import { EditorContext } from "../pages/editor.pages";
import EditorJS from "@editorjs/editorjs";
import { tools } from "./tools.component";

const BlogEditor = () => {
  let {
    blog,
    blog: { title, banner, content, tags, des },
    setBlog,
  } = useContext(EditorContext);

  useEffect(() => {
    let editor = new EditorJS({
      holderId: "textEditor",
      data: "",
      tools: tools,
      placeholder: "Write a blog",
    });
  }, []);

  const handleBannerChange = (e) => {
    let img = e.target.files[0];
    console.log(img);

    if (img) {
      let loadingToast = toast.loading("Uploading....");
      UploadImage(img)
        .then((url) => {
          if (url) {
            toast.dismiss(loadingToast);
            toast.success("Upload successful👍");
            setBlog({ ...blog, banner: url });
          }
        })
        .catch((err) => {
          toast.dismiss(loadingToast);
          return toast.error(err);
        });
    }
  };
  const handleTitleKeyDown = (e) => {
    if (e.keyCode == 13) {
      e.preventDefault();
    }
  };
  const handleTitleChange = (e) => {
    let input = e.target;
    input.style.height = "auto";
    input.style.height = input.scrollHeight + "px";
    setBlog({ ...blog, title: input.value });
  };
  const handleError = (e) => {
    let img = e.target;
    img.src = defaultBanner;
  };
  return (
    <>
      <nav className="navbar">
        <Toaster />
        <Link to="/" className="flex-none w-10">
          <img src={logo} className="w-full" />
        </Link>
        <p className="max-sm:hidden text-black line-clamp-1 w-full">
          {title.length ? title : "Blog"}{" "}
        </p>
        <div className="flex gap-4 ml-auto">
          <button className="btn-dark py-2">Publish</button>
          <button className="btn-light py-2 bg-grey">Save Draft</button>
        </div>
      </nav>
      <AnimationWrapper>
        <section>
          <div className="mx-auto mx-w-[900px] w-full">
            <div className="relative  aspect-video hover:opacity-80 bg-white bottom-4 border-black border-4">
              <label>
                <img src={banner} className="z-20" onError={handleError} />
                <input
                  id="uploadBanner"
                  type="file"
                  accept=".png,.jpg,.jpeg"
                  hidden
                  onChange={handleBannerChange}
                />
              </label>
            </div>
            <textarea 
              placeholder="blog title"
              className="text-4xl font-medium w-full h-20 outline-none resize-none mt-10 leading-tight placeholder:opacity-1"
              onKeyDown={handleTitleKeyDown}
              onChange={handleTitleChange}
            ></textarea>
            <hr className="w-full opacity-75 my-5" />
            <div id="textEditor" className="font-gelascio"></div>
          </div>
        </section>
      </AnimationWrapper>
    </>
  );
};

export default BlogEditor;
