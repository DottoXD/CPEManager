import { MdCircularProgress } from "@material/web/progress/circular-progress";
import { MdLinearProgress } from "@material/web/progress/linear-progress";

import React from "react";
import { createComponent } from "@lit/react";

const CircularProgress = createComponent({
  tagName: "md-circular-progress",
  elementClass: MdCircularProgress,
  react: React,
});

const LinearProgress = createComponent({
  tagName: "md-linear-progress",
  elementClass: MdLinearProgress,
  react: React,
});

export {
  CircularProgress as MdCircularProgress,
  LinearProgress as MdLinearProgress,
};
