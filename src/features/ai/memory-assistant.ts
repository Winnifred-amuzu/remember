/**
 * Retrieval-grounded assistant.
 *
 * Rule: retrieve first, generate second. Answers are composed ONLY from
 * verified seeded records. When nothing is retrieved the assistant says it
 * does not have the information — it never invents people, dates or events.
 *
 * In production, `retrieve()` becomes a pgvector similarity search and
 * `answer()` calls an LLM with the retrieved context as the only source.
 */
import {
  memories,
  people,
  places,
  getPerson,
  getPlace,
  type Memory,
} from "@/features/data/demo-data";

export interface Retrieved {
  memories: Memory[];
  peopleNames: string[];
}

export interface GroundedAnswer {
  text: string;
  sources: string[];
  grounded: boolean;
}

const normalize = (s: string) => s.toLowerCase().replace(/[^a-z0-9\s]/g, " ");

/** Lightweight lexical + entity scoring standing in for semantic retrieval. */
export function retrieve(query: string, limit = 4): Retrieved {
  const q = normalize(query);
  const terms = q.split(/\s+/).filter((t) => t.length > 2);
  const matchedPeople = people.filter((p) => q.includes(p.name.toLowerCase()));

  const scored = memories.map((m) => {
    const haystack = normalize(
      [m.title, m.description, m.narration, m.displayDate, m.tags.join(" "),
        m.peopleIds.map((id) => getPerson(id)?.name ?? "").join(" "),
        getPlace(m.locationId)?.name ?? "",
        getPlace(m.locationId)?.area ?? ""].join(" "),
    );
    let score = terms.reduce((acc, t) => acc + (haystack.includes(t) ? 1 : 0), 0);
    if (matchedPeople.some((p) => m.peopleIds.includes(p.id))) score += 3;
    if (m.verified) score += 0.25;
    return { m, score };
  });

  return {
    memories: scored
      .filter((s) => s.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, limit)
      .map((s) => s.m),
    peopleNames: matchedPeople.map((p) => p.name),
  };
}

export function searchMemories(query: string): Memory[] {
  if (!query.trim()) return [...memories].sort((a, b) => b.date.localeCompare(a.date));
  return retrieve(query, 10).memories;
}

const NO_INFO = "I don't have that information yet.";

export function answer(question: string, context?: { personId?: string }): GroundedAnswer {
  const q = normalize(question);

  // Location intent
  if (/(where are we|where am i|where are you|what place|location)/.test(q)) {
    const home = places.find((p) => p.id === "loc_home");
    if (!home) return { text: NO_INFO, sources: [], grounded: false };
    return {
      text: `You're at home in ${home.area}. It's a familiar place — ${
        memories.filter((m) => m.locationId === home.id).length
      } of your memories happened here.`,
      sources: [`Place: ${home.name}`],
      grounded: true,
    };
  }

  // Person-in-view intent
  const focused = context?.personId ? getPerson(context.personId) : undefined;
  if (focused && /(who is this|who is that|who am i looking at|who)/.test(q)) {
    return {
      text: `This is ${focused.name}, ${focused.relationship.toLowerCase()}.`,
      sources: [`Person: ${focused.name}`],
      grounded: true,
    };
  }

  const found = retrieve(question);
  const subject =
    people.find((p) => q.includes(p.name.toLowerCase())) ??
    (/(her|him|them|about)/.test(q) ? focused : undefined);

  if (subject) {
    const theirs = memories.filter((m) => m.peopleIds.includes(subject.id));
    if (theirs.length === 0) return { text: NO_INFO, sources: [], grounded: false };
    const latest = theirs.sort((a, b) => b.date.localeCompare(a.date))[0]!;
    return {
      text: `${subject.name} is ${subject.relationship.toLowerCase()}. ${subject.bio} ${latest.narration}`,
      sources: [`Person: ${subject.name}`, `Memory: ${latest.title}`],
      grounded: true,
    };
  }

  if (found.memories.length > 0) {
    const m = found.memories[0]!;
    const who = m.peopleIds.map((id) => getPerson(id)?.name).filter(Boolean).join(", ");
    return {
      text: `${m.narration} That was ${m.displayDate}, with ${who}.`,
      sources: [`Memory: ${m.title}`],
      grounded: true,
    };
  }

  return { text: NO_INFO, sources: [], grounded: false };
}

export const suggestedQuestions = [
  "Who is this?",
  "Tell me about her",
  "What happened at Christmas?",
  "Where are we?",
];
