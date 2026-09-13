export type AnalyticsEvent = {
    event: string;
    timestamp: string;
    sessionId: string;
    properties?: Record<string, unknown>;
  };
  
  function getSessionId() {
    let sessionId = sessionStorage.getItem("golftime_session_id");
  
    if (!sessionId) {
      sessionId = crypto.randomUUID();
      sessionStorage.setItem("golftime_session_id", sessionId);
    }
  
    return sessionId;
  }
  
  export async function trackEvent(
    event: string,
    properties?: Record<string, unknown>
  ) {
    const analyticsEvent: AnalyticsEvent = {
      event,
      timestamp: new Date().toISOString(),
      sessionId: getSessionId(),
      properties,
    };
  
    console.log("Analytics Event:", analyticsEvent);
  
    try {
      const response = await fetch("/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(analyticsEvent),
      });
  
      if (!response.ok) {
        console.error("Analytics API error:", response.status);
      }
    } catch (error) {
      console.error("Failed to send analytics event:", error);
    }
  }