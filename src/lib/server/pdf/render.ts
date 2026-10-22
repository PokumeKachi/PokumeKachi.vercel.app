// src/lib/server/pdf/render.ts
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

const A4 = [595.28, 841.89] as const;
const MARGIN = 48;

export async function renderCv(): Promise<Uint8Array> {
    const doc = await PDFDocument.create();
    const page = doc.addPage([...A4]);
    const bold = await doc.embedFont(StandardFonts.HelveticaBold);
    const body = await doc.embedFont(StandardFonts.Helvetica);
    const ink = rgb(0, 0, 0);

    let y = A4[1] - MARGIN;

    const text = (
        s: string,
        opts: { size?: number; font?: typeof body; gap?: number } = {},
    ) => {
        const size = opts.size ?? 10;
        page.drawText(s, {
            x: MARGIN,
            y,
            size,
            font: opts.font ?? body,
            color: ink,
        });
        y -= size + (opts.gap ?? 4);
    };

    text("Pokume Kachi", { size: 22, font: bold, gap: 2 });
    text("Student · Full-Stack Developer", { size: 11, gap: 2 });
    text(
        "github.com/PokumeKachi · pokumekachi.vercel.app · kachi@example.com",
        { size: 9, gap: 14 },
    );

    text("PROJECTS", { size: 12, font: bold, gap: 6 });
    text("Portfolio & Blog — SvelteKit, Pico CSS, Vercel", {
        size: 10,
        gap: 1,
    });
    text("  · Automated PDF generation via GitHub Actions + pnpm", {
        size: 9,
        gap: 10,
    });

    return doc.save();
}
