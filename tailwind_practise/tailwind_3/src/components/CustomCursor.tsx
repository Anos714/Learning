import { useEffect, useState } from "react";

type Position = {
  x: number;
  y: number;
};

export default function CustomCursor() {
  const [pos, setPos] = useState<Position>({ x: 0, y: 0 });
  const [hovering, setHovering] = useState<boolean>(false);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
    };

    const mouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;

      if (!target) return;

      const isHover = target.closest(
        "a, button, input, textarea, select, [data-cursor='pointer']",
      );

      setHovering(Boolean(isHover));
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", mouseOver);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", mouseOver);
    };
  }, []);

  return (
    <>
      {/* Outer circle */}
      <div
        className={`pointer-events-none fixed z-[9999] rounded-full border mix-blend-difference transition-all duration-200 ease-in-out ${
          hovering
            ? "h-14 w-14 border-white/80 bg-white/10"
            : "h-[34px] w-[34px] border-white/45"
        }`}
        style={{
          left: `${pos.x}px`,
          top: `${pos.y}px`,
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* Inner dot */}
      <div
        className="pointer-events-none fixed z-[10000] h-[6px] w-[6px] rounded-full bg-white mix-blend-difference"
        style={{
          left: `${pos.x}px`,
          top: `${pos.y}px`,
          transform: "translate(-50%, -50%)",
        }}
      />
    </>
  );
}
