import { MdOutlinedTextField } from "@material/web/textfield/outlined-text-field";
import { MdFilledTextField } from "@material/web/textfield/filled-text-field";

import React from "react";
import { createComponent } from "@lit/react";

const OutlinedTextField = createComponent({
  tagName: "md-outlined-text-field",
  elementClass: MdOutlinedTextField,
  react: React,
});

const FilledTextField = createComponent({
  tagName: "md-filled-text-field",
  elementClass: MdFilledTextField,
  react: React,
});

export {
  OutlinedTextField as MdOutlinedTextField,
  FilledTextField as MdFilledTextField,
};
