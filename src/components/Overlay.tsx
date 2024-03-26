// React
import { type ReactNode } from "react";

type OverlayProps = {
  children: ReactNode;
};

export function Overlay({ children }: OverlayProps) {
  return <div className="absolute z-50 size-full bg-black/75">{children}</div>;
}
