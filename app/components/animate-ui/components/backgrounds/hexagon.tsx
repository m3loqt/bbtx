"use client";

import type { ComponentProps } from "react";

const DEFAULT_SIZE = 75;
const DEFAULT_MARGIN = 3;

export function HexagonBackground({
  hexagonSize = DEFAULT_SIZE,
  hexagonMargin = DEFAULT_MARGIN,
  hexagonProps,
  className,
  ...props
}: ComponentProps<"div"> & {
  hexagonSize?: number;
  hexagonMargin?: number;
  hexagonProps?: ComponentProps<"div">;
}) {
  const h = Math.sqrt(3) * (hexagonSize / 2);
  const cols = 20;
  const rows = 30;

  // Pointy-top hexagon points (inscribed in hexagonSize x hexagonSize square)
  const cx = hexagonSize / 2;
  const pts = [
    [cx, 0],
    [hexagonSize, hexagonSize / 4],
    [hexagonSize, (3 * hexagonSize) / 4],
    [cx, hexagonSize],
    [0, (3 * hexagonSize) / 4],
    [0, hexagonSize / 4],
  ];
  const points = pts.map(([x, y]) => `${x},${y}`).join(" ");

  return (
    <div className={className} {...props}>
      <div className="absolute inset-0 bg-white" />
      <svg
        className="absolute inset-0 h-full w-full overflow-hidden"
        aria-hidden
      >
        <g stroke="rgba(0,0,0,0.12)" strokeWidth="1" fill="none">
          {Array.from({ length: rows }).map((_, row) =>
            Array.from({ length: cols }).map((_, col) => {
              const x =
                (col + (row % 2) * 0.5) * (hexagonSize + hexagonMargin) - hexagonSize;
              const y = row * (h + hexagonMargin) - hexagonSize;
              return (
                <polygon
                  key={`${row}-${col}`}
                  points={points}
                  transform={`translate(${x}, ${y})`}
                  {...hexagonProps}
                />
              );
            })
          )}
        </g>
      </svg>
    </div>
  );
}
