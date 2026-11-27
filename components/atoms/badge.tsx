import { cn } from "@/lib/utils";

interface BadgeProps {
  status: string;
  className?: string;
}

const statusStyles: Record<string, string> = {
  PENDING: "bg-amber-400 text-white",
  APPROVED: "bg-accent-green text-white",
  REJECTED: "bg-accent-red text-white",
  RETURN_PENDING: "bg-sky-400 text-white",
  RETURN_REJECTED: "bg-accent-red text-white",
};

export default function Badge({ status, className }: BadgeProps) {
  const normalizedStatus = status.trim().toUpperCase();
  const label = normalizedStatus
    ? normalizedStatus.charAt(0) + normalizedStatus.slice(1).toLowerCase()
    : "Unknown";

  return (
    <span
      className={cn(
        "inline-flex min-w-28 items-center justify-center uppercase rounded-full border-[3px] border-white px-5 py-1.5 text-sm font-bold shadow-md",
        statusStyles[normalizedStatus] ?? "bg-slate-400 text-white",
        className,
      )}
    >
      {label}
    </span>
  );
}
