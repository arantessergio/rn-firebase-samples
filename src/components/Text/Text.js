import React from "react";
import { StyledText } from "./styles";

const Text = ({ children, ...props }) => {
  return <StyledText {...props}>{children}</StyledText>;
};

export default Text;
