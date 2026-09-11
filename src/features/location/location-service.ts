/**
 * Location + safety engine.
 * Uses real device GPS when permitted; otherwise falls back to the seeded
 * demo position so the prototype always has context.
 */
import { places, memoriesAtPlace, type PlaceRecord } from "@/features/data/demo-data";

export interface Position {
  lat: number;
  lng: number;
  accuracyM: number;
  timestamp: number;
  source: "device-gps" | "demo-seed";
}

export type SafetyStatus = "safe" | "attention" | "alert";

export interface SafetyState {
  status: SafetyStatus;
  place?: PlaceRecord;
  distanceM: number;
  message: string;
}

export const DEMO_POSITION: Position = {
  lat: places[0].lat,
  lng: places[0].lng,
  accuracyM: 12,
  timestamp: Date.now(),
  source: "demo-seed",
};

/** Simulated wander used by the caregiver demo to trigger a safe-zone alert. */
export const DEMO_OUTSIDE_POSITION: Position = {
  lat: places[0].lat + 0.0085,
  lng: places[0].lng - 0.004,
  accuracyM: 18,
  timestamp: Date.now(),
  source: "demo-seed",
};

export function distanceMeters(a: { lat: number; lng: number }, b: { lat: number; lng: number }) {
  const R = 6371000;
  const dLat = ((b.lat - a.lat) * Math.PI) / 180;
  const dLng = ((b.lng - a.lng) * Math.PI) / 180;
  const lat1 = (a.lat * Math.PI) / 180;
  const lat2 = (b.lat * Math.PI) / 180;
  const h =
    Math.sin(dLat / 2) ** 2 + Math.sin(dLng / 2) ** 2 * Math.cos(lat1) * Math.cos(lat2);
  return Math.round(2 * R * Math.asin(Math.sqrt(h)));
}

export function nearestPlace(pos: Position) {
  return places
    .map((p) => ({ place: p, distance: distanceMeters(pos, p) }))
    .sort((a, b) => a.distance - b.distance)[0];
}

export function evaluateSafety(pos: Position): SafetyState {
  const { place, distance } = nearestPlace(pos);
  if (distance <= place.safeZoneRadiusM) {
    return {
      status: "safe",
      place,
      distanceM: distance,
      message: `Inside the ${place.name} safe zone.`,
    };
  }
  if (distance <= place.safeZoneRadiusM * 2) {
    return {
      status: "attention",
      place,
      distanceM: distance,
      message: `Near the edge of the ${place.name} safe zone.`,
    };
  }
  return {
    status: "alert",
    place,
    distanceM: distance,
    message: `Has left the ${place.name} safe zone.`,
  };
}

export function placeContextSentence(pos: Position) {
  const { place, distance } = nearestPlace(pos);
  const count = memoriesAtPlace(place.id).length;
  if (distance <= place.safeZoneRadiusM) {
    return `You're at ${place.name.toLowerCase() === "home" ? "home" : place.name} in ${place.area}. ${count} memories are connected to this place.`;
  }
  return `You're about ${distance} metres from ${place.name}, in ${place.area}.`;
}

export async function readDevicePosition(): Promise<Position> {
  if (typeof navigator === "undefined" || !navigator.geolocation) return DEMO_POSITION;
  return new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition(
      (p) =>
        resolve({
          lat: p.coords.latitude,
          lng: p.coords.longitude,
          accuracyM: Math.round(p.coords.accuracy),
          timestamp: p.timestamp,
          source: "device-gps",
        }),
      () => resolve(DEMO_POSITION),
      { enableHighAccuracy: true, timeout: 6000 },
    );
  });
}

/** PROTOTYPE: simulated wearable feed. Replace with a real device SDK. */
export const wearableStatus = {
  mode: "prototype-simulation" as const,
  deviceName: "ReMember Watch (simulated)",
  battery: 68,
  connected: true,
  stepsToday: 1420,
  lastSyncMinutesAgo: 3,
};
