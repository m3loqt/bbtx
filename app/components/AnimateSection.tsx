"use client";

import { useEffect, useRef, useState } from "react";

type AnimateSectionProps = {
  children: React.ReactNode;
  /** Skip animation for first section (e.g. Hero) so it's visible immediately */
  noAnimation?: boolean;
};

export function AnimateSection({ children, noAnimation }: AnimateSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(noAnimation ?? false);

  useEffect(() => {
    if (noAnimation) {
      setVisible(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [noAnimation]);

  if (noAnimation) {
    return <>{children}</>;
  }

  return (
    <div
      ref={ref}
      className={`transition-all duration-[600ms] ease-out ${
        visible
          ? "translate-y-0 opacity-100"
          : "translate-y-3 opacity-0"
      }`}
    >
      {children}
    </div>
  );
}
