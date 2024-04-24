import { useEffect, useRef } from "react";
import { menuItemsWithPaths } from "../../App.tsx";
import MultiLevelMenu from "../Menu";
import { useNavigate } from "react-router-dom";

interface SideBar {
  setIsClicked: any;
  isClicked: boolean;
  buttonRef: any;
}

const SideBar = ({ setIsClicked, buttonRef }: SideBar) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  const handleClick = (event: any) => {
    if (
      ref.current &&
      !ref?.current?.contains(event.target as Node) &&
      buttonRef.current &&
      !buttonRef?.current?.contains(event.target as Node)
    ) {
      setIsClicked(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);
  return (
    <>
      <div className={`bg-[#ffedcb] font-federo `}>
        <aside
          id="sidebar-multi-level-sidebar "
          className="bg-[#ffedcb] fixed top-0 left-0 z-40 w-[25%] h-screen transition-transform -translate-x-full sm:translate-x-0"
          aria-label="Sidebar"
          ref={ref}
        >
          <h5
            onClick={() => {
              navigate("/biography");
            }}
            className="pt-8 px-8 font-apple text-2xl cursor-pointer"
          >
            Calvin Calva
          </h5>
          <div className="mt-10 h-full px-3 py-4 overflow-y-auto bg-[#ffedcb]">
            <MultiLevelMenu menuItems={menuItemsWithPaths} />
          </div>
        </aside>
      </div>
    </>
  );
};

export default SideBar;
