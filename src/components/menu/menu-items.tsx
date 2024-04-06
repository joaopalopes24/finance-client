// ** Internal Imports
import { MenuType } from "@/config/menu";
import MenuLink from "@/components/menu/menu-link";

interface Props {
  menuItems: MenuType[];
}

const MenuItems = (props: Props) => {
  const { menuItems } = props;

  const RenderMenuItems = menuItems.map((item: MenuType, index: number) => {
    return <MenuLink {...props} key={index} item={item} />;
  });

  return <>{RenderMenuItems}</>;
};

export default MenuItems;
