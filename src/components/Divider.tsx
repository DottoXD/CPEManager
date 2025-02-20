import { MdDivider } from "@material/web/divider/divider";

import React from "react";
import { createComponent } from "@lit/react";

const Divider = createComponent({
  tagName: "md-divider",
  elementClass: MdDivider,
  react: React,
});

export { Divider as MdDivider };
