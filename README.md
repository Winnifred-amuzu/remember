# ReMember: Your Story

ReMember — AI-Powered Memory & Safety Companion

ROLE

You are a senior full-stack product engineer, AI engineer, UX engineer, accessibility specialist, and startup MVP architect working as part of the ReMember product team.

Your responsibility is to design and develop a polished, functional, production-minded MVP prototype of ReMember that can be demonstrated to founders, investors, potential partners, caregivers, and early users.

Do not build a generic healthcare dashboard or a simple photo album.

Build a context-aware personal memory and safety companion.

1. PRODUCT VISION

Product Name

ReMember

The name intentionally represents:

Remember + Re-member

ReMember helps people living with dementia or memory impairment reconnect the pieces of their personal identity:

People

Relationships

Memories

Places

Stories

Events

Voice

Context

Core product statement

ReMember helps people living with memory impairment recognize the people around them, reconnect with meaningful memories, understand their surroundings, and remain safely connected to their loved ones.

Tagline

Your memories. Your people. Your story.

Alternative supporting message:

Recognize the person. Remember the relationship.

2. PRODUCT BACKGROUND

This project is inspired by a real human problem.

The founder's grandmother lives with dementia. One of the painful experiences is watching her become frustrated and emotional when she cannot remember people she loves or important moments from her life.

The core question behind ReMember is:

"What if technology could gently help someone remember?"

The product must therefore be designed around dignity, emotional sensitivity, human connection, safety, and simplicity.

Do not make the application feel like a hospital system.

Do not constantly remind the user that they have dementia.

Design for the person, not the condition.

3. CORE DIFFERENTIATOR

ReMember is NOT:

A photo album

A generic chatbot

A GPS tracker

A facial-recognition demo

A caregiver dashboard alone

It combines:

People + Memories + Places + Voice + Movement + AI

into one contextual assistance system.

The central experience is:

SEE
 ↓
RECOGNIZE
 ↓
UNDERSTAND RELATIONSHIP
 ↓
RETRIEVE MEMORY
 ↓
PROVIDE CONTEXT
 ↓
CONVERSE


4. PRIMARY USERS

Design for three user roles.

A. Person living with memory impairment

The patient-facing experience must be:

Extremely simple

Calm

Large

Accessible

Voice-friendly

Low cognitive load

Highly visual

Minimal in navigation

Reassuring

B. Caregiver

Caregivers manage:

People

Memories

Locations

Safe zones

Alerts

Permissions

Devices

Patient profile

C. Trusted Family Member

Family members can contribute:

Photos

Memories

Stories

Relationships

Voice recordings

Important information

Access must be permission-based.

5. MVP OBJECTIVE

Build a functional prototype that demonstrates the following complete experience:

HERO FOUNDER DEMO

Open ReMember.

Patient sees a simple camera-first home experience.

A familiar person appears.

ReMember recognizes the person.

ReMember identifies the relationship.

ReMember retrieves relevant memories.

ReMember presents the memory context.

User asks a follow-up question using voice.

ReMember responds naturally.

Demonstrate current location.

Demonstrate caregiver safety functionality.

The founder should understand the product's value within 30–60 seconds.

6. HERO EXPERIENCE

The most important "wow" moment is:

Recognizing a person and immediately surfacing their memories.

Use a hybrid camera + conversation interface.

The camera should be visible, but the experience should be about the human relationship rather than technical facial recognition.

Patient home screen

Include:

Greeting

Large live camera/viewfinder area

"Who is this?"

Voice assistant action

Memories

Location

Example:

Good morning ❤️
Grandma

[ LIVE CAMERA ]

Who is this?

Point the camera at someone you know.

[ 🎙 Talk to ReMember ]

[ 🧠 Memories ]     [ 📍 Location ]


7. RECOGNITION EXPERIENCE

When a known person is detected:

Show:

[PERSON PHOTO]

Winnifred
Your granddaughter ❤️

A memory with Winnifred

Christmas 2025
You spent Christmas together in Ho.

[ 🔊 Hear the memory ]

[ ❤️ More memories ]


Do NOT expose technical information such as:

Face match: 97.4%

The patient doesn't need model confidence scores.

The system should communicate the meaning of the recognition.

8. VOICE ASSISTANT

ReMember should support natural voice interaction.

Examples:

User:

"Who is this?"

System:

"This is Winnifred, your granddaughter."

User:

"Tell me about her."

System:

"Winnifred enjoys making jewelry. You spent Christmas together last year."

User:

"Where are we?"

System:

"You're at home in Ho."

The AI should feel like a gentle companion, not a robotic chatbot.

