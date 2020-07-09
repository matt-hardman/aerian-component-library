import React from "react";

interface Options {
  className: string;
}

export const applyTheme = <T extends {}>(
  Component: React.FC<T>,
  { className }: Options
) => (props: T) => {
  return <Component {...props} className={className} />;
};

export default applyTheme;
