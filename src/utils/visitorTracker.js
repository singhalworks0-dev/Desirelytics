/**
 * Visitor Activity Tracker
 * Tracks page visits & CTA button interactions to send notifications to admin@desirelytics.com
 */

const NOTIFY_EMAIL = "admin@desirelytics.com";

export function trackVisitorEvent(eventType, details = {}) {
  try {
    const payload = {
      recipient: NOTIFY_EMAIL,
      eventType,
      page: typeof window !== "undefined" ? window.location.pathname : "/",
      timestamp: new Date().toISOString(),
      actionDetails: details,
      referrer: typeof document !== "undefined" && document.referrer ? document.referrer : "Direct",
      device: typeof window !== "undefined" ? `${window.innerWidth}x${window.innerHeight}` : "Unknown",
    };

    if (typeof window !== "undefined" && navigator.sendBeacon) {
      const blob = new Blob([JSON.stringify(payload)], { type: "application/json" });
      navigator.sendBeacon("/api/notify-visitor", blob);
    } else if (typeof fetch !== "undefined") {
      fetch("/api/notify-visitor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }).catch(() => {});
    }
  } catch {
    // Silent fallback ensuring zero impact on user experience
  }
}
