"use client";

import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface SplashScreenProps {
  onFinish?: () => void;
}

export default function SplashScreen({ onFinish }: SplashScreenProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsFadingOut(true);

      setTimeout(() => {
        setIsVisible(false);
        if (onFinish) onFinish();
      }, 500);
    }, 2500);

    return () => clearTimeout(timer);
  }, [onFinish]);

  if (!isVisible) return null;

  return (
    <div
      className={cn(
        "fixed inset-0 z-100 flex flex-col items-center justify-center bg-primary-100 transition-opacity duration-500",
        isFadingOut ? "opacity-0" : "opacity-100",
      )}
    >
      <div className="flex flex-col items-center animate-pulse">
        <div className="mb-4 rounded-2xl bg-white/20 p-4 backdrop-blur-sm">
          <Image
            src={"/assets/logo.png"}
            alt="logo RactIT"
            width={100}
            height={100}
          />
        </div>

        <h1 className="text-5xl font-extrabold tracking-tight text-white drop-shadow-md">
          <span
            className="font-bold tracking-tight
             [-webkit-text-stroke:4px_white] 
             [paint-order:stroke_fill] 
             drop-shadow-[0_2px_3px_rgba(0,0,0,0.2)]"
          >
            <span className="text-primary-600">Rack</span>
            <span className="text-primary-900">IT</span>
          </span>
        </h1>
        <p className="mt-2 text-sm font-medium tracking-widest text-primary-900 uppercase">
          Inventory System
        </p>
      </div>

      <div className="absolute bottom-16 flex flex-col items-center gap-3 opacity-80">
        <Icon
          icon="line-md:loading-twotone-loop"
          className="size-8 text-primary-900"
        />
        <span className="text-xs font-semibold text-primary-900 tracking-wider">
          Loading...
        </span>
      </div>
    </div>
  );
}
