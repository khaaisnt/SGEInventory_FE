"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@iconify/react";
import SplashScreen from "@/components/molecules/splashScreen";

export default function MainPage() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <>
      {showSplash && <SplashScreen onFinish={() => setShowSplash(false)} />}

      <div
        className={`min-h-screen transition-opacity duration-1000 ${
          showSplash ? "opacity-0 h-screen overflow-hidden" : "opacity-100"
        }`}
      >
        <main className="relative isolate flex min-h-screen flex-col overflow-hidden bg-[#f7fbff]">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-32 -top-40 -z-10 size-120 rounded-full bg-primary-100/70 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-48 -left-40 -z-10 size-112 rounded-full bg-blue-100/70 blur-3xl"
          />

          <header className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-6 sm:px-10 lg:px-12">
            <Link
              href="/"
              aria-label="RackIT homepage"
              className="flex items-center gap-3"
            >
              <Image
                src="/assets/logo.png"
                alt=""
                width={44}
                height={44}
                className="rounded-xl"
              />
              <span
                className="text-xl font-bold tracking-tight
             [-webkit-text-stroke:4px_white] 
             [paint-order:stroke_fill] 
             drop-shadow-[0_2px_3px_rgba(0,0,0,0.2)]"
              >
                <span className="text-primary-600">Rack</span>
                <span className="text-primary-900">IT</span>
              </span>
            </Link>

            <Link
              href="/login"
              className="rounded-xl px-4 py-2 text-sm font-bold text-primary-900 transition-colors hover:bg-white/70"
            >
              Sign In
            </Link>
          </header>

          <section className="mx-auto grid w-full max-w-7xl flex-1 items-center gap-10 px-6 pb-14 pt-6 sm:px-10 md:grid-cols-2 md:gap-8 lg:px-12 lg:pb-20">
            <div className="max-w-xl">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary-100 bg-white/80 px-4 py-2 text-sm font-semibold text-primary-600 shadow-sm">
                <Icon
                  icon="material-symbols:inventory-2-outline"
                  className="size-5"
                />
                <span>Inventory management, made simple</span>
              </div>

              <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-primary-900 sm:text-5xl lg:text-6xl">
                All your inventory needs,{" "}
                <span className="text-primary-600">in one place.</span>
              </h1>
              <p className="mt-5 max-w-lg text-base leading-7 text-slate-600 sm:text-lg">
                Manage items, track availability, and streamline your borrowing
                process with RackIT.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/login"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-primary-600 px-6 py-3.5 font-bold text-white shadow-lg shadow-primary-600/20 transition hover:-translate-y-0.5 hover:bg-primary-900"
                >
                  Get started
                  <Icon
                    icon="material-symbols:arrow-forward-rounded"
                    className="size-5"
                  />
                </Link>
                <Link
                  href="/register"
                  className="inline-flex items-center justify-center rounded-2xl border border-primary-200 bg-white/80 px-6 py-3.5 font-bold text-primary-900 transition hover:border-primary-600 hover:bg-white"
                >
                  Create account
                </Link>
              </div>

              <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-sm font-medium text-slate-600">
                <span className="inline-flex items-center gap-2">
                  <Icon
                    icon="material-symbols:check-circle-rounded"
                    className="size-5 text-primary-600"
                  />
                  Manage stock effortlessly
                </span>
                <span className="inline-flex items-center gap-2">
                  <Icon
                    icon="material-symbols:check-circle-rounded"
                    className="size-5 text-primary-600"
                  />
                  Centralized information
                </span>
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-xl">
              <div
                aria-hidden="true"
                className="absolute inset-8 rounded-[3rem] bg-primary-100/80 blur-2xl"
              />
              <div className="relative overflow-hidden rounded-4xl border border-white bg-white/70 p-5 shadow-2xl shadow-primary-900/10 backdrop-blur sm:p-8">
                <div className="mb-3 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-slate-500">
                      Inventory system
                    </p>
                    <p className="mt-1 text-lg font-bold text-primary-900">
                      More organized, fully controlled
                    </p>
                  </div>
                  <span className="flex size-11 items-center justify-center rounded-2xl bg-primary-100 text-primary-600">
                    <Icon
                      icon="material-symbols:inventory-2-rounded"
                      className="size-6"
                    />
                  </span>
                </div>
                <Image
                  src="/assets/stationary-vector.png"
                  alt="RackIT inventory equipment illustration"
                  width={620}
                  height={500}
                  priority
                  className="mx-auto h-auto max-h-88 w-full object-contain"
                />
                <div className="mt-3 flex items-center gap-3 rounded-2xl bg-primary-50 p-4">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-white text-primary-600 shadow-sm">
                    <Icon
                      icon="material-symbols:check-rounded"
                      className="size-6"
                    />
                  </span>
                  <p className="text-sm font-semibold leading-5 text-primary-900">
                    Easily track items and monitor their availability.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
