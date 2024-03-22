// React
import { type ReactNode } from "react";

export function GameContainer({ children }: { children: ReactNode }) {
  return <div className="bg-gray-800/50">{children}</div>;
}
