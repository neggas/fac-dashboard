import {
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
} from "@/config/themes/chakra/menu";
import { Button, MenuSelectionDetails } from "@chakra-ui/react";

interface MenuItem {
  value: string;
  label: string;
}

interface MenuProps {
  items: MenuItem[];
  triggerItem: React.ReactNode;
  onItemSelect: (details: MenuSelectionDetails) => void;
}

export const Menu = ({ items, triggerItem, onItemSelect }: MenuProps) => {
  return (
    <MenuRoot onSelect={(details) => onItemSelect(details)}>
      <MenuTrigger asChild>
        <Button>{triggerItem}</Button>
      </MenuTrigger>
      <MenuContent>
        {items.map((item) => (
          <MenuItem key={item.value} value={item.value} cursor="pointer">
            {item.label}
          </MenuItem>
        ))}
      </MenuContent>
    </MenuRoot>
  );
};
