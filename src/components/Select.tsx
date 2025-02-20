import { MdOutlinedSelect } from "@material/web/select/outlined-select";
import { MdFilledSelect } from "@material/web/select/filled-select";
import { MdSelectOption } from "@material/web/select/select-option";

import React from "react";
import { createComponent } from "@lit/react";

const OutlinedSelect = createComponent({
  tagName: "md-outlined-select",
  elementClass: MdOutlinedSelect,
  react: React,
});

const FilledSelect = createComponent({
  tagName: "md-filled-select",
  elementClass: MdFilledSelect,
  react: React,
});

const SelectOption = createComponent({
  tagName: "md-select-option",
  elementClass: MdSelectOption,
  react: React,
});

export {
  OutlinedSelect as MdOutlinedSelect,
  FilledSelect as MdFilledSelect,
  SelectOption as MdSelectOption,
};
