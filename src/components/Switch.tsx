import { MdSwitch } from "@material/web/switch/switch";

import React from "react";
import { createComponent } from "@lit/react";

const Switch = createComponent({
  tagName: "md-switch",
  elementClass: MdSwitch,
  react: React,
});

export { Switch as MdSwitch };
