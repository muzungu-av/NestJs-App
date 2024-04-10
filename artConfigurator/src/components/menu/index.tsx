import React, { useState } from "react";
import { Link } from "react-router-dom";
import arrow from "../../assets/icons/arrow.svg";
interface MenuItemProps {
  item: MenuItemData;
  className?: string;
}

interface MultiLevelMenuProps {
  menuItems: MenuItemData[];
}

interface MenuItemData {
  id: number;
  name: string;
  path?: string;
  element?: React.ComponentType<any> | undefined;
  children?: MenuItemData[];
  isEditMode?: boolean | undefined;
}

const MenuItem: React.FC<MenuItemProps> = ({ item, className }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleClick = (
    event: React.MouseEvent<HTMLAnchorElement | HTMLDivElement>
  ) => {
    if (item.children) {
      event.preventDefault(); // Предотвращаем дальнейший переход по ссылке
      handleToggle();
    }
  };

  return (
    <li>
      {item.path ? (
        <Link to={item.path} onClick={handleClick}>
          <button
            type="button"
            className={`${className} flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700`}
            aria-controls="dropdown-example"
            data-collapse-toggle="dropdown-example"
          >
            <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">
              {item.name}
            </span>
          </button>
        </Link>
      ) : (
        <div onClick={handleClick}>
          <button
            type="button"
            className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
            aria-controls="dropdown-example"
            data-collapse-toggle="dropdown-example"
          >
            <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">
              {item.name}
            </span>
            <img
              src={arrow}
              className={`w-4 h-4 ${isOpen ? "rotate-180" : ""}`}
            />
          </button>
        </div>
      )}
      {isOpen && item.children && (
        <ul>
          {item.children.map((child) => (
            <MenuItem
              key={child.id}
              item={child}
              className="font-federo text-sm ml-2"
            />
          ))}
        </ul>
      )}
    </li>
  );
};

const MultiLevelMenu: React.FC<MultiLevelMenuProps> = ({ menuItems }) => {
  return (
    <ul>
      {menuItems.map((item) => (
        <MenuItem key={item.id} item={item} />
      ))}
    </ul>
  );
};

export default MultiLevelMenu;
