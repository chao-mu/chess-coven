import { type ReactNode } from "react";

type OverlayProps = {
  children: ReactNode;
};

export function Overlay({ children }: OverlayProps) {
  return (
    <div className="absolute size-full z-50 bg-opacity-75 bg-black">
      {children}
    </div>
  );
}
