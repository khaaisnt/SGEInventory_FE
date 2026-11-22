import Link from "next/link";
import { Icon } from "@iconify/react";

export default function NotFound() {
  return (
    <main className="relative isolate flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#f7fbff] px-6 py-24 sm:py-32 lg:px-8">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 -top-40 -z-10 size-120 rounded-full bg-primary-100/70 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-48 -left-40 -z-10 size-112 rounded-full bg-blue-100/70 blur-3xl"
      />

      <div className="relative z-10 flex max-w-lg flex-col items-center text-center">
        <div className="mb-6 flex size-24 items-center justify-center rounded-full bg-primary-100 shadow-inner">
          <Icon
            icon="material-symbols:search-off-rounded"
            className="size-12 text-primary-600"
          />
        </div>

        <p className="text-lg font-bold tracking-widest text-primary-600 uppercase">
          Error 404
        </p>

        <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-primary-900 sm:text-5xl">
          Page not found
        </h1>

        <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg">
          Sorry, we couldn&apos;t find the page you&apos;re looking for. It
          might have been moved or doesn&apos;t exist in our inventory system.
        </p>

        <div className="mt-10 flex items-center justify-center gap-x-4">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-primary-600 px-6 py-3.5 font-bold text-white shadow-lg shadow-primary-600/20 transition-all hover:-translate-y-0.5 hover:bg-primary-900"
          >
            <Icon
              icon="material-symbols:arrow-back-rounded"
              className="size-5"
            />
            Back to Home
          </Link>
          <Link
            href="/login"
            className="inline-flex items-center justify-center rounded-2xl border border-primary-200 bg-white/80 px-6 py-3.5 font-bold text-primary-900 transition-all hover:border-primary-600 hover:bg-white"
          >
            Go to Dashboard
          </Link>
        </div>
      </div>
    </main>
  );
}
