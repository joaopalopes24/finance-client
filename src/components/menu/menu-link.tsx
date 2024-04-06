// ** External Imports
import Link from "next/link";

// ** Internal Imports
import useMenu from "@/stores/menu";
import { MenuType } from "@/config/menu";
import ItemIcon from "@/components/items/item-icon";
import ItemText from "@/components/items/item-text";
import ItemButton from "@/components/items/item-button";

// ** MUI Imports
import ListItem from "@mui/material/ListItem";

interface Props {
  item: MenuType;
}

const MenuLink = ({ item }: Props) => {
  const menu = useMenu();

  const active = menu.checkLink(item);

  return (
    <ListItem disablePadding sx={{ mt: 1.5, px: "0 !important" }}>
      <Link passHref legacyBehavior href={item.path}>
        <ItemButton
          active={active}
          component={"a"}
          onClick={(e: any) => {
            if (menu.visible) {
              menu.toggleVisible();
            }
          }}
        >
          <ItemIcon icon={item.icon} />

          <ItemText title={item.title} />
        </ItemButton>
      </Link>
    </ListItem>
  );
};

export default MenuLink;
