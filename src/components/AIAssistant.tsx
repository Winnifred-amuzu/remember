import { useState } from "react";
import { answer, suggestedQuestions } from "@/features/ai/memory-assistant";
import { useSpeech } from "@/features/voice/use-speech";

export function AIAssistant({ personId }: { personId?: string }) {
  const { listening, supported, listen, stop, speak } = useSpeech();
  const [question, setQuestion] = useState<string | null>(null);
  const [reply, setReply] = useState<string | null>(null);

  const ask = (text: string) => {
    setQuestion(text);
    const result = answer(text, { personId });
    setReply(result.text);
    speak(result.text);
  };

  const onMic = () => {
    if (listening) {
      stop();
      return;
    }
    const started = listen((text) => ask(text));
    if (!started) {
      setQuestion(null);
      setReply(
        "Voice listening isn't available on this device. You can tap one of the questions below instead.",
      );
    }
  };

  return (
    <section aria-label="Talk to ReMember" className="card-soft p-5">
      <div className="flex items-center gap-2 text-accent">
        <span aria-hidden className="text-lg">
          ✦
        </span>
        <h2 className="patient-type text-xl font-bold">ReMember</h2>
      </div>

      <button
        type="button"
        onClick={onMic}
        aria-pressed={listening}
        className="patient-type mt-4 flex min-h-20 w-full items-center justify-center gap-3 rounded-2xl bg-primary px-6 text-[22px] font-bold text-primary-foreground shadow-[var(--shadow-soft)] transition-colors hover:bg-primary/92 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/40 active:bg-primary/85"
      >
        <span className="relative grid size-9 place-items-center">
          {listening ? (
            <span
              aria-hidden
              className="absolute inset-0 rounded-full bg-primary-foreground/70 animate-[var(--animate-listening)]"
            />
          ) : null}
          <span aria-hidden className="relative text-2xl">
            🎙
          </span>
        </span>
        {listening ? "I'm listening…" : "Talk to ReMember"}
      </button>

      {!supported ? (
        <p className="mt-2 text-center text-sm text-muted-foreground">
          Tap a question below if speaking isn't easy right now.
        </p>
      ) : null}

      <div className="mt-4 flex flex-wrap gap-2">
        {suggestedQuestions.map((q) => (
          <button
            key={q}
            type="button"
            onClick={() => ask(q)}
            className="patient-type rounded-full border border-border bg-secondary px-4 py-3 text-lg font-semibold text-secondary-foreground transition-colors hover:bg-primary/12 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/40"
          >
            {q}
          </button>
        ))}
      </div>

      {reply ? (
        <div className="mt-5 rounded-2xl bg-accent/10 p-4 animate-[var(--animate-rise)]">
          {question ? (
            <p className="patient-type text-lg text-muted-foreground">You asked: “{question}”</p>
          ) : null}
          <p className="patient-type mt-2 text-[22px] leading-relaxed text-foreground">{reply}</p>
          <button
            type="button"
            onClick={() => speak(reply)}
            className="patient-type mt-3 rounded-xl border border-border bg-card px-4 py-2 text-lg font-semibold text-foreground hover:bg-secondary focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/40"
          >
            🔊 Hear it again
          </button>
        </div>
      ) : null}
    </section>
  );
}
