# GolfTime Analytics Implementation

## Project Overview

GolfTime is a demonstration booking application built to showcase a complete digital analytics implementation from user interaction through reporting.

The implementation captures user behavior in the frontend, sends analytics events to a server-side API, stores those events in PostgreSQL, and makes the resulting data available for SQL analysis and dashboard reporting in Metabase.

## Architecture

User Interaction
→ Next.js Frontend
→ JavaScript Analytics Tracking
→ Next.js API Route
→ PostgreSQL
→ SQL Analysis
→ Metabase Dashboard

## Booking Funnel

The application tracks the following primary booking journey:

1. SEARCH_SUBMITTED
2. TEE_TIME_SELECTED
3. BOOKING_STARTED
4. BOOKING_COMPLETED

Each event includes an event timestamp, session identifier, and event-specific properties.

## Analytics Events

### SEARCH_SUBMITTED

Triggered when a user submits a golf course search.

Properties:
- location

### TEE_TIME_SELECTED

Triggered when a user selects an available tee time.

Properties:
- course
- time
- price

### BOOKING_STARTED

Triggered when the booking page is reached.

Properties:
- course
- time
- price

### BOOKING_COMPLETED

Triggered when a booking is successfully completed.

Properties:
- course
- time
- price
- players
- totalPrice

## Session Tracking

A session identifier is attached to analytics events so multiple events generated during the same user journey can be associated with one session.

This allows analysis using unique sessions instead of relying only on raw event counts.

## Data Storage

Analytics events are stored in PostgreSQL.

The analytics event table stores:

- Unique event ID
- Event name
- Event timestamp
- Session ID
- JSON event properties
- Database creation timestamp

JSONB is used for event properties so different event types can store different attributes while sharing a common event schema.

## Reporting

Metabase connects directly to the PostgreSQL database.

The reporting layer currently includes:

- Completed Bookings
- Total Players
- Total Revenue
- Booking Conversion Funnel
- Revenue by Course
- Recent Analytics Events
- Session Conversion Summary


## Implementation Decisions

### Server-Side Event Collection

Analytics events are sent from the browser to a Next.js API endpoint at `/api/events`.

The API validates incoming event payloads before inserting them into PostgreSQL. Database queries use parameterized SQL rather than constructing SQL directly from user-provided values.

### Flexible Event Properties

Event-specific data is stored in a PostgreSQL JSONB column.

This allows events such as searches, tee-time selections, and completed bookings to contain different properties while maintaining a consistent core event structure.

### Session-Based Analysis

A session ID is generated for the browser session and included with tracked events.

This makes it possible to distinguish between raw event volume and the number of unique sessions reaching each stage of the booking funnel.

### Analytics Data and Personal Information

The analytics implementation does not require customer names or email addresses for behavioral reporting.

Booking analytics focuses on operational properties such as course, tee time, price, player count, and total booking value.

## Troubleshooting and Validation

During implementation, database authentication initially failed between the Next.js API and PostgreSQL.

The issue was isolated using the API error response, PostgreSQL authentication testing, and environment configuration. After correcting the database credentials, API requests successfully returned HTTP 200 responses and events were persisted to PostgreSQL.

The implementation was validated at multiple layers:

- API requests were independently tested with Postman.
- PostgreSQL queries confirmed that events were persisted correctly.
- Browser interactions generated the expected analytics events.
- Session IDs were verified across related events.
- SQL queries validated booking counts, player totals, revenue, and funnel activity.
- Metabase dashboards were tested against new application activity to confirm reporting updated from the underlying event data.

## Technology Stack

- Next.js
- TypeScript
- JavaScript
- PostgreSQL
- SQL
- Metabase
- Docker
- Postman
- Git