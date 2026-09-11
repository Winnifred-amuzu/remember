import { createFileRoute } from "@tanstack/react-router";
import { PatientShell, PatientHeading } from "@/components/PatientShell";
import { memoriesWithPerson, people } from "@/features/data/demo-data";
import { useSpeech } from "@/features/voice/use-speech";

export const Route = createFileRoute("/people")({
  head: () => ({
    meta: [
      { title: "Your people — ReMember" },
      {
        name: "description",
        content:
          "The people closest to you, with their relationship and the memories you share, presented in large, calm type.",
      },
      { property: "og:title", content: "Your people — ReMember" },
      {
        property: "og:description",
        content: "Recognize the person. Remember the relationship.",
      },
    ],
  }),
  component: PeoplePage,
});

function PeoplePage() {
  const { speak } = useSpeech();

  return (
    <PatientShell>
      <PatientHeading title="Your people" subtitle="The people who love you." />

      <ul className="space-y-4">
        {people.map((p) => {
          const count = memoriesWithPerson(p.id).length;
          return (
            <li key={p.id} className="card-soft flex items-center gap-4 p-5">
              <img
                src={p.photo}
                alt={p.name}
                width={640}
                height={640}
                loading="lazy"
                className="size-24 shrink-0 rounded-2xl object-cover"
              />
              <div className="min-w-0">
                <p className="patient-type text-3xl font-bold text-foreground">{p.name}</p>
                <p className="patient-type text-xl text-primary">{p.relationship}</p>
                <p className="patient-type mt-1 text-lg text-muted-foreground">
                  {count} memories together
                </p>
                <button
                  type="button"
                  onClick={() => speak(`${p.name} is ${p.relationship.toLowerCase()}. ${p.bio}`)}
                  className="patient-type mt-3 min-h-14 rounded-xl border border-border bg-card px-4 text-lg font-bold text-foreground hover:bg-secondary focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/40"
                >
                  🔊 Tell me about {p.name}
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </PatientShell>
  );
}
