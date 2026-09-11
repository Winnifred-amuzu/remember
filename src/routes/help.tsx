import { createFileRoute } from "@tanstack/react-router";
import { PatientShell, PatientHeading } from "@/components/PatientShell";
import { people } from "@/features/data/demo-data";

export const Route = createFileRoute("/help")({
  head: () => ({
    meta: [
      { title: "Help — ReMember" },
      {
        name: "description",
        content:
          "Reach the people who care for you in one tap, and see simple reminders of how ReMember can help right now.",
      },
      { property: "og:title", content: "Help — ReMember" },
      { property: "og:description", content: "One tap to reach the people who care for you." },
    ],
  }),
  component: HelpPage,
});

function HelpPage() {
  return (
    <PatientShell>
      <PatientHeading title="Help" subtitle="Someone is always close by." />

      <ul className="space-y-4">
        {people.map((p) => (
          <li key={p.id}>
            <a
              href="tel:+233000000000"
              className="patient-type card-soft flex min-h-24 items-center gap-4 p-5 text-2xl font-bold text-foreground hover:bg-secondary focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/40"
            >
              <img
                src={p.photo}
                alt=""
                width={640}
                height={640}
                loading="lazy"
                className="size-16 rounded-xl object-cover"
              />
              <span>
                Call {p.name}
                <span className="block text-lg font-normal text-muted-foreground">
                  {p.relationship}
                </span>
              </span>
            </a>
          </li>
        ))}
      </ul>

      <section className="card-soft mt-5 p-5">
        <p className="patient-type text-2xl font-bold text-foreground">What ReMember can do</p>
        <ul className="patient-type mt-3 space-y-2 text-xl text-foreground">
          <li>• Tell you who someone is</li>
          <li>• Share a memory with them</li>
          <li>• Tell you where you are</li>
          <li>• Let your family know you're okay</li>
        </ul>
      </section>
    </PatientShell>
  );
}
