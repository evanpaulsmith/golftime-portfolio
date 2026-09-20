import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-white px-6 py-12 text-black">
      <div className="mx-auto max-w-5xl">
        <header className="mb-12">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-gray-500">
            Analytics Implementation Portfolio
          </p>

          <h1 className="mb-4 text-4xl font-bold">
            GolfTime Analytics
          </h1>

          <p className="max-w-3xl text-lg text-gray-700">
            A full-stack digital analytics implementation demonstrating
            event instrumentation, API collection, PostgreSQL storage,
            session-based analysis, SQL reporting, and dashboard
            visualization.
          </p>

          <Link
            href="/search"
            className="mt-6 inline-block rounded bg-black px-5 py-3 text-white"
          >
            Open Booking Demo
          </Link>
        </header>

        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-bold">
            Implementation Architecture
          </h2>

          <div className="rounded border p-6">
            <div className="flex flex-wrap items-center gap-3 font-mono text-sm">
              <span className="rounded bg-gray-100 px-3 py-2">
                User Interaction
              </span>
              <span>→</span>

              <span className="rounded bg-gray-100 px-3 py-2">
                Next.js Frontend
              </span>
              <span>→</span>

              <span className="rounded bg-gray-100 px-3 py-2">
                Analytics Tracking
              </span>
              <span>→</span>

              <span className="rounded bg-gray-100 px-3 py-2">
                POST /api/events
              </span>
              <span>→</span>

              <span className="rounded bg-gray-100 px-3 py-2">
                PostgreSQL
              </span>
              <span>→</span>

              <span className="rounded bg-gray-100 px-3 py-2">
                SQL Analysis
              </span>
              <span>→</span>

              <span className="rounded bg-gray-100 px-3 py-2">
                Metabase Dashboard
              </span>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-bold">
            Tracked Booking Funnel
          </h2>

          <div className="grid gap-4 md:grid-cols-4">
            {[
              "SEARCH_SUBMITTED",
              "TEE_TIME_SELECTED",
              "BOOKING_STARTED",
              "BOOKING_COMPLETED",
            ].map((event, index) => (
              <div key={event} className="rounded border p-4">
                <p className="mb-2 text-sm text-gray-500">
                  Step {index + 1}
                </p>
                <p className="font-mono text-sm font-semibold">
                  {event}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-bold">
            Technology Stack
          </h2>

          <div className="flex flex-wrap gap-3">
            {[
              "Next.js",
              "React",
              "TypeScript",
              "PostgreSQL",
              "SQL",
              "JSONB",
              "Metabase",
              "Docker",
              "Postman",
              "Git",
            ].map((technology) => (
              <span
                key={technology}
                className="rounded border px-3 py-2 text-sm"
              >
                {technology}
              </span>
            ))}
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-bold">
            What This Project Demonstrates
          </h2>

          <ul className="list-disc space-y-2 pl-6 text-gray-700">
            <li>Frontend analytics event instrumentation</li>
            <li>Session-based user journey tracking</li>
            <li>Server-side event collection and validation</li>
            <li>PostgreSQL event persistence using JSONB</li>
            <li>SQL-based funnel and revenue analysis</li>
            <li>Metabase analytics dashboard reporting</li>
            <li>API validation and testing with Postman</li>
          </ul>
        </section>
      </div>
    </main>
  );
} 