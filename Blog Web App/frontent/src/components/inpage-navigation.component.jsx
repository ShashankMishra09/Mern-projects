import { useEffect, useRef, useState } from "react";

 export let activeTabLine
 export let activeBtn 

const InPageNavigation = ({
  routes,
  defaultHidden = [],
  defaultActiveIndex = 0,
  children
}) => {
   activeTabLine = useRef();
   activeBtn = useRef();
  let [inPageNavIndex, setInPageNavIndex] = useState(defaultActiveIndex);
  const changePageState = (btn, i) => {
    let { offsetWidth, offsetLeft } = btn;
    activeTabLine.current.style.width = offsetWidth + "px";
    activeTabLine.current.style.left = offsetLeft + "px";
    setInPageNavIndex(i);
  };
  useEffect(() => {
    changePageState(activeBtn.current, defaultActiveIndex);
  }, []);
  return (
    <>
      <div className=" relative mb-8 bg-white border-b border-grey flex flex-nowrap overflow-x-auto">
        {routes.map((route, i) => {
          return (
            <button
              ref={i == defaultActiveIndex ? activeBtn : null}
              key={i}
              className={
                "p-4 px-5 capitalize " +
                (inPageNavIndex == i ? "text-black " : "text-dark-grey ") +
                (defaultHidden.includes(route)?"md:hidden ":" ")
              }
              onClick={(e) => {
                changePageState(e.target, i);
              }}
            >
              {route}
            </button>
          );
        })}
        <hr ref={activeTabLine} className="absolute bottom-0 duration-300" />
      </div>
      {Array.isArray(children)?children[inPageNavIndex]:children} 
    </>
  );
};

export default InPageNavigation;
