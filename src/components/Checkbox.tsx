import { MdCheckbox } from "@material/web/checkbox/checkbox";

import React from "react";
import { createComponent } from "@lit/react";

const Checkbox = createComponent({
  tagName: "md-checkbox",
  elementClass: MdCheckbox,
  react: React,
});

export { Checkbox as MdCheckbox };
