import { useContext } from "react";
import AnimationWrapper from "../common/page-animation";
import { Toaster, toast } from "react-hot-toast";
import { EditorContext } from "../pages/editor.pages";
import Tag from "./tags.component";

const PublishForm = () => {
  let charLimit = 200;
  let tagLimit=10
  let {
    blog: { banner, title, tags, des },
    setEditorState,
    setBlog,
  } = useContext(EditorContext);
  const handleCloseEvent = () => {
    setEditorState("editor");
  };
  const handleTitleChange = (e) => {
    let input = e.target;
    setBlog({ ...blog, des: input.value });
  };
  const handleDesChange = (e) => {
    let input = e.target;
    setBlog({ ...blog, title: input.value });
  };
  const handleTitleKeyDown = (e) => {
    if (e.keyCode == 13) {
      e.preventDefault();
    }
  };
  const handleKeyDown = (e) => {
    if (e.keyCode == 13 || e.keyCode == 188) {
      e.preventDefault();
      let tag = e.target.value
      if(tags.length<tagLimit){
        if(!tags.includes(tag)&&tag.length){
          setBlog({...blog,tags:[...tags,tag]})
        }
      }else{
        toast.error(`Only ${tagLimit} tags can be added`)
      }
      e.target.value=""
    }
    
  };

  return (
    <AnimationWrapper>
      <section className="w-screen min-h-screen grid items-center lg:grid-cols-2 py-16 lg:gap-4">
        <Toaster />
        <button
          className="w-12 h-12 absolute right-[5vw] z-10 top-[5%] lg:top-[10%]"
          onClick={handleCloseEvent}
        >
          <i className="fi fi-br-cross"></i>
        </button>
        <div className="max-w-[500px] center">
          <p className="text-dark-grey mb-1">Preview</p>
          <div className="w-full aspect-video rounded-lg overflow-hidden bg-dark-grey mt-4">
            <img src={banner} />
          </div>
          <h1 className="text-4xl font-medium mt-2 leading-tight line-clamp-2">
            {title}
          </h1>
          <p className="font-gelasio line-clamp-2 text-xl leading-7 mt-4">
            {des}
          </p>
        </div>
        <div className="border-grey lg:border-1 lg:pl-8">
          <p className="text-dark-grey mb-2 mt-9">Blog title</p>
          <input
            type="text"
            placeholder="Blog title"
            defaultValue={title}
            className="input-box pl-4"
            onChange={handleTitleChange}
          />
          <p className="text-dark-grey mb-2 mt-9">Blog description</p>
          <textarea
            className="h-40 resize-none leading-7 pl-4 input-box"
            maxLength={charLimit}
            defaultValue={des}
            onChange={handleDesChange}
            onKeyDown={handleTitleKeyDown}
          ></textarea>
          <p className="text-dark-grey mt-1 text-sm text-right">
            {charLimit - des.length} character left
          </p>
          <p className="text-dark-grey mb-2 mt-9">
            Topics-(Help in search and rank the blog)
          </p>
          <div className="relative input-box pl-2 py-2 pb-4">
            <input
              type="text"
              placeholder="topic"
              className="sticky input-box bg-white top-0 left-0 pl-4 mb-3 focus:bg-white"
              onKeyDown={handleKeyDown}
            />
            {tags.map((tag, i) => {
             return <Tag tag={tag} key={i} />;
            })}
          </div>
        </div>
      </section>
    </AnimationWrapper>
  );
};

export default PublishForm;
