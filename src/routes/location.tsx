import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { PatientShell, PatientHeading } from "@/components/PatientShell";
import { MiniMap } from "@/components/MiniMap";
import {
  DEMO_POSITION,
  evaluateSafety,
  placeContextSentence,
  readDevicePosition,
  type Position,
} from "@/features/location/location-service";
import { memoriesAtPlace } from "@/features/data/demo-data";
import { useSpeech } from "@/features/voice/use-speech";

export const Route = createFileRoute("/location")({
  head: () => ({
    meta: [
      { title: "Where you are — ReMember" },
      {
        name: "description",
        content:
          "A calm view of where you are right now, the memories connected to this place, and the family who can reach you.",
      },
      { property: "og:title", content: "Where you are — ReMember" },
      {
        property: "og:description",
        content: "Location as context, not tracking: know the place and the memories it holds.",
      },
    ],
  }),
  component: LocationPage,
});

function LocationPage() {
  const [position, setPosition] = useState<Position>(DEMO_POSITION);
  const { speak } = useSpeech();

  useEffect(() => {
    readDevicePosition().then(setPosition);
  }, []);

  const safety = evaluateSafety(position);
  const sentence = placeContextSentence(position);
  const related = safety.place ? memoriesAtPlace(safety.place.id) : [];

  return (
    <PatientShell>
      <PatientHeading title="Where you are" />

      <section className="card-soft p-5">
        <p className="patient-type text-[30px] font-bold text-foreground">{safety.place?.name}</p>
        <p className="patient-type text-xl text-muted-foreground">{safety.place?.area}</p>
        <MiniMap position={position} inZone={safety.status === "safe"} className="mt-4 h-52" />
        <p className="patient-type mt-4 text-[22px] leading-relaxed text-foreground">{sentence}</p>
        <button
          type="button"
          onClick={() => speak(sentence)}
          className="patient-type mt-4 min-h-16 w-full rounded-2xl bg-primary px-5 text-xl font-bold text-primary-foreground hover:bg-primary/92 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/40"
        >
          🔊 Where am I?
        </button>
      </section>

      <section className="card-soft mt-5 p-5">
        <p className="patient-type text-2xl font-bold text-foreground">Memories from here</p>
        <ul className="mt-3 space-y-2">
          {related.map((m) => (
            <li key={m.id} className="patient-type text-xl text-foreground">
              • {m.title} — {m.displayDate}
            </li>
          ))}
          {related.length === 0 ? (
            <li className="patient-type text-xl text-muted-foreground">
              I don't have memories saved for this place yet.
            </li>
          ) : null}
        </ul>
      </section>

      <p className="mt-4 text-center text-sm text-muted-foreground">
        Position source: {position.source === "device-gps" ? "this device's GPS" : "demo data"} · accuracy ±
        {position.accuracyM}m
      </p>
    </PatientShell>
  );
}
