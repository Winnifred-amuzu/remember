import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PatientShell, PatientHeading } from "@/components/PatientShell";
import { searchMemories } from "@/features/ai/memory-assistant";
import { getPerson, getPlace, memories } from "@/features/data/demo-data";
import { useSpeech } from "@/features/voice/use-speech";

export const Route = createFileRoute("/memories")({
  head: () => ({
    meta: [
      { title: "Memories — ReMember" },
      {
        name: "description",
        content:
          "A gentle timeline of the moments, people and places that make up your life story, searchable in everyday language.",
      },
      { property: "og:title", content: "Memories — ReMember" },
      {
        property: "og:description",
        content: "Revisit your life story: people, places and moments, told simply.",
      },
    ],
  }),
  component: MemoriesPage,
});

function MemoriesPage() {
  const [query, setQuery] = useState("");
  const { speak } = useSpeech();
  const results = useMemo(() => searchMemories(query), [query]);

  const years = useMemo(() => {
    const grouped = new Map<string, typeof memories>();
    for (const m of results) {
      const y = m.date.slice(0, 4);
      grouped.set(y, [...(grouped.get(y) ?? []), m]);
    }
    return [...grouped.entries()].sort((a, b) => b[0].localeCompare(a[0]));
  }, [results]);

  return (
    <PatientShell>
      <PatientHeading title="Your memories" subtitle="Your story, one moment at a time." />

      <label className="patient-type block text-xl font-semibold text-foreground" htmlFor="memory-search">
        Ask for a memory
      </label>
      <input
        id="memory-search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Show me memories with Winnifred"
        className="patient-type mt-2 min-h-16 w-full rounded-2xl border border-input bg-card px-5 text-xl text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/40"
      />

      {results.length === 0 ? (
        <p className="patient-type mt-6 rounded-2xl bg-secondary p-6 text-xl text-foreground">
          I don't have that information yet. Try another name or moment.
        </p>
      ) : null}

      <div className="mt-6 space-y-8">
        {years.map(([year, items]) => (
          <section key={year} aria-label={year}>
            <h2 className="patient-type text-3xl font-bold text-primary">{year}</h2>
            <ol className="mt-3 space-y-4 border-l-2 border-border pl-5">
              {items.map((m) => {
                const who = m.peopleIds.map((id) => getPerson(id)?.name).filter(Boolean).join(", ");
                const place = getPlace(m.locationId);
                return (
                  <li key={m.id} className="card-soft overflow-hidden">
                    <img
                      src={m.photo}
                      alt={m.title}
                      width={1024}
                      height={640}
                      loading="lazy"
                      className="aspect-16/9 w-full object-cover"
                    />
                    <div className="p-5">
                      <p className="patient-type text-[26px] font-bold text-foreground">{m.title}</p>
                      <p className="patient-type text-xl text-muted-foreground">
                        {m.displayDate} · {place?.name}, {place?.area}
                      </p>
                      <p className="patient-type mt-2 text-[21px] leading-relaxed text-foreground">
                        {m.narration}
                      </p>
                      <p className="patient-type mt-2 text-lg text-muted-foreground">With {who}</p>
                      <div className="mt-3 flex flex-wrap items-center gap-3">
                        <button
                          type="button"
                          onClick={() => speak(m.narration)}
                          className="patient-type min-h-14 rounded-xl bg-primary px-5 text-lg font-bold text-primary-foreground hover:bg-primary/92 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/40"
                        >
                          🔊 Hear the memory
                        </button>
                        {m.verified ? (
                          <span className="rounded-full bg-success/35 px-3 py-1 text-sm font-semibold text-success-foreground">
                            Verified by family
                          </span>
                        ) : (
                          <span className="rounded-full bg-warning/30 px-3 py-1 text-sm font-semibold text-warning-foreground">
                            Awaiting family check
                          </span>
                        )}
                      </div>
                    </div>
                  </li>
                );
              })}
            </ol>
          </section>
        ))}
      </div>
    </PatientShell>
  );
}
