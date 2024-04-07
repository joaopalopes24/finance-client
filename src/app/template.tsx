"use client";

// ** External Imports
import { ReactNode } from "react";

// ** Internal Imports
import ThemeComponent from "@/theme/ThemeComponent";

type TemplateProps = {
  children: ReactNode;
};

const Template = ({ children }: TemplateProps) => {
  return (
    <ThemeComponent>
      {children}
    </ThemeComponent>
  );
};

export default Template;
