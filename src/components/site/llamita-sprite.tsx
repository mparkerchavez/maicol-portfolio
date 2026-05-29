"use client";

import { motion, useReducedMotion } from "framer-motion";
import { PixelLlamitaMark } from "@/components/site/pixel-llamita-mark";
import type { LlamitaState } from "@/lib/llamita-behavior";

const easeOut = [0, 0, 0.2, 1] as const;
const easeInOut = [0.42, 0, 0.58, 1] as const;

export type LlamitaLook =
  | {
      mode: "track";
      x: number;
      y: number;
      rotate: number;
    }
  | {
      mode: "bob";
    }
  | null;

type LlamitaSpriteProps = {
  state: LlamitaState;
  look: LlamitaLook;
};

export function LlamitaSprite({ state, look }: LlamitaSpriteProps) {
  const shouldReduceMotion = useReducedMotion();
  const outerMotion = getOuterMotion(state, look, Boolean(shouldReduceMotion));
  const gazeMotion =
    !shouldReduceMotion && look?.mode === "track"
      ? {
          x: look.x,
          y: look.y,
          rotate: look.rotate,
        }
      : {
          x: 0,
          y: 0,
          rotate: 0,
        };

  return (
    <motion.span className="block" animate={outerMotion.animate} transition={outerMotion.transition}>
      <motion.span className="block" animate={gazeMotion} transition={{ duration: 0.16, ease: easeOut }}>
        <PixelLlamitaMark state={state} className="scale-90" />
      </motion.span>
    </motion.span>
  );
}

function getOuterMotion(state: LlamitaState, look: LlamitaLook, shouldReduceMotion: boolean) {
  if (shouldReduceMotion) {
    return {
      animate: { y: 0, rotate: 0, opacity: state === "sleeping" ? 0.72 : 1 },
      transition: { duration: 0 },
    };
  }

  if (look?.mode === "bob") {
    return {
      animate: { y: [0, -3, 0], rotate: 0, opacity: 1 },
      transition: { duration: 0.9, repeat: Infinity, ease: easeOut },
    };
  }

  switch (state) {
    case "observing":
      return {
        animate: { y: [0, -5, 0], rotate: [0, -3, 0], opacity: 1 },
        transition: { duration: 0.6, ease: easeOut },
      };
    case "talking":
      return {
        animate: { y: [0, -2, 0], rotate: [0, 1, 0], opacity: 1 },
        transition: { duration: 0.72, repeat: Infinity, ease: easeInOut },
      };
    case "thinking":
      return {
        animate: { y: [0, -1, 0], rotate: [-2, 2, -2], opacity: 1 },
        transition: { duration: 1.1, repeat: Infinity, ease: easeInOut },
      };
    case "wrong":
      return {
        animate: { y: [0, 1, 0], rotate: [-5, 4, 0], opacity: 1 },
        transition: { duration: 0.5, ease: easeOut },
      };
    case "sleeping":
      return {
        animate: { y: 3, rotate: 0, opacity: 0.72 },
        transition: { duration: 0.8, ease: easeOut },
      };
    case "idle":
    default:
      return {
        animate: { y: [0, -1, 0], rotate: 0, opacity: 1 },
        transition: { duration: 4, repeat: Infinity, ease: easeInOut },
      };
  }
}
