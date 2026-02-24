export function LeafIcon({
  className,
  size = 20,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M12 2C8 6 4 10 4 16c0 4 3 6 6 6 4 0 8-2 10-6-2-4-6-8-8-14z"
        fill="currentColor"
      />
    </svg>
  );
}

export function LeafIconGreen({ className }: { className?: string }) {
  return (
    <span className={`inline-flex text-[var(--accent-green)] ${className ?? ""}`}>
      <LeafIcon size={18} />
    </span>
  );
}
