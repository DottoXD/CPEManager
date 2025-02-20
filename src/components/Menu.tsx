import { MdMenuItem } from "@material/web/menu/menu-item";
import { MdSubMenu } from "@material/web/menu/sub-menu";
import { MdMenu } from "@material/web/menu/menu";

import React from "react";
import { createComponent } from "@lit/react";

const MenuItem = createComponent({
  tagName: "md-menu-item",
  elementClass: MdMenuItem,
  react: React,
});

const SubMenu = createComponent({
  tagName: "md-sub-menu",
  elementClass: MdSubMenu,
  react: React,
});

const Menu = createComponent({
  tagName: "md-menu",
  elementClass: MdMenu,
  react: React,
});

export { MenuItem as MdMenuItem, SubMenu as MdSubMenu, Menu as MdMenu };
