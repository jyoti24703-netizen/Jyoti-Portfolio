export const ANALYTICS_STORAGE_KEY = "jyoti_portfolio_analytics_v1";
const VISITOR_KEY = "jyoti_portfolio_visitor_id_v1";

const getSafeWindow = () => (typeof window !== "undefined" ? window : null);

const getVisitorId = () => {
  const win = getSafeWindow();
  if (!win) return "server";

  const existingId = win.localStorage.getItem(VISITOR_KEY);
  if (existingId) return existingId;

  const newId = `visitor_${Math.random().toString(36).slice(2, 10)}`;
  win.localStorage.setItem(VISITOR_KEY, newId);
  return newId;
};

const getStoredAnalytics = () => {
  const win = getSafeWindow();
  if (!win) return [];

  const raw = win.localStorage.getItem(ANALYTICS_STORAGE_KEY);
  if (!raw) return [];

  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const persistAnalytics = (events) => {
  const win = getSafeWindow();
  if (!win) return;
  win.localStorage.setItem(ANALYTICS_STORAGE_KEY, JSON.stringify(events.slice(0, 300)));
};

const toContext = () => {
  const win = getSafeWindow();
  if (!win) return {};

  return {
    page: win.location.pathname,
    referrer: document.referrer || "direct",
    language: navigator.language,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    viewport: `${win.innerWidth}x${win.innerHeight}`,
    userAgent: navigator.userAgent,
  };
};

export const trackEvent = async (type, metadata = {}) => {
  const event = {
    id: `${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    type,
    timestamp: new Date().toISOString(),
    visitorId: getVisitorId(),
    metadata: {
      ...toContext(),
      ...metadata,
    },
  };

  const events = [event, ...getStoredAnalytics()];
  persistAnalytics(events);

  const endpoint = import.meta.env.VITE_ANALYTICS_ENDPOINT;
  if (!endpoint) return event;

  try {
    await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(event),
    });
  } catch {
    // Local analytics still works even if remote endpoint is unavailable.
  }

  return event;
};

export const getAnalyticsEvents = () => getStoredAnalytics();

export const getAnalyticsSummary = () => {
  const events = getStoredAnalytics();
  const views = events.filter((item) => item.type === "portfolio_view");
  const resumeDownloads = events.filter((item) => item.type === "resume_download");
  const uniqueVisitors = new Set(views.map((item) => item.visitorId));

  return {
    totalEvents: events.length,
    totalViews: views.length,
    totalResumeDownloads: resumeDownloads.length,
    uniqueVisitors: uniqueVisitors.size,
    events,
  };
};

export const clearAnalytics = () => {
  const win = getSafeWindow();
  if (!win) return;
  win.localStorage.removeItem(ANALYTICS_STORAGE_KEY);
};
