-- GolfTime Analytics Queries
-- Portfolio project demonstrating PostgreSQL analytics over event data.

-- 1. Event counts
SELECT
  event_name,
  COUNT(*) AS event_count
FROM analytics_events
GROUP BY event_name
ORDER BY event_count DESC;


-- 2. Completed booking metrics
SELECT
  COUNT(*) AS completed_bookings,
  SUM((properties->>'players')::int) AS total_players,
  SUM((properties->>'totalPrice')::numeric) AS total_revenue
FROM analytics_events
WHERE event_name = 'BOOKING_COMPLETED';


-- 3. Revenue by golf course
SELECT
  properties->>'course' AS course,
  COUNT(*) AS bookings,
  SUM((properties->>'players')::int) AS players,
  SUM((properties->>'totalPrice')::numeric) AS revenue
FROM analytics_events
WHERE event_name = 'BOOKING_COMPLETED'
GROUP BY properties->>'course'
ORDER BY revenue DESC;


-- 4. Booking funnel
SELECT
  COUNT(*) FILTER (
    WHERE event_name = 'SEARCH_SUBMITTED'
  ) AS searches,

  COUNT(*) FILTER (
    WHERE event_name = 'TEE_TIME_SELECTED'
  ) AS tee_times_selected,

  COUNT(*) FILTER (
    WHERE event_name = 'BOOKING_COMPLETED'
  ) AS bookings_completed
FROM analytics_events;