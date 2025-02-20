import { MdDialog } from "@material/web/dialog/dialog";

import React from "react";
import { createComponent } from "@lit/react";

const Dialog = createComponent({
  tagName: "md-dialog",
  elementClass: MdDialog,
  react: React,
});

export { Dialog as MdDialog };
