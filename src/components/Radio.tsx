import { MdRadio } from "@material/web/radio/radio";

import React from "react";
import { createComponent } from "@lit/react";

const Radio = createComponent({
  tagName: "md-radio",
  elementClass: MdRadio,
  react: React,
});

export { Radio as MdRadio };
