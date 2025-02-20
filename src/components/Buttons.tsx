import { MdFilledTonalButton } from "@material/web/button/filled-tonal-button";
import { MdElevatedButton } from "@material/web/button/elevated-button";
import { MdFilledButton } from "@material/web/button/filled-button";
import { MdOutlinedButton } from "@material/web/button/outlined-button";
import { MdTextButton } from "@material/web/button/text-button";

import React from "react";
import { createComponent } from "@lit/react";

const FilledTonalButton = createComponent({
  tagName: "md-filled-tonal-button",
  elementClass: MdFilledTonalButton,
  react: React,
});

const ElevatedButton = createComponent({
  tagName: "md-elevated-button",
  elementClass: MdElevatedButton,
  react: React,
});

const FilledButton = createComponent({
  tagName: "md-filled-button",
  elementClass: MdFilledButton,
  react: React,
});

const OutlinedButton = createComponent({
  tagName: "md-outlined-button",
  elementClass: MdOutlinedButton,
  react: React,
});

const TextButton = createComponent({
  tagName: "md-text-button",
  elementClass: MdTextButton,
  react: React,
});

export {
  FilledTonalButton as MdFilledTonalButton,
  ElevatedButton as MdElevatedButton,
  FilledButton as MdFilledButton,
  OutlinedButton as MdOutlinedButton,
  TextButton as MdTextButton,
};
