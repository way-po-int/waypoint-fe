"use client";

import { useEffect, useMemo, useRef } from "react";

const HEIGHT = 173;
const ITEM_HEIGHT = 26;
const PERSPECTIVE = 50;

interface DayWheelPickerProps {
  totalDays: number;
  selectedDay: number;
  onChange: (next: number) => void;
}

const clamp = (n: number, min: number, max: number) =>
  Math.max(min, Math.min(max, n));

const DayWheelPicker = ({
  totalDays,
  selectedDay,
  onChange,
}: DayWheelPickerProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const scrollEndTimer = useRef<number | null>(null);
  const rafId = useRef<number | null>(null);

  const availableDays = Math.max(0, totalDays);
  const isDisabled = availableDays <= 0;

  const items = useMemo(
    () => Array.from({ length: availableDays }, (_, i) => i + 1),
    [availableDays],
  );

  const padY = (HEIGHT - ITEM_HEIGHT) / 2;

  const wheelStyle = () => {
    if (isDisabled) return;

    const el = containerRef.current;
    if (!el) return;

    const centerY = el.scrollTop + HEIGHT / 2;

    el.querySelectorAll<HTMLButtonElement>("[data-wheel-item]").forEach(
      (child) => {
        const itemCenter = child.offsetTop + ITEM_HEIGHT / 2;
        const distItems = (itemCenter - centerY) / ITEM_HEIGHT;
        const abs = Math.abs(distItems);

        const rotate = clamp(distItems * 18, -70, 70);
        const scale = clamp(1 - abs * 0.08, 0.72, 1);
        const opacity = clamp(1 - abs * 0.22, 0.2, 1);

        child.style.transform = `rotateX(${rotate}deg) scale(${scale})`;
        child.style.opacity = String(opacity);
      },
    );
  };

  const snapToNearest = () => {
    if (isDisabled) return;

    const el = containerRef.current;
    if (!el) return;

    const nearestIndex = Math.round(el.scrollTop / ITEM_HEIGHT);
    const next = clamp(nearestIndex + 1, 1, availableDays);

    el.scrollTo({ top: (next - 1) * ITEM_HEIGHT, behavior: "smooth" });
    if (next !== selectedDay) onChange(next);
  };

  const handleScroll = () => {
    if (isDisabled) return;

    if (rafId.current) cancelAnimationFrame(rafId.current);
    rafId.current = requestAnimationFrame(wheelStyle);

    if (scrollEndTimer.current) window.clearTimeout(scrollEndTimer.current);
    scrollEndTimer.current = window.setTimeout(snapToNearest, 120);
  };

  // selectedDay 바뀌면 해당 위치로 스크롤
  useEffect(() => {
    if (isDisabled) return;

    const el = containerRef.current;
    if (!el) return;

    const index = clamp(selectedDay - 1, 0, availableDays - 1);
    el.scrollTo({ top: index * ITEM_HEIGHT, behavior: "smooth" });
  }, [selectedDay, availableDays, isDisabled]);

  // 최초 1회 스타일 적용
  useEffect(() => {
    if (isDisabled) return;

    wheelStyle();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items.length, isDisabled]);

  return (
    <div
      className="relative w-full"
      style={{
        height: HEIGHT,
        perspective: `${PERSPECTIVE}px`,
      }}
    >
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="h-full overflow-y-scroll snap-y snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        style={{
          paddingTop: padY,
          paddingBottom: padY,
        }}
      >
        {items.map((d) => {
          const isActive = d === selectedDay;

          return (
            <button
              key={d}
              type="button"
              data-wheel-item
              className={`w-full snap-center flex items-center justify-center transition-[color,font-weight] duration-150 ${
                isActive ? "text-black" : "text-slate-400"
              }`}
              style={{
                height: ITEM_HEIGHT,
                transformStyle: "preserve-3d",
                willChange: "transform, opacity",
              }}
              onClick={() => {
                if (isDisabled) return;
                onChange(d);
                const el = containerRef.current;
                if (!el) return;
                el.scrollTo({ top: (d - 1) * ITEM_HEIGHT, behavior: "smooth" });
              }}
            >
              <span className="relative inline-flex items-center justify-center">
                <span
                  className={`inline-block w-[2.5ch] text-center ${
                    isActive ? "text-xl" : "text-lg"
                  }`}
                >
                  {d}
                </span>

                {isActive && (
                  <span className="absolute left-full whitespace-nowrap font-semibold">
                    일차
                  </span>
                )}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default DayWheelPicker;
