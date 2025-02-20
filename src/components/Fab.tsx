import { MdBrandedFab } from "@material/web/fab/branded-fab";
import { MdFab } from "@material/web/fab/fab";

import React from "react";
import { createComponent } from "@lit/react";

const BrandedFab = createComponent({
  tagName: "md-branded-fab",
  elementClass: MdBrandedFab,
  react: React,
});

const Fab = createComponent({
  tagName: "md-fab",
  elementClass: MdFab,
  react: React,
});

export { BrandedFab as MdBrandedFab, Fab as MdFab };
