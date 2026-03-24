"use client";

import { useState, type SVGProps } from "react";
import { cn } from "@/lib/utils";

export type InteractiveGridPatternProps = Omit<
  SVGProps<SVGSVGElement>,
  "width" | "height"
> & {
  /** Pixel width of each grid cell */
  width?: number;
  /** Pixel height of each grid cell */
  height?: number;
  /** [columns, rows] — total cells = columns × rows */
  squares?: [number, number];
  className?: string;
  squaresClassName?: string;
};

export function InteractiveGridPattern({
  width: cellWidth = 40,
  height: cellHeight = 40,
  squares = [40, 30],
  className,
  squaresClassName,
  ...props
}: InteractiveGridPatternProps) {
  const [cols, rows] = squares;
  const [hoveredSquare, setHoveredSquare] = useState<number | null>(null);
  const total = cols * rows;

  const vbW = cols * cellWidth;
  const vbH = rows * cellHeight;

  return (
    <svg
      viewBox={`0 0 ${vbW} ${vbH}`}
      preserveAspectRatio="xMidYMid slice"
      className={cn("block h-full w-full", className)}
      aria-hidden
      {...props}
    >
      {Array.from({ length: total }, (_, index) => {
        const col = index % cols;
        const row = Math.floor(index / cols);
        return (
          <rect
            key={index}
            x={col * cellWidth}
            y={row * cellHeight}
            width={cellWidth}
            height={cellHeight}
            strokeWidth={1}
            onMouseEnter={() => setHoveredSquare(index)}
            onMouseLeave={() => setHoveredSquare(null)}
            className={cn(
              "fill-transparent stroke-black/[0.014] transition-[fill,stroke] duration-1000 ease-out",
              squaresClassName,
              hoveredSquare === index &&
                "fill-[#ca3726]/10 stroke-[#ca3726]/22 duration-150 ease-out"
            )}
          />
        );
      })}
    </svg>
  );
}
