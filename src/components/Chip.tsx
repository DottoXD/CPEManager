import { MdSuggestionChip } from "@material/web/chips/suggestion-chip";
import { MdAssistChip } from "@material/web/chips/assist-chip";
import { MdFilterChip } from "@material/web/chips/filter-chip";
import { MdInputChip } from "@material/web/chips/input-chip";
import { MdChipSet } from "@material/web/chips/chip-set";

import React from "react";
import { createComponent } from "@lit/react";

const SuggestionChip = createComponent({
  tagName: "md-suggestion-chip",
  elementClass: MdSuggestionChip,
  react: React,
});

const AssistChip = createComponent({
  tagName: "md-assist-chip",
  elementClass: MdAssistChip,
  react: React,
});

const FilterChip = createComponent({
  tagName: "md-filter-chip",
  elementClass: MdFilterChip,
  react: React,
});

const InputChip = createComponent({
  tagName: "md-input-chip",
  elementClass: MdInputChip,
  react: React,
});

const ChipSet = createComponent({
  tagName: "md-chip-set",
  elementClass: MdChipSet,
  react: React,
});

export {
  SuggestionChip as MdSuggestionChip,
  AssistChip as MdAssistChip,
  FilterChip as MdFilterChip,
  InputChip as MdInputChip,
  ChipSet as MdChipSet,
};
