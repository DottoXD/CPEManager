import { MdRipple } from "@material/web/ripple/ripple";

import React from "react";
import { createComponent } from "@lit/react";

const Ripple = createComponent({
  tagName: "md-ripple",
  elementClass: MdRipple,
  react: React,
});

export { Ripple as MdRipple };
