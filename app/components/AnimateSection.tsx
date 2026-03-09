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
      // Very low threshold so animation doesn't fight scrolling
      { threshold: 0.01, rootMargin: "0px 0px -10px 0px" }
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
      className={`transition-opacity duration-400 ease-out ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      {children}
    </div>
  );
}
