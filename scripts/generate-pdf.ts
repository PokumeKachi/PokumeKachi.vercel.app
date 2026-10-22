// scripts/generate-pdf.ts
import { writeFile, mkdir } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { renderCv } from '../src/lib/server/pdf/render';

const out = resolve('static/resume.pdf');
await mkdir(dirname(out), { recursive: true });
await writeFile(out, await renderCv());
console.log(`wrote ${out}`);
