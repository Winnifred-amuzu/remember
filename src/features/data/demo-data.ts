/**
 * DEMO DATA — seeded, fictional. Clearly labelled so it can be swapped for a
 * real data layer (Postgres + pgvector) without touching UI code.
 * Every record carries `source: "demo-seed"`.
 */
import winnifredPhoto from "@/assets/person-winnifred.jpg";
import esiPhoto from "@/assets/person-esi.jpg";
import kofiPhoto from "@/assets/person-kofi.jpg";
import christmasPhoto from "@/assets/memory-christmas.jpg";
import weddingPhoto from "@/assets/memory-wedding.jpg";
import birthdayPhoto from "@/assets/memory-birthday.jpg";

export type Source = "demo-seed" | "caregiver" | "family";

export interface Patient {
  id: string;
  name: string;
  preferredName: string;
  homeLocationId: string;
  source: Source;
}

export interface Person {
  id: string;
  name: string;
  relationship: string;
  photo: string;
  knownFor: string;
  bio: string;
  hasRecognitionProfile: boolean;
  source: Source;
}

export interface PlaceRecord {
  id: string;
  name: string;
  area: string;
  lat: number;
  lng: number;
  safeZoneRadiusM: number;
  monitoring: boolean;
  source: Source;
}

export interface Memory {
  id: string;
  title: string;
  date: string; // ISO
  displayDate: string;
  description: string;
  narration: string;
  peopleIds: string[];
  locationId: string;
  tags: string[];
  photo: string;
  hasVoiceRecording: boolean;
  verified: boolean;
  createdBy: string;
  source: Source;
}

export interface ActivityItem {
  id: string;
  label: string;
  detail: string;
  minutesAgo: number;
  kind: "recognition" | "memory" | "location" | "voice" | "device";
}

export const patient: Patient = {
  id: "pat_1",
  name: "Ama Mensah",
  preferredName: "Grandma",
  homeLocationId: "loc_home",
  source: "demo-seed",
};

export const people: Person[] = [
  {
    id: "per_win",
    name: "Winnifred",
    relationship: "Your granddaughter",
    photo: winnifredPhoto,
    knownFor: "Jewelry making",
    bio: "Winnifred visits most weekends and makes beaded jewelry. She calls you every Sunday evening.",
    hasRecognitionProfile: true,
    source: "demo-seed",
  },
  {
    id: "per_esi",
    name: "Esi",
    relationship: "Your daughter",
    photo: esiPhoto,
    knownFor: "Sunday cooking",
    bio: "Esi is Winnifred's mother. She lives nearby and cooks with you on Sundays.",
    hasRecognitionProfile: true,
    source: "demo-seed",
  },
  {
    id: "per_kofi",
    name: "Kofi",
    relationship: "Your nephew",
    photo: kofiPhoto,
    knownFor: "Football and driving the family to church",
    bio: "Kofi drives the family to church and helps with errands around the house.",
    hasRecognitionProfile: true,
    source: "demo-seed",
  },
];

export const places: PlaceRecord[] = [
  {
    id: "loc_home",
    name: "Home",
    area: "Ho, Ghana",
    lat: 6.6008,
    lng: 0.4713,
    safeZoneRadiusM: 200,
    monitoring: true,
    source: "demo-seed",
  },
  {
    id: "loc_daughter",
    name: "Esi's house",
    area: "Ho, Ghana",
    lat: 6.6091,
    lng: 0.4802,
    safeZoneRadiusM: 300,
    monitoring: true,
    source: "demo-seed",
  },
  {
    id: "loc_care",
    name: "Care centre",
    area: "Ho, Ghana",
    lat: 6.5936,
    lng: 0.4655,
    safeZoneRadiusM: 250,
    monitoring: true,
    source: "demo-seed",
  },
];

