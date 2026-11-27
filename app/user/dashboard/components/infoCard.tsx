import { Icon } from "@iconify/react";
import type { HistoryMe } from "@/app/user/history/types/history.type";
import ReturnBorrow from "./returnBorrow";
import DetailModal from "./detailModal";

interface InfoCardProps {
  request: HistoryMe;
}

const statusStyles: Record<
  string,
  { accent: string; badge: string; line: string }
> = {
  PENDING: {
    accent: "border-amber-400",
    badge: "border-amber-400 text-amber-500",
    line: "bg-amber-400",
  },
  APPROVED: {
    accent: "border-green-400",
    badge: "border-green-500 text-green-600",
    line: "bg-green-400",
  },
  REJECTED: {
    accent: "border-red-400",
    badge: "border-red-500 text-red-600",
    line: "bg-red-400",
  },
  REJECT: {
    accent: "border-red-400",
    badge: "border-red-500 text-red-600",
    line: "bg-red-400",
  },
  RETURNED: {
    accent: "border-gray-400",
    badge: "border-gray-400 text-gray-400",
    line: "bg-gray-400",
  },
  RETURN_PENDING: {
    accent: "border-sky-400",
    badge: "border-sky-500 text-sky-600",
    line: "bg-sky-400",
  },
  RETURN_REJECTED: {
    accent: "border-red-400",
    badge: "border-red-500 text-red-600",
    line: "bg-red-400",
  },
};

function formatRequestDate(start: string, end: string) {
  const format = (value: string) => {
    const [year, month, day] = value.slice(0, 10).split("-").map(Number);
    if (!year || !month || !day) return value;
    return new Intl.DateTimeFormat("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
      timeZone: "UTC",
    }).format(new Date(Date.UTC(year, month - 1, day)));
  };

  const startDate = format(start);
  const endDate = format(end);
  const startParts = startDate.match(/^(\d+) (.+) (\d{4})$/);
  const endParts = endDate.match(/^(\d+) (.+) (\d{4})$/);

  if (
    startParts &&
    endParts &&
    startParts[2] === endParts[2] &&
    startParts[3] === endParts[3]
  ) {
    return `${startParts[1]} – ${endParts[1]} ${endParts[2]} ${endParts[3]}`;
  }
  return `${startDate} – ${endDate}`;
}

export default function InfoCard({ request }: InfoCardProps) {
  const isBorrowing = request.type === "BORROWING";
  const detail = isBorrowing ? request.borrowing : request.consignment;
  const status = detail.status.toUpperCase();
  const styles = statusStyles[status] ?? statusStyles.PENDING;
  const dateRange =
    request.type === "BORROWING"
      ? formatRequestDate(
          request.borrowing.pickUpDate,
          request.borrowing.returnDate,
        )
      : formatRequestDate(
          request.consignment.startDate,
          request.consignment.endDate,
        );
  const statusMessage =
    status === "PENDING"
      ? "Waiting for admin verification"
      : status === "APPROVED"
        ? isBorrowing
          ? "Ready to be taken"
          : "Items are ready to be stored"
        : status === "RETURNED"
          ? "Items returned"
          : status === "RETURN_PENDING"
            ? "Waiting for return verification"
            : status === "RETURN_REJECTED"
              ? "Return was rejected"
              : "Request was rejected";
  const statusLabel = status.replaceAll("_", " ");

  return (
    <article
      className={`rounded-r-2xl rounded-l-sm border-l-8 ${styles.accent} bg-white p-4 shadow-md`}
    >
      <div className="flex items-center gap-2">
        <span
          className={`inline-flex min-w-0 items-center justify-center rounded-full border-2 bg-transparent px-3 py-1 text-sm font-semibold ${styles.badge}`}
        >
          {statusLabel}
        </span>
        <div
          aria-hidden="true"
          className={`relative h-0.5 flex-1 ${styles.line}`}
        >
          <span
            className={`absolute -right-1 -top-1 size-2.5 rotate-45 ${styles.line}`}
          />
        </div>
      </div>

      <div className="mt-3 space-y-2 text-sm font-semibold text-primary-900">
        <p className="flex items-center gap-2">
          <Icon
            icon="ri:team-fill"
            aria-hidden="true"
            className="size-5 shrink-0"
          />
          {detail.lembaga.name}
        </p>
        <p className="flex items-center gap-2">
          <Icon
            icon="material-symbols:calendar-month"
            aria-hidden="true"
            className="size-5 shrink-0"
          />
          {dateRange}
        </p>
        <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
          <p className="flex items-center gap-2">
            <Icon
              icon={
                status === "APPROVED"
                  ? "material-symbols:assignment-turned-in"
                  : status === "REJECTED" || status === "RETURN_REJECTED"
                    ? "material-symbols:cancel"
                    : "material-symbols:hourglass-top"
              }
              aria-hidden="true"
              className="size-5 shrink-0"
            />
            {statusMessage}
          </p>
          <div className="flex flex-wrap items-center gap-2">
            <DetailModal request={request} />
            {isBorrowing &&
              (status === "APPROVED" || status === "RETURN_REJECTED") && (
                <ReturnBorrow borrowingId={detail.id} />
              )}
          </div>
        </div>
      </div>
    </article>
  );
}
