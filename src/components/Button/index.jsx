import React from "react";
import PropTypes from "prop-types";

const shapes = {
  square: "rounded-[0px]",
};
const variants = {
  fill: {
    teal_A200: "bg-teal-A200 shadow-xs text-black-900",
  },
};
const sizes = {
  xs: "h-[47px] px-[33px] text-lg",
  sm: "h-[54px] px-[34px] text-sm",
};

const Button = ({
  children,
  className = "",
  leftIcon,
  rightIcon,
  shape = "square",
  variant = "fill",
  size = "xs",
  color = "teal_A200",
  ...restProps
}) => {
  return (
    <button
      className={`${className} flex items-center justify-center text-center cursor-pointer text-black-900 font-medium bg-teal-A200 ${(shape && shapes[shape]) || ""} ${(size && sizes[size]) || ""} ${(variant && variants[variant]?.[color]) || ""}`}
      {...restProps}
    >
      {!!leftIcon && leftIcon}
      {children}
      {!!rightIcon && rightIcon}
    </button>
  );
};

Button.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  leftIcon: PropTypes.node,
  rightIcon: PropTypes.node,
  shape: PropTypes.oneOf(["square"]),
  size: PropTypes.oneOf(["xs", "sm"]),
  variant: PropTypes.oneOf(["fill"]),
  color: PropTypes.oneOf(["teal_A200"]),
};

export { Button };
