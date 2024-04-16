import React from "react";

const sizes = {
  s: "text-[32px] font-bold leading-[119%]",
  md: "text-[64px] font-bold",
  xs: "text-lg font-black",
};

const Heading = ({ children, className = "", size = "xs", as, ...restProps }) => {
  const Component = as || "h6";

  return (
    <Component className={`text-white-A700 font-rubik ${className} ${sizes[size]}`} {...restProps}>
      {children}
    </Component>
  );
};

export { Heading };
