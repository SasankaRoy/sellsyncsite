import React from "react";
import { useId } from "react";

export function FeaturesSectionWithCardGradient() {
  return (
    <div id="features" className="py-8 sm:py-12 lg:py-24 bg-[#F9F9F9] px-3 sm:px-4">
      <div className="text-center mb-6 sm:mb-8">
        <div className="inline-block rounded-3xl bg-gradient-to-r from-[#D87027] to-[#D87027] text-white px-3 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-base font-medium shadow-lg shadow-[#D87027]/30">Features</div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 max-w-7xl mx-auto">
        {grid.map((feature) => (
          <div
            key={feature.title}
            className="relative bg-gradient-to-b dark:from-neutral-900 from-neutral-100 dark:to-neutral-950 to-white p-4 sm:p-6 rounded-2xl sm:rounded-3xl overflow-hidden border border-gray-200 dark:border-gray-800"
          >
            <p className="text-sm sm:text-base font-bold text-neutral-800 dark:text-white relative z-20">
              {feature.title}
            </p>
            <p className="text-neutral-600 dark:text-neutral-400 mt-3 sm:mt-4 text-xs sm:text-sm md:text-base font-normal relative z-20">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

const grid = [
  {
    title: "Fast & Easy Checkout",
    description:
      "Lightning-fast billing with barcode scanning, item search, and customizable hotkeys.",
  },
  {
    title: "Real-Time Inventory Sync",
    description:
      "Track stock across all locations with auto-adjustments and low-stock alerts.",
  },
  {
    title: "Complete Hardware Integration",
    description:
      "Works flawlessly with SellSync's POS terminal, barcode scanners, receipt printers, and cash drawers.",
  },
  {
    title: "Cloud-Based & Secure",
    description:
      "Your data is backed up automatically and accessible from any device.",
  },
  {
    title: "Customer & Loyalty Management",
    description:
      "Built-in CRM, purchase history, loyalty points, and promotions.",
  },
  {
    title: "Multi-Store Management",
    description:
      "Centralized control panel for pricing, stock transfer, staff roles, and reports across multiple outlets.",
  },
  {
    title: "Advanced Reporting & Analytics",
    description:
      "Sales trends, top-selling products, staff performance, profits, taxes, and more—updated in real time.",
  },
  {
    title: "Staff Permissions & Access Control",
    description:
      "Assign roles, prevent unauthorized actions, and track staff activities.",
  },
];

export const Grid = ({
  pattern,
  size,
}: {
  pattern?: number[][];
  size?: number;
}) => {
  const p = pattern ?? [
    [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
    [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
    [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
    [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
    [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
  ];
  return (
    <div className="pointer-events-none absolute left-1/2 top-0  -ml-20 -mt-2 h-full w-full [mask-image:linear-gradient(white,transparent)]">
      <div className="absolute inset-0 bg-gradient-to-r  [mask-image:radial-gradient(farthest-side_at_top,white,transparent)] dark:from-zinc-900/30 from-zinc-100/30 to-zinc-300/30 dark:to-zinc-900/30 opacity-100">
        <GridPattern
          width={size ?? 20}
          height={size ?? 20}
          x="-12"
          y="4"
          squares={p}
          className="absolute inset-0 h-full w-full  mix-blend-overlay dark:fill-white/10 dark:stroke-white/10 stroke-black/10 fill-black/10"
        />
      </div>
    </div>
  );
};

export function GridPattern({ width, height, x, y, squares, ...props }: any) {
  const patternId = useId();

  return (
    <svg aria-hidden="true" {...props}>
      <defs>
        <pattern
          id={patternId}
          width={width}
          height={height}
          patternUnits="userSpaceOnUse"
          x={x}
          y={y}
        >
          <path d={`M.5 ${height}V.5H${width}`} fill="none" />
        </pattern>
      </defs>
      <rect
        width="100%"
        height="100%"
        strokeWidth={0}
        fill={`url(#${patternId})`}
      />
      {squares && (
        <svg x={x} y={y} className="overflow-visible">
          {squares.map(([x, y]: any) => (
            <rect
              strokeWidth="0"
              key={`${x}-${y}`}
              width={width + 1}
              height={height + 1}
              x={x * width}
              y={y * height}
            />
          ))}
        </svg>
      )}
    </svg>
  );
}