import React, { useState } from "react";
import { Link } from "react-router-dom";

interface MenuItemProps {
  item: MenuItemData;
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
  isEditMode?: boolean;
}

const MenuItem: React.FC<MenuItemProps> = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Открываем/закрываем дочерние элементы меню
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
          {item.name}
        </Link>
      ) : (
        <div onClick={handleClick}>
          {item.name}
          {item.children && <span>{isOpen ? "-" : "+"}</span>}
        </div>
      )}
      {isOpen && item.children && (
        <ul>
          {item.children.map((child) => (
            <MenuItem key={child.id} item={child} />
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
