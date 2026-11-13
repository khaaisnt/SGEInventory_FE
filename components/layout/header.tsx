import Image from "next/image";
import React from "react";

export default function Header() {
  return (
    <div className="relative isolate w-full overflow-hidden rounded-2xl bg-linear-to-r from-apricot-white to-primary-100 px-6 py-8 text-primary-600 shadow-md">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-8 -top-16 z-0 size-48 rounded-full bg-yellow-300"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-16 left-[64%] z-0 size-32 rounded-full bg-green-300"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-[46%] top-3 z-0 size-6 rounded-full bg-sky-400/80"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-[55%] top-[65%] z-0 size-3 rounded-full bg-red-400"
      />
      <div className="relative z-10 flex w-full items-center justify-between">
        <div className="relative z-10">
          <h1 className="font-bold text-5xl mb-2">Hello, there!</h1>
          <h4 className="font-medium text-2xl">
            Here&apos;s your request overview
          </h4>
        </div>
        <div className="relative z-10">
          <Image
            src="/assets/stationary-vector.png"
            alt="stationary"
            width={170}
            height={32}
          />
        </div>
      </div>
    </div>
  );
}
