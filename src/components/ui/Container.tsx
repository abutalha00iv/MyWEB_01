import type { ElementType, ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
};

export function Container({ children, as: Tag = "div", className = "" }: ContainerProps) {
  return <Tag className={`mx-auto w-full max-w-6xl px-6 sm:px-8 lg:px-10 ${className}`}>{children}</Tag>;
}
