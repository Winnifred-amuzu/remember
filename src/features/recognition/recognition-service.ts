/**
 * Recognition adapter layer.
 *
 * PROTOTYPE ONLY: `MockRecognitionService` simulates the Face Detection →
 * Face Recognition → Person ID pipeline using seeded demo people. It is NOT a
 * production face-recognition capability and never claims to be one.
 *
 * To go to production, implement `RecognitionService` against a real vision
 * provider (embeddings stored per person) and swap `recognitionService` below.
 * No UI code needs to change.
 */
import { people, type Person } from "@/features/data/demo-data";

export interface RecognitionResult {
  status: "recognized" | "unknown";
  person?: Person;
  /** Internal only — never surfaced to the person using the app. */
  debugScore?: number;
}

export interface RecognitionService {
  readonly mode: "prototype-mock" | "production";
  recognizeFromFrame(hint?: { personId?: string | undefined }): Promise<RecognitionResult>;
}

class MockRecognitionService implements RecognitionService {
  readonly mode = "prototype-mock" as const;
  private cursor = 0;

  async recognizeFromFrame(hint?: { personId?: string | undefined }): Promise<RecognitionResult> {
    await new Promise((r) => setTimeout(r, 1600));
    const enrolled = people.filter((p) => p.hasRecognitionProfile);
    const person = hint?.personId
      ? enrolled.find((p) => p.id === hint.personId)
      : enrolled[this.cursor++ % enrolled.length];
    if (!person) return { status: "unknown" };
    return { status: "recognized", person, debugScore: 0.97 };
  }
}

export const recognitionService: RecognitionService = new MockRecognitionService();
