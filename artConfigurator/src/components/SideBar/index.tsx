import { useEffect, useRef } from "react";
import MultiLevelMenu from "../../components/Menu";
import { menuItemsWithPaths } from "../../App.tsx";
interface SideBar {
  setIsClicked: any;
  isClicked: boolean;
  buttonRef: any;
}

const SideBar = ({ setIsClicked, isClicked, buttonRef }: SideBar) => {
  const ref = useRef<HTMLDivElement | null>(null);

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
      <div
        className={`opacity-90 font-federo ${
          isClicked
            ? "translate-x-0 transition-all duration-500"
            : "translate-x-[-300px] transition-all duration-500"
        }`}
      >
        <aside
          id="sidebar-multi-level-sidebar "
          className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
          aria-label="Sidebar"
          ref={ref}
        >
          <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
            <MultiLevelMenu menuItems={menuItemsWithPaths} />
          </div>
        </aside>
      </div>
    </>
  );
};

export default SideBar;
