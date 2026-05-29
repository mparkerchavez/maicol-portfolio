import { readFileSync } from "node:fs";
import path from "node:path";
import type { IdleObservationContent } from "@/lib/llamita-behavior";

export function getIdleObservationContent(): IdleObservationContent {
  const filePath = path.join(process.cwd(), "content", "llamita-scripts", "idle-observations.md");
  const markdown = readFileSync(filePath, "utf8");
  const observations: IdleObservationContent = {};

  for (const match of markdown.matchAll(/(?:^|\n)## ([\w.-]+)\n\n([\s\S]*?)(?=\n## |\s*$)/g)) {
    const key = match[1];
    const body = match[2]?.trim();

    if (key && body) {
      observations[key] = body;
    }
  }

  return observations;
}
