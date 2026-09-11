import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { PatientShell } from "@/components/PatientShell";
import { AIAssistant } from "@/components/AIAssistant";
import { recognitionService } from "@/features/recognition/recognition-service";
import { memoriesWithPerson, patient, type Person } from "@/features/data/demo-data";
import { useSpeech } from "@/features/voice/use-speech";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ReMember — Your memories. Your people. Your story." },
      {
        name: "description",
        content:
          "ReMember helps people living with memory impairment recognize loved ones, revisit meaningful memories, and stay safely connected to family.",
      },
      { property: "og:title", content: "ReMember — Your memories. Your people. Your story." },
      {
        property: "og:description",
        content:
          "A calm companion that recognizes the people around you and brings back the memories you share.",
      },
    ],
  }),
  component: PatientHome,
});

function greeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 18) return "Good afternoon";
  return "Good evening";
}

function PatientHome() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [cameraOn, setCameraOn] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [person, setPerson] = useState<Person | null>(null);
  const [notFound, setNotFound] = useState(false);
  const { speak } = useSpeech();

  useEffect(() => {
    let stream: MediaStream | null = null;
    navigator.mediaDevices
      ?.getUserMedia({ video: { facingMode: "user" } })
      .then((s) => {
        stream = s;
        setCameraOn(true);
        if (videoRef.current) videoRef.current.srcObject = s;
      })
      .catch(() => setCameraOn(false));
    return () => stream?.getTracks().forEach((t) => t.stop());
  }, []);

  const whoIsThis = async () => {
    setScanning(true);
    setNotFound(false);
    setPerson(null);
    const result = await recognitionService.recognizeFromFrame();
    setScanning(false);
    if (result.status === "recognized" && result.person) {
      setPerson(result.person);
      speak(`This is ${result.person.name}, ${result.person.relationship.toLowerCase()}.`);
    } else {
      setNotFound(true);
    }
  };

  const memory = person ? memoriesWithPerson(person.id)[0] : undefined;

  return (
    <PatientShell>
      <header className="mb-5">
        <p className="patient-type text-2xl text-muted-foreground">{greeting()} ❤️</p>
        <h1 className="patient-type text-[44px] font-bold leading-tight text-foreground">
          {patient.preferredName}
        </h1>
      </header>

      <section aria-label="Camera" className="card-soft overflow-hidden p-0">
        <div className="relative aspect-4/5 w-full bg-secondary">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="size-full object-cover"
            aria-label="Live camera view"
          />
          {!cameraOn ? (
            <div className="absolute inset-0 grid place-items-center px-6 text-center">
              <p className="patient-type text-xl text-muted-foreground">
                The camera is off. You can still ask ReMember who is with you.
              </p>
            </div>
          ) : null}
          {scanning ? (
            <div className="absolute inset-0 grid place-items-center bg-foreground/45">
              <div className="flex flex-col items-center gap-3">
                <span className="relative grid size-16 place-items-center">
                  <span className="absolute inset-0 rounded-full bg-card/70 animate-[var(--animate-listening)]" />
                  <span aria-hidden className="relative text-3xl">
                    ✦
                  </span>
                </span>
                <p className="patient-type text-xl font-bold text-card">Looking…</p>
              </div>
            </div>
          ) : null}
        </div>

        <div className="p-5">
          <h2 className="patient-type text-3xl font-bold text-foreground">Who is this?</h2>
          <p className="patient-type mt-1 text-xl text-muted-foreground">
            Point the camera at someone you know.
          </p>
          <button
            type="button"
            onClick={whoIsThis}
            disabled={scanning}
            className="patient-type mt-4 min-h-20 w-full rounded-2xl bg-primary px-6 text-[22px] font-bold text-primary-foreground transition-colors hover:bg-primary/92 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/40 disabled:opacity-60"
          >
            {scanning ? "Looking…" : "Who is this?"}
          </button>
        </div>
      </section>

      {notFound ? (
        <p className="patient-type mt-5 rounded-2xl bg-warning/25 p-5 text-xl text-foreground">
          I don't know this person yet. Your family can add them for you.
        </p>
      ) : null}

      {person ? (
        <section
          aria-live="polite"
          className="card-soft mt-5 overflow-hidden animate-[var(--animate-rise)]"
        >
          <div className="flex items-center gap-4 p-5">
            <img
              src={person.photo}
              alt={person.name}
              width={640}
              height={640}
              loading="lazy"
              className="size-24 rounded-2xl object-cover"
            />
            <div>
              <p className="patient-type text-4xl font-bold text-foreground">{person.name}</p>
              <p className="patient-type text-2xl text-primary">{person.relationship} ❤️</p>
            </div>
          </div>

          {memory ? (
            <div className="border-t border-border p-5">
              <p className="patient-type text-xl text-muted-foreground">
                🧠 A memory with {person.name}
              </p>
              <p className="patient-type mt-1 text-[26px] font-bold text-foreground">
                {memory.title}
              </p>
              <p className="patient-type mt-1 text-xl text-muted-foreground">
                {memory.displayDate}
              </p>
              <img
                src={memory.photo}
                alt={memory.title}
                width={1024}
                height={640}
                loading="lazy"
                className="mt-3 aspect-16/10 w-full rounded-2xl object-cover"
              />
              <p className="patient-type mt-3 text-[22px] leading-relaxed text-foreground">
                {memory.narration}
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => speak(memory.narration)}
                  className="patient-type min-h-16 flex-1 rounded-2xl bg-primary px-5 text-xl font-bold text-primary-foreground hover:bg-primary/92 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/40"
                >
                  🔊 Hear the memory
                </button>
                <Link
                  to="/memories"
                  className="patient-type flex min-h-16 flex-1 items-center justify-center rounded-2xl border border-border bg-card px-5 text-xl font-bold text-foreground hover:bg-secondary focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/40"
                >
                  ❤️ More memories
                </Link>
              </div>
            </div>
          ) : null}
        </section>
      ) : null}

      <div className="mt-5">
        <AIAssistant personId={person?.id} />
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3">
        <Link
          to="/memories"
          className="patient-type card-soft flex min-h-24 flex-col items-center justify-center gap-1 text-xl font-bold text-foreground hover:bg-secondary focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/40"
        >
          <span aria-hidden className="text-3xl">
            🧠
          </span>
          Memories
        </Link>
        <Link
          to="/location"
          className="patient-type card-soft flex min-h-24 flex-col items-center justify-center gap-1 text-xl font-bold text-foreground hover:bg-secondary focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/40"
        >
          <span aria-hidden className="text-3xl">
            📍
          </span>
          Location
        </Link>
      </div>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        ReMember supports memory and connection. It does not diagnose or treat any condition.{" "}
        <Link to="/caregiver" className="font-medium text-primary underline">
          Caregiver view
        </Link>
      </p>
    </PatientShell>
  );
}
