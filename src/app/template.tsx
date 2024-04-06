"use client";

// ** External Imports
import { ReactNode } from "react";

// ** Internal Imports
import ThemeComponent from "@/theme/ThemeComponent";
import DynamicAlert from "@/components/alert/dynamic-alert";

type TemplateProps = {
  children: ReactNode;
};

const Template = ({ children }: TemplateProps) => {
  return (
    <ThemeComponent>
      {children}
      <DynamicAlert />
    </ThemeComponent>
  );
};

export default Template;
