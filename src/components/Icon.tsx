import { MdFilledTonalIconButton } from "@material/web/iconbutton/filled-tonal-icon-button";
import { MdOutlinedIconButton } from "@material/web/iconbutton/outlined-icon-button";
import { MdFilledIconButton } from "@material/web/iconbutton/filled-icon-button";
import { MdIconButton } from "@material/web/iconbutton/icon-button";
import { MdIcon } from "@material/web/icon/icon";

import React from "react";
import { createComponent } from "@lit/react";

const FilledTonalIconButton = createComponent({
  tagName: "md-filled-tonal-icon-button",
  elementClass: MdFilledTonalIconButton,
  react: React,
});

const OutlinedIconButton = createComponent({
  tagName: "md-outlined-icon-button",
  elementClass: MdOutlinedIconButton,
  react: React,
});

const FilledIconButton = createComponent({
  tagName: "md-filled-icon-button",
  elementClass: MdFilledIconButton,
  react: React,
});

const IconButton = createComponent({
  tagName: "md-icon-button",
  elementClass: MdIconButton,
  react: React,
});
const Icon = createComponent({
  tagName: "md-icon",
  elementClass: MdIcon,
  react: React,
});

export {
  FilledTonalIconButton as MdFilledTonalIconButton,
  OutlinedIconButton as MdOutlinedIconButton,
  FilledIconButton as MdFilledIconButton,
  IconButton as MdIconButton,
  Icon as MdIcon,
};
