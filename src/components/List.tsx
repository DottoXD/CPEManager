import { MdListItem } from "@material/web/list/list-item";
import { MdList } from "@material/web/list/list";

import React from "react";
import { createComponent } from "@lit/react";

const ListItem = createComponent({
  tagName: "md-list-item",
  elementClass: MdListItem,
  react: React,
});

const List = createComponent({
  tagName: "md-list",
  elementClass: MdList,
  react: React,
});

export { ListItem as MdListItem, List as MdList };
