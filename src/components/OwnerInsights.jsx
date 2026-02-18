import React, { useMemo, useState } from "react";
import { clearAnalytics, getAnalyticsSummary } from "../utils/analytics";

const formatDate = (value) =>
  new Date(value).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });

const OwnerInsights = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [refreshToken, setRefreshToken] = useState(0);

  const ownerMode = useMemo(() => {
    if (typeof window === "undefined") return false;
    return new URLSearchParams(window.location.search).get("owner") === "1";
  }, []);

  const summary = useMemo(() => getAnalyticsSummary(), [refreshToken, isOpen]);

  if (!ownerMode) return null;

  return (
    <div className="mt-5 rounded-xl border border-purple-400/30 bg-[#130f26] p-4">
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-sm font-semibold text-purple-200">Owner Insights</h3>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setRefreshToken((value) => value + 1)}
            className="rounded-md bg-white/10 px-2 py-1 text-xs text-gray-200 hover:bg-white/20"
          >
            Refresh
          </button>
          <button
            type="button"
            onClick={() => setIsOpen((value) => !value)}
            className="rounded-md bg-purple-600 px-2 py-1 text-xs text-white hover:bg-purple-700"
          >
            {isOpen ? "Hide" : "Show"}
          </button>
        </div>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
        <div className="rounded-lg bg-white/5 p-2">
          <p className="text-gray-400">Portfolio Views</p>
          <p className="text-base font-semibold text-white">{summary.totalViews}</p>
        </div>
        <div className="rounded-lg bg-white/5 p-2">
          <p className="text-gray-400">Resume Downloads</p>
          <p className="text-base font-semibold text-white">{summary.totalResumeDownloads}</p>
        </div>
        <div className="rounded-lg bg-white/5 p-2">
          <p className="text-gray-400">Unique Visitors</p>
          <p className="text-base font-semibold text-white">{summary.uniqueVisitors}</p>
        </div>
        <div className="rounded-lg bg-white/5 p-2">
          <p className="text-gray-400">Stored Events</p>
          <p className="text-base font-semibold text-white">{summary.totalEvents}</p>
        </div>
      </div>

      {isOpen ? (
        <div className="mt-3">
          <p className="text-[11px] text-gray-400">Recent activity ({summary.events.length})</p>
          <div className="mt-2 max-h-44 space-y-2 overflow-y-auto pr-1 text-xs">
            {summary.events.slice(0, 8).map((item) => (
              <div key={item.id} className="rounded-lg bg-white/5 p-2 text-gray-200">
                <p className="font-semibold text-purple-200">{item.type}</p>
                <p>{formatDate(item.timestamp)}</p>
                <p className="truncate text-gray-400">{item.visitorId}</p>
              </div>
            ))}
            {summary.events.length === 0 ? <p className="text-gray-500">No events yet.</p> : null}
          </div>
          <button
            type="button"
            onClick={() => {
              clearAnalytics();
              setRefreshToken((value) => value + 1);
            }}
            className="mt-3 rounded-md bg-red-500/80 px-2 py-1 text-xs text-white hover:bg-red-600"
          >
            Clear Local Data
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default OwnerInsights;
