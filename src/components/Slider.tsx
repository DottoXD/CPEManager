import { MdSlider } from "@material/web/slider/slider";

import React from "react";
import { createComponent } from "@lit/react";

const Slider = createComponent({
  tagName: "md-slider",
  elementClass: MdSlider,
  react: React,
});

export { Slider as MdSlider };
