import { Link } from "react-router-dom";
import logo from "../imgs/logo.png";
import AnimationWrapper from "../common/page-animation";
import defaultBanner from "../imgs/blog banner.png";
import { UploadImage } from "../common/aws";
import { useRef } from "react";
import { Toaster, toast } from "react-hot-toast";

const BlogEditor = () => {
  let blogBannerRef = useRef();

  const handleBannerChange = (e) => {
    let img = e.target.files[0];
    console.log(img);

    if (img) {
      let loadingToast = toast.loading("Uploading....");
      UploadImage(img)
        .then((url) => {
          if (url) {
            toast.dismiss(loadingToast);
            blogBannerRef.current.src = url;
            toast.success("Upload successful👍");
          }
        })
        .catch((err) => {
          toast.dismiss(loadingToast);
          return toast.error(err);
        });
    }
  };
  return (
    <>
      <nav className="navbar">
        <Toaster />
        <Link to="/" className="flex-none w-10">
          <img src={logo} className="w-full" />
        </Link>
        <p className="max-sm:hidden text-black line-clamp-1 w-full">Blog</p>
        <div className="flex gap-4 ml-auto">
          <button className="btn-dark py-2">Publish</button>
          <button className="btn-light py-2 bg-grey">Save Draft</button>
        </div>
      </nav>
      <AnimationWrapper>
        <section>
          <div className="mx-auto mx-w-[900px] w-full ">
            <div className="relative aspect-video hover:opacity-80 bg-white bottom-4 border-black border-4">
              <label>
                <img
                  ref={blogBannerRef}
                  src={defaultBanner}
                  className="z-200"
                />
                <input
                  id="uploadBanner"
                  type="file"
                  accept=".png,.jpg,.jpeg"
                  hidden
                  onChange={handleBannerChange}
                />
              </label>
            </div>
          </div>
        </section>
      </AnimationWrapper>
    </>
  );
};

export default BlogEditor;
