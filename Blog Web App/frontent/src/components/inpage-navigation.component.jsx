import { useRef, useState } from "react";

const InPageNavigation = ({ routes }) => {
  let activeTabLine = useRef();
  let [inPageNavIndex, setInPageNavIndex] = useState(0);
  const changePageState = (btn,i) => {
      
  }
  return (
    <>
      <div className=" relative mb-8 bg-white border-b border-grey flex flex-nowrap overflow-x-auto">
        {routes.map((route, i) => {
          return (
            <button
              key={i}
              className={
                "p-4 px-5 capitalize " +
                (inPageNavIndex == i ? "text-black" : "text-dark-grey")
              }
              onClick={(e)=>{changePageState}}
            >
              {route}
            </button>
          );
        })}
        <hr ref={activeTabLine} className="absolute bottom-0 duration-300" />
      </div>
    </>
  );
};

export default InPageNavigation;