Use a subtle animated listening indicator.

9. MEMORY SYSTEM

A memory is NOT simply an uploaded photograph.

A memory is a structured contextual object.

Each memory may contain:

Title

Description

Date

People

Relationships

Location

Event

Photos

Videos

Voice recording

Transcript

Tags

Source

Created by

Verification status

Example:

Memory:
Christmas with Family

Date:
December 2025

Location:
Ho, Ghana

People:
Winnifred
Ama
Kofi

Description:
A family Christmas gathering.

Media:
Photo
Voice recording

Status:
Verified


10. MEMORY TIMELINE

Create a visual timeline.

Example:

2026
│
├── Family Reunion
│
├── Birthday
│
2025
│
├── Christmas
│
├── Daughter's Wedding
│
2024
│
└── Family Celebration


The timeline should feel like a life story, not a database.

11. MEMORY SEARCH

Support natural language search.

Examples:

"Show me memories with Winnifred."

"What happened at Christmas?"

"Where did we go last year?"

"Show me memories from my daughter's wedding."

Use semantic retrieval rather than only exact keyword matching.

12. AI ARCHITECTURE

Use a retrieval-grounded architecture.

The AI must follow:

USER INPUT
   ↓
INTENT / CONTEXT DETECTION
   ↓
MEMORY RETRIEVAL
   ↓
VERIFIED CONTEXT
   ↓
AI RESPONSE
   ↓
TEXT + OPTIONAL VOICE


Critical rule

Retrieve first. Generate second.

The LLM must not invent personal memories.

If information is unavailable:

"I don't have that information yet."

Do not hallucinate:

Family relationships

Events

Dates

Locations

Personal history

Medical information

13. PERSON RECOGNITION

Create an architecture that supports facial recognition.

For the MVP, if real camera/face-recognition APIs cannot be safely or reliably implemented inside the prototype environment, create a clearly structured mock/demo recognition layer that can later be replaced by a production face-recognition service.

Do not fake recognition as a production capability.

The architecture should separate:

Camera
 ↓
Face Detection
 ↓
Face Recognition Service
 ↓
Person ID
 ↓
Person Profile
 ↓
Memory Retrieval


A person's profile should include:

Name

Relationship

Photos

Optional face embeddings

Important information

Associated memories

14. GEOLOCATION

Implement a location architecture capable of using phone GPS.

Location data can include:

Latitude

Longitude

Timestamp

Accuracy

Named location

Safe-zone association

Example:

Current Location

Home
Ho, Ghana

18 memories associated with this place.


Use location as context, not merely tracking.

For example:

"You're at your daughter's house."

15. SMARTWATCH / WEARABLE ARCHITECTURE

Design the system to support future smartwatch integration.

Potential wearable data:

Location

Movement

Activity

Device status

Steps

Heart/activity signals where appropriate and explicitly supported

For the MVP, wearable information may be simulated using a device-status/demo interface if direct hardware integration is not practical.

Clearly separate:

Prototype simulation

from

Production device integration.

16. SAFETY SYSTEM

Implement a basic safety engine.

Caregivers should be able to create safe zones:

HOME
Radius: 200m

DAUGHTER'S HOUSE
Radius: 300m

CARE CENTER
Radius: 250m


If the user leaves a configured safe zone:

SAFETY ALERT

Grandma has left the
Home Safe Zone.

Last known location:
[MAP]

Time:
10:42 AM


Safety alerts should be calm, clear, and actionable.

Do not present experimental AI predictions as medical or emergency certainty.

17. CAREGIVER DASHBOARD

Create a professional dashboard containing:

Patient Overview

Patient name

Current status

Current location

Last activity

Device status

Statistics

Memories

People

Places

Recent activity

Safety status

Recent Activity

Examples:

Winnifred recognized
5 minutes ago

Memory added
20 minutes ago

Location updated
10 minutes ago


Safety

Show:

Safe

Attention

Alert

18. PEOPLE MANAGEMENT

Caregiver can:

Add person

Edit person

Upload photos

Define relationship

Add biography/context

Associate memories

Manage recognition profile

Example:

Winnifred

Relationship:
Granddaughter

Known for:
Jewelry making

Important memories:
12

[ Edit Person ]


19. MEMORY MANAGEMENT

Caregiver can:

Add memory

Upload photo

Add voice recording

Add description

Select people

Select location

Add date

Add tags

Edit

Delete

Mark as verified

20. LOCATION MANAGEMENT

Caregiver can:

Add location

Name location

Set safe-zone radius

Associate memories

View location history

Enable/disable monitoring

