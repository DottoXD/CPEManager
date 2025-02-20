import { MdSecondaryTab } from "@material/web/tabs/secondary-tab";
import { MdPrimaryTab } from "@material/web/tabs/primary-tab";
import { MdTabs } from "@material/web/tabs/tabs";

import React from "react";
import { createComponent } from "@lit/react";

const SecondaryTab = createComponent({
  tagName: "md-secondary-tab",
  elementClass: MdSecondaryTab,
  react: React,
});

const PrimaryTab = createComponent({
  tagName: "md-primary-tab",
  elementClass: MdPrimaryTab,
  react: React,
});

const Tabs = createComponent({
  tagName: "md-tabs",
  elementClass: MdTabs,
  react: React,
});

export {
  SecondaryTab as MdSecondaryTab,
  PrimaryTab as MdPrimaryTab,
  Tabs as MdTabs,
};
