import { useEffect, useState } from "react";
import { useMotionValue, useReducedMotion } from "motion/react";
import * as m from "motion/react-m";
import "./CustomCursor.css";

const INTERACTIVE_SELECTOR = 'a[href], button, [role="button"], [role="link"], summary';
const NATIVE_SELECTOR = 'input, textarea, select, [contenteditable]:not([contenteditable="false"])';
const TEXT_SELECTOR = "p, h1, h2, h3, h4, h5, h6, span, em, strong, small, li, label, dt, dd";
const DEFAULT_SHAPE = { mode: "circle", width: 14, height: 14, radius: "50%" };

function getTextHeight(target, pointerX, pointerY) {
  if (!target.closest(TEXT_SELECTOR) || target.closest('[aria-hidden="true"]')) {
    return null;
  }

  let range = document.caretRangeFromPoint?.(pointerX, pointerY);
  if (!range && document.caretPositionFromPoint) {
    const position = document.caretPositionFromPoint(pointerX, pointerY);
    if (position) {
      range = document.createRange();
      range.setStart(position.offsetNode, position.offset);
      range.collapse(true);
    }
  }

  if (
    !range ||
    range.startContainer.nodeType !== Node.TEXT_NODE ||
    !range.startContainer.textContent.trim() ||
    !target.contains(range.startContainer.parentElement)
  ) {
    return null;
  }

  const rect = range.getBoundingClientRect();
  if (
    !rect.height ||
    Math.abs(pointerX - rect.left) > 12 ||
    pointerY < rect.top - 4 ||
    pointerY > rect.bottom + 4
  ) {
    return null;
  }

  return Math.min(58, Math.max(18, rect.height));
}

export default function CustomCursor() {
  const prefersReducedMotion = useReducedMotion();
  const [hasMouse, setHasMouse] = useState(false);
  const [visible, setVisible] = useState(false);
  const [shape, setShape] = useState(DEFAULT_SHAPE);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  useEffect(() => {
    const media = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setHasMouse(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!hasMouse || prefersReducedMotion) return;

    let shown = false;
    let lastX = 0;
    let lastY = 0;

    const updateShape = (next) => {
      setShape((previous) =>
        previous.mode === next.mode &&
        previous.width === next.width &&
        previous.height === next.height &&
        previous.radius === next.radius
          ? previous
          : next,
      );
    };

    const hide = () => {
      shown = false;
      setVisible(false);
      document.documentElement.classList.remove("custom-cursor-active");
    };

    const updateAt = (pointerX, pointerY, target) => {
      if (!(target instanceof Element)) return;
      lastX = pointerX;
      lastY = pointerY;

      if (target.closest(NATIVE_SELECTOR)) {
        shown = false;
        setVisible(false);
        document.documentElement.classList.remove("custom-cursor-active");
        return;
      }

      let next = DEFAULT_SHAPE;
      let centerX = pointerX;
      let centerY = pointerY;
      const interactive = target.closest(INTERACTIVE_SELECTOR);

      if (interactive) {
        const rect = interactive.getBoundingClientRect();
        const radius = getComputedStyle(interactive).borderRadius;
        next = {
          mode: "interactive",
          width: rect.width + 8,
          height: rect.height + 8,
          radius: radius === "0px" ? "8px" : radius,
        };
        centerX = rect.left + rect.width / 2;
        centerY = rect.top + rect.height / 2;
      } else {
        const textHeight = getTextHeight(target, pointerX, pointerY);
        if (textHeight) {
          next = { mode: "text", width: 2, height: textHeight, radius: "2px" };
        }
      }

      updateShape(next);
      x.set(centerX);
      y.set(centerY);
      if (!shown) {
        shown = true;
        document.documentElement.classList.add("custom-cursor-active");
        setVisible(true);
      }
    };

    const onPointerMove = (event) => {
      if (event.pointerType !== "mouse") {
        hide();
        return;
      }
      updateAt(event.clientX, event.clientY, event.target);
    };

    const refresh = () => {
      if (!shown) return;
      updateAt(lastX, lastY, document.elementFromPoint(lastX, lastY));
    };

    const onPointerOut = (event) => {
      if (!event.relatedTarget) hide();
    };

    document.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("pointerout", onPointerOut);
    window.addEventListener("scroll", refresh, { passive: true });
    window.addEventListener("resize", refresh);
    window.addEventListener("blur", hide);
    return () => {
      hide();
      document.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerout", onPointerOut);
      window.removeEventListener("scroll", refresh);
      window.removeEventListener("resize", refresh);
      window.removeEventListener("blur", hide);
    };
  }, [hasMouse, prefersReducedMotion, x, y]);

  if (!hasMouse || prefersReducedMotion) return null;

  const interactive = shape.mode === "interactive";
  return (
    <m.div
      className="custom-cursor"
      data-mode={shape.mode}
      aria-hidden="true"
      style={{ left: x, top: y, x: "-50%", y: "-50%" }}
      animate={{
        width: shape.width,
        height: shape.height,
        borderRadius: shape.radius,
        backgroundColor: interactive ? "rgba(53, 152, 255, 0.12)" : "#3598ff",
        borderColor: interactive ? "#8ac6ff" : "rgba(53, 152, 255, 0)",
        opacity: visible ? 1 : 0,
      }}
      transition={{ type: "spring", stiffness: 430, damping: 36, mass: 0.65 }}
    />
  );
}