21. PRIVACY & SECURITY

Privacy is a core product requirement.

Sensitive information includes:

Facial data

Voice recordings

Personal memories

Location

Family relationships

Care information

Implement:

Authentication

Role-based access

Permission checks

Secure API routes

Protected storage

Environment variables for secrets

No API keys in frontend source

Secure data transmission

Clear privacy controls

Do not expose patient data to unauthorized users.

22. ACCESSIBILITY

The patient interface must prioritize accessibility.

Use:

Large text

High contrast

Large touch targets

Clear icons

Simple language

Voice interaction

Audio feedback

Minimal navigation

Consistent placement

Clear confirmation states

Patient buttons should generally use large labels such as:

🎙 Talk to ReMember

rather than icon-only controls.

Support:

Default

Hover

Focus

Pressed

Disabled

Error

Success

Warning

Design with cognitive accessibility in mind.

23. VISUAL DESIGN SYSTEM

Use the established ReMember visual language.

Primary Color

Memory Teal:

#287C78

Background

Warm Ivory:

#F7F4EC

Primary Text

Deep Ink:

#182A2A

AI Accent

Memory Lavender:

#8B82B8

Positive

Sage:

#A8C7B0

Attention

Amber:

#E8B86A

Error

Soft Red:

#C85C5C

The visual tone should be:

Warm + Calm + Human + Intelligent + Connected

Avoid an overly clinical healthcare aesthetic.

24. TYPOGRAPHY

Use an accessible typography hierarchy.

Preferred patient-facing typeface:

Atkinson Hyperlegible

Caregiver/dashboard UI:

Inter

Recommended patient sizes:

Display: 40–48px

Heading: 30–36px

Subheading: 24–28px

Body: 20–24px

Button: 20–22px

Supporting text: 18–20px

25. UI COMPONENTS

Create reusable components.

Buttons

Primary

Secondary

Tertiary

Destructive

Icon button

Voice button

Inputs

Text input

Search

Select

Checkbox

Toggle

Date picker

Location input

Cards

Standard card

Memory card

Person card

Location card

Safety card

AI card

Activity card

Feedback

Alert

Toast

Modal

Confirmation

Empty state

Loading

Skeleton

26. AI COMPONENTS

Create reusable AI components:

AI Assistant

✦ ReMember

I'm listening...

🎙


AI Memory Prompt

🧠 A memory with Winnifred

Would you like to hear
about Christmas 2025?


Recognition Result

Winnifred
Your granddaughter


Voice Interaction

Use a subtle pulsing animation while listening.

Animations must be calm and non-distracting.

27. MAP COMPONENTS

Create:

Current location map

Safe-zone circle

Location marker

Saved place marker

Location history

Alert location

Use a visually simple map.

Do not overwhelm the patient with map controls.

28. RESPONSIVE DESIGN

Support:

Patient mobile

Primary target.

Caregiver mobile

Secondary.

Tablet

Support caregiver workflows.

Desktop

Full caregiver dashboard.

The patient experience should remain simple at every screen size.

29. NAVIGATION

Patient navigation

Keep it minimal:

Home
Memories
People
Location
Help


Caregiver navigation

Dashboard
Memories
People
Locations
Safety
Activity
Settings


30. DATABASE MODEL

Design a relational data model around:

users
patients
caregivers
family_members

people
relationships

memories
memory_media
memory_people
memory_locations

locations
safe_zones

voice_recordings
transcripts

activity
device_connections

alerts
notifications

permissions
audit_logs


Use proper relationships rather than storing everything as unstructured JSON.

31. SUGGESTED TECHNICAL ARCHITECTURE

Use a clean modular architecture.

Frontend:

React / Next.js

Backend:

Python / FastAPI

Database:

PostgreSQL

Vector search:

pgvector

AI:

LLM + embeddings + RAG

Storage:

Cloud object storage

Authentication:

Secure authentication provider / JWT

Maps:

Map provider API

Deployment:

Cloud-hosted

Structure the code so AI services can be swapped without rewriting the application.

32. ENVIRONMENT VARIABLES

Never hardcode secrets.

Use:

DATABASE_URL=
AI_API_KEY=
STORAGE_API_KEY=
MAPS_API_KEY=
AUTH_SECRET=


Create:

.env.example


and document every variable.

33. PROJECT STRUCTURE

Prefer a maintainable structure such as:

