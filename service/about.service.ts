import { useEffect, useRef, useState } from "react";

import data from "../lib/data.json";

const stats = (data as AboutData).about.stats;

export const useAboutStatsAnimation = () => {
  const statsSectionRef = useRef<HTMLElement | null>(null);
  const [animatedStats, setAnimatedStats] = useState<Record<StatKey, number>>({
    clients: 0,
    offices: 0,
    experts: 0,
    revenue: 0,
  });
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const section = statsSectionRef.current;
    if (!section || hasAnimated) {
      return;
    }

    const targets = stats.reduce(
      (acc, item) => {
        acc[item.key] = item.value;
        return acc;
      },
      { clients: 0, offices: 0, experts: 0, revenue: 0 } as Record<
        StatKey,
        number
      >,
    );

    let rafId = 0;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || hasAnimated) {
          return;
        }

        const duration = 1600;
        const startTime = performance.now();

        const update = (now: number) => {
          const progress = Math.min((now - startTime) / duration, 1);
          const easedProgress = 1 - Math.pow(1 - progress, 3);

          setAnimatedStats({
            clients: Math.round(targets.clients * easedProgress),
            offices: Math.round(targets.offices * easedProgress),
            experts: Math.round(targets.experts * easedProgress),
            revenue: Math.round(targets.revenue * easedProgress),
          });

          if (progress < 1) {
            rafId = window.requestAnimationFrame(update);
          } else {
            setHasAnimated(true);
            observer.disconnect();
          }
        };

        rafId = window.requestAnimationFrame(update);
      },
      { threshold: 0.35 },
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
      if (rafId) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, [hasAnimated]);

  return { statsSectionRef, animatedStats };
};
