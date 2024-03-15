// React
import { type ReactNode } from "react";

export function GameContainer({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-[95vh] min-w-[33vw] flex-col bg-gray-800/50">
      {children}
    </div>
  );
}
