// Audits app-facing components so standard UI primitives stay behind src/components/ui adapters.
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const scanRoots = ["src/app", "src/components"];
const ignoredSegments = [`src${path.sep}components${path.sep}base`, `src${path.sep}components${path.sep}ui`];
const fileExtensions = new Set([".ts", ".tsx"]);

const checks = [
  {
    name: "direct UUI base import",
    pattern: /@\/components\/base\//,
    message: "Import project UI adapters from '@/components/ui' instead of UUI base files.",
  },
  {
    name: "raw button/input/textarea",
    pattern: /<(button|input|textarea)\b/,
    message: "Use AppButton, AppInput, or AppTextArea from '@/components/ui'.",
  },
  {
    name: "raw card shell class",
    pattern: /\b(hairline-card|interactive-card)\b/,
    message: "Use AppCard from '@/components/ui' instead of applying card shell classes directly.",
  },
];

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const absolute = path.join(directory, entry.name);
    const relative = path.relative(root, absolute);

    if (ignoredSegments.some((segment) => relative.startsWith(segment))) {
      continue;
    }

    if (entry.isDirectory()) {
      files.push(...(await walk(absolute)));
      continue;
    }

    if (fileExtensions.has(path.extname(entry.name))) {
      files.push(absolute);
    }
  }

  return files;
}

const violations = [];

for (const scanRoot of scanRoots) {
  const files = await walk(path.join(root, scanRoot));

  for (const file of files) {
    const source = await readFile(file, "utf8");
    const lines = source.split("\n");

    lines.forEach((line, index) => {
      checks.forEach((check) => {
        if (check.pattern.test(line)) {
          violations.push({
            check: check.name,
            file: path.relative(root, file),
            line: index + 1,
            message: check.message,
            source: line.trim(),
          });
        }
      });
    });
  }
}

if (violations.length > 0) {
  console.error("UUI primitive audit failed.\n");

  for (const violation of violations) {
    console.error(`${violation.file}:${violation.line} [${violation.check}] ${violation.message}`);
    console.error(`  ${violation.source}`);
  }

  process.exit(1);
}

console.log("UUI primitive audit passed.");

