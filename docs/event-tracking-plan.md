# GolfTime Event Tracking Plan

## Purpose

This document defines the analytics events implemented in the GolfTime booking experience, including when each event fires and which properties are collected.

## Event Specification

| Event | Trigger | Properties |
|---|---|---|
| SEARCH_SUBMITTED | User submits a location search | location |
| TEE_TIME_SELECTED | User selects a tee time | course, time, price |
| BOOKING_STARTED | User reaches the booking page | course, time, price |
| BOOKING_COMPLETED | User successfully completes a booking | course, time, price, players, totalPrice |

## Common Event Fields

Every analytics event contains:

- `event` — event name
- `timestamp` — ISO timestamp generated when the event occurs
- `sessionId` — identifier used to associate events within the same browser session
- `properties` — event-specific metadata

## Example Event

```json
{
  "event": "BOOKING_COMPLETED",
  "timestamp": "2026-09-20T12:59:00.000Z",
  "sessionId": "example-session-id",
  "properties": {
    "course": "Greensboro Country Club",
    "time": "11:15 AM",
    "price": 48,
    "players": 2,
    "totalPrice": 96
  }
}