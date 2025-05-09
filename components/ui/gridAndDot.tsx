import { cn } from "@/lib/utils";
import React from "react";

export function DotBackground({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full h-full">
      {/* Dotted background */}
      <div
        className={cn(
          "absolute inset-0",
          "[background-size:20px_20px]",
          "[background-image:radial-gradient(#d4d4d4_1px,transparent_1px)]",
          "dark:[background-image:radial-gradient(#404040_1px,transparent_1px)]"
        )}
      />
      {/* Radial gradient overlay */}
      <div className="pointer-events-none absolute inset-0 bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black"></div>
      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}