export type AnalyticsEvent = {
    event: string;
    timestamp: string;
    properties?: Record<string, unknown>;
  };
  
  export async function trackEvent(
    event: string,
    properties?: Record<string, unknown>
  ) {
    const analyticsEvent: AnalyticsEvent = {
      event,
      timestamp: new Date().toISOString(),
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
 