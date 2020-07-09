import React from "react";
import cx from "classnames";

interface Options {
  className: string;
}

export const applyTheme = <T extends Options>(
  Component: React.FC<T>,
  { className }: Options
) => (props: T) => {
  return <Component {...props} className={cx([className, props.className])} />;
};

export default applyTheme;