export const memories: Memory[] = [
  {
    id: "mem_xmas25",
    title: "Christmas with family",
    date: "2025-12-25",
    displayDate: "December 2025",
    description: "A family Christmas gathering with everyone around one table.",
    narration:
      "Last Christmas the whole family came home to Ho. Winnifred sat beside you and you shared the meal together.",
    peopleIds: ["per_win", "per_esi", "per_kofi"],
    locationId: "loc_home",
    tags: ["christmas", "family", "holiday"],
    photo: christmasPhoto,
    hasVoiceRecording: true,
    verified: true,
    createdBy: "Esi",
    source: "demo-seed",
  },
  {
    id: "mem_wedding25",
    title: "Esi's wedding day",
    date: "2025-06-14",
    displayDate: "June 2025",
    description: "Your daughter's wedding celebration, outdoors in kente.",
    narration:
      "You watched your daughter Esi marry on a bright afternoon. You wore the kente cloth she chose for you.",
    peopleIds: ["per_esi", "per_win"],
    locationId: "loc_daughter",
    tags: ["wedding", "celebration", "kente"],
    photo: weddingPhoto,
    hasVoiceRecording: false,
    verified: true,
    createdBy: "Winnifred",
    source: "demo-seed",
  },
  {
    id: "mem_bday26",
    title: "Your birthday at home",
    date: "2026-03-02",
    displayDate: "March 2026",
    description: "Birthday cake and candles in the sitting room.",
    narration:
      "In March the family filled the sitting room with candles and cake for your birthday. Kofi brought the cake.",
    peopleIds: ["per_kofi", "per_esi"],
    locationId: "loc_home",
    tags: ["birthday", "cake", "family"],
    photo: birthdayPhoto,
    hasVoiceRecording: true,
    verified: true,
    createdBy: "Kofi",
    source: "demo-seed",
  },
  {
    id: "mem_reunion26",
    title: "Family reunion",
    date: "2026-08-09",
    displayDate: "August 2026",
    description: "Cousins and grandchildren gathered at Esi's house.",
    narration:
      "In August everyone gathered at Esi's house. Winnifred brought jewelry she made for each grandchild.",
    peopleIds: ["per_win", "per_esi", "per_kofi"],
    locationId: "loc_daughter",
    tags: ["reunion", "family", "jewelry"],
    photo: weddingPhoto,
    hasVoiceRecording: false,
    verified: true,
    createdBy: "Esi",
    source: "demo-seed",
  },
  {
    id: "mem_church24",
    title: "Harvest at church",
    date: "2024-11-17",
    displayDate: "November 2024",
    description: "The harvest celebration, with singing after the service.",
    narration:
      "Kofi drove you to the harvest service in Ho. You sang with the women's group afterwards.",
    peopleIds: ["per_kofi"],
    locationId: "loc_care",
    tags: ["church", "harvest", "singing"],
    photo: christmasPhoto,
    hasVoiceRecording: false,
    verified: false,
    createdBy: "Kofi",
    source: "demo-seed",
  },
];

export const recentActivity: ActivityItem[] = [
  { id: "act_1", label: "Winnifred recognized", detail: "Home, Ho", minutesAgo: 5, kind: "recognition" },
  { id: "act_2", label: "Location updated", detail: "Inside Home safe zone", minutesAgo: 10, kind: "location" },
  { id: "act_3", label: "Voice question asked", detail: "\"Tell me about her\"", minutesAgo: 14, kind: "voice" },
  { id: "act_4", label: "Memory added", detail: "Family reunion — by Esi", minutesAgo: 20, kind: "memory" },
  { id: "act_5", label: "Watch synced", detail: "Battery 68%", minutesAgo: 32, kind: "device" },
];

export const getPerson = (id: string) => people.find((p) => p.id === id);
export const getPlace = (id: string) => places.find((p) => p.id === id);
export const memoriesWithPerson = (personId: string) =>
  memories.filter((m) => m.peopleIds.includes(personId));
export const memoriesAtPlace = (placeId: string) =>
  memories.filter((m) => m.locationId === placeId);
