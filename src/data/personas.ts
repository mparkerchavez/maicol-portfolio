import type { IntentTrack, SelectedPersona } from "@/stores/signal-store";

// The visible persona nav (ADR 0009). Hero copy is verbatim from Spec 03 Section 4c.
// The track field is the label-to-track mapping from Spec 03 Section 4e; the visible
// "AI Product Leaders" label intentionally maps to the internal "ai-strategist" key.

export const personaStorageKey = "maicol-selected-persona";

export type PersonaDefinition = {
  key: SelectedPersona;
  label: string;
  track: IntentTrack;
  display: string;
  subhead: string;
};

export const personas: PersonaDefinition[] = [
  {
    key: "for-anyone",
    label: "For anyone",
    track: "for-anyone",
    display: "I work in the gap between AI capability and human adoption.",
    subhead: "Discovery, validation, prototyping, alignment, all in one person.",
  },
  {
    key: "recruiters",
    label: "Recruiters",
    track: "recruiters",
    display: "Open to Senior PM, Principal PM, and AI Product Lead roles, in Los Angeles.",
    subhead: "The resume is in the header and the footer. Start there. Email and LinkedIn are one click away.",
  },
  {
    key: "ai-product-leaders",
    label: "AI Product Leaders",
    track: "ai-strategist",
    display: "I run the front half of the AI product loop, the part most teams skip.",
    subhead: "Discovery, validation, the de-scope call. That discipline took a GenAI tool from a 12-person pilot to 300+ users.",
  },
  {
    key: "product-managers",
    label: "Product Managers",
    track: "product-managers",
    display: "I have done the product management function for twenty-four years, under three different titles.",
    subhead: "Not the title, the function. Discovery, validation, prioritization, alignment. The receipts are on this site.",
  },
];

export function getPersona(key: SelectedPersona): PersonaDefinition {
  return personas.find((persona) => persona.key === key) ?? personas[0]!;
}

export function isSelectedPersona(value: string): value is SelectedPersona {
  return personas.some((persona) => persona.key === value);
}