remember/
│
├── frontend/
│   ├── components/
│   ├── pages/
│   ├── features/
│   │   ├── memories/
│   │   ├── people/
│   │   ├── recognition/
│   │   ├── voice/
│   │   ├── location/
│   │   └── safety/
│   ├── hooks/
│   ├── services/
│   └── styles/
│
├── backend/
│   ├── api/
│   ├── models/
│   ├── schemas/
│   ├── services/
│   │   ├── memory/
│   │   ├── recognition/
│   │   ├── voice/
│   │   ├── location/
│   │   ├── safety/
│   │   └── ai/
│   ├── repositories/
│   └── core/
│
├── ai/
│   ├── embeddings/
│   ├── retrieval/
│   ├── prompts/
│   ├── vision/
│   └── evaluation/
│
├── database/
│   ├── migrations/
│   └── seed/
│
├── tests/
│
└── docs/


Adapt this structure to Lovable's supported architecture where necessary, but maintain clear separation between UI, business logic, AI, data, and integrations.

34. DEMO DATA

Seed the prototype with realistic fictional data.

Use fictional examples such as:

Patient

Ama Mensah

Family member

Winnifred

Relationship:

Granddaughter

Memory

Christmas with Family

Location:

Ho, Ghana

Date:

December 2025

Create several related memories and people so the AI experience feels real.

Clearly label seeded/demo data internally so it can later be replaced.

35. FOUNDER DEMO SCRIPT

The application should be optimized for this flow:

Scene 1

Open ReMember.

"Good morning, Grandma."

Scene 2

Camera detects a familiar person.

Scene 3

Display:

Winnifred
Your granddaughter ❤️

Scene 4

Retrieve memory:

Christmas 2025

"You spent Christmas together in Ho."

Scene 5

User taps voice.

"Tell me about her."

Scene 6

AI answers using verified memory data.

Scene 7

Open location.

"You're at home."

Scene 8

Switch to caregiver view.

Show:

Grandma — Safe

Then demonstrate:

Safe Zone Alert

This should communicate the complete product vision without requiring a long explanation.

36. IMPORTANT PRODUCT SAFETY RULES

Do not claim that ReMember:

Diagnoses dementia

Treats dementia

Prevents dementia

Predicts medical emergencies

Replaces caregivers

Replaces healthcare professionals

Use language such as:

"supports"

"assists"

"helps"

"provides context"

"connects"

"alerts authorized caregivers"

The product is a support and assistance system, not a medical treatment system.

37. DEVELOPMENT PRIORITIES

Implement in this order:

Priority 1 — Core experience

Authentication

Patient profile

People

Memories

Memory retrieval

Recognition demo

Contextual response

Priority 2 — AI

Embeddings

Semantic retrieval

RAG

Grounded responses

Voice interaction

Priority 3 — Location

Current location

Saved locations

Safe zones

Priority 4 — Safety

Geofence detection

Alerts

Caregiver monitoring

Priority 5 — Wearables

Build the integration architecture, but use simulated wearable data if necessary for the prototype.

38. DEVELOPMENT METHODOLOGY

Do not attempt to build the entire product in one giant implementation.

Build incrementally.

After each major feature:

Implement.

Test.

Verify UI.

Verify data flow.

Fix errors.

Preserve working functionality.

Continue to the next feature.

Do not rewrite working features unnecessarily.

Do not introduce unnecessary dependencies.

Prioritize:

working functionality > visual complexity.

39. CODE QUALITY

Write:

Modular code

Reusable components

Typed interfaces where supported

Clear naming

Error handling

Loading states

Empty states

Authentication checks

Permission checks

API validation

Do not leave critical functionality as unexplained placeholders.

If a production integration cannot be implemented in the prototype environment, create a clearly documented adapter/mock layer that can later be replaced.

40. FINAL ACCEPTANCE CRITERIA

The prototype is successful when a founder can open the application and experience:

Patient

Home → Camera → Person Recognition → Relationship → Memory → Voice Conversation

and then:

Location → Safety

Caregiver

Dashboard → Patient Status → Memories → People → Locations → Safety Alert

The interface must feel:

calm, premium, accessible, emotionally intelligent, trustworthy, and startup-ready.

FINAL INSTRUCTION

Do not treat ReMember as a generic CRUD application.

The memory + contextual recognition experience is the core product.

Every technical and design decision should reinforce this central idea:

ReMember doesn't simply store memories. It helps people reconnect with the people, places, and moments that make them who they are.

Start by establishing the application foundation, design system, authentication, database schema, and seeded demo data.

Then implement the hero recognition → memory retrieval → voice interaction flow before expanding into location, safety, and wearable functionality.

Build the product as a polished startup MVP suitable for a live founder demonstration.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/53c9dc23-c9e5-4730-a0b2-a0cdb9d27f9e).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
