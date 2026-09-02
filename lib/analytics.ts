export type AnalyticsEvent = {
    event: string;
    timestamp: string;
    properties?: Record<string, unknown>;
  };
  
  export function trackEvent(
    event: string,
    properties?: Record<string, unknown>
  ) {
    const analyticsEvent: AnalyticsEvent = {
      event,
      timestamp: new Date().toISOString(),
      properties,
    };
  
    console.log("Analytics Event:", analyticsEvent);
  }