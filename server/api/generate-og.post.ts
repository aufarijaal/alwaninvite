import satori from "satori";
import { Resvg } from "@resvg/resvg-js";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

type ThemeColors = {
  bg: string;
  text: string;
  textMuted: string;
  accent: string;
  divider: string;
};

const themeColorMap: Record<string, ThemeColors> = {
  blue: {
    bg: "#0f172a",
    text: "#ffffff",
    textMuted: "#93c5fd",
    accent: "#fbbf24",
    divider: "#1e40af",
  },
  green: {
    bg: "#022c22",
    text: "#ffffff",
    textMuted: "#6ee7b7",
    accent: "#fbbf24",
    divider: "#065f46",
  },
  brown: {
    bg: "#1c1917",
    text: "#fef3c7",
    textMuted: "#d97706",
    accent: "#fbbf24",
    divider: "#44270a",
  },
  slate: {
    bg: "#09090b",
    text: "#ffffff",
    textMuted: "#94a3b8",
    accent: "#94a3b8",
    divider: "#334155",
  },
  "islamic green": {
    bg: "#052e16",
    text: "#ffffff",
    textMuted: "#4ade80",
    accent: "#fbbf24",
    divider: "#166534",
  },
  "islamic-green": {
    bg: "#052e16",
    text: "#ffffff",
    textMuted: "#4ade80",
    accent: "#fbbf24",
    divider: "#166534",
  },
};

const defaultColors: ThemeColors = {
  bg: "#fdf6f0",
  text: "#2c2c2c",
  textMuted: "#6b4c3b",
  accent: "#7c3aed",
  divider: "#e8d5c4",
};

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const bride = (body.bride as string) || "Fulanah";
  const groom = (body.groom as string) || "Fulan";
  const themeName = ((body.theme as string) || "").toLowerCase().trim();

  const colors = themeColorMap[themeName] ?? defaultColors;

  const fontPath = join(process.cwd(), "public/fonts/PlayfairDisplay-Bold.ttf");
  const fontData = await readFile(fontPath);

  const svg = await satori(
    {
      type: "div",
      props: {
        style: {
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: colors.bg,
          color: colors.text,
          fontFamily: "Playfair",
          textAlign: "center",
          padding: "48px",
          gap: "0px",
        },
        children: [
          // Top ornament line
          {
            type: "div",
            props: {
              style: {
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: "12px",
                marginBottom: "28px",
              },
              children: [
                {
                  type: "div",
                  props: {
                    style: {
                      width: "60px",
                      height: "1px",
                      background: colors.accent,
                      opacity: 0.5,
                    },
                  },
                },
                {
                  type: "div",
                  props: {
                    style: {
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      background: colors.accent,
                    },
                  },
                },
                {
                  type: "div",
                  props: {
                    style: {
                      width: "60px",
                      height: "1px",
                      background: colors.accent,
                      opacity: 0.5,
                    },
                  },
                },
              ],
            },
          },
          // Subtitle
          {
            type: "div",
            props: {
              children: "Wedding Invitation",
              style: {
                fontSize: 18,
                color: colors.textMuted,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                marginBottom: "32px",
              },
            },
          },
          // Groom name
          {
            type: "div",
            props: {
              children: groom,
              style: {
                fontSize: 64,
                fontWeight: "bold",
                color: colors.text,
                lineHeight: 1.1,
                marginBottom: "4px",
              },
            },
          },
          // Ampersand
          {
            type: "div",
            props: {
              children: "&",
              style: {
                fontSize: 32,
                color: colors.accent,
                marginBottom: "4px",
                lineHeight: 1.4,
              },
            },
          },
          // Bride name
          {
            type: "div",
            props: {
              children: bride,
              style: {
                fontSize: 64,
                fontWeight: "bold",
                color: colors.text,
                lineHeight: 1.1,
                marginBottom: "32px",
              },
            },
          },
          // Bottom ornament line
          {
            type: "div",
            props: {
              style: {
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: "12px",
              },
              children: [
                {
                  type: "div",
                  props: {
                    style: {
                      width: "60px",
                      height: "1px",
                      background: colors.accent,
                      opacity: 0.5,
                    },
                  },
                },
                {
                  type: "div",
                  props: {
                    style: {
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      background: colors.accent,
                    },
                  },
                },
                {
                  type: "div",
                  props: {
                    style: {
                      width: "60px",
                      height: "1px",
                      background: colors.accent,
                      opacity: 0.5,
                    },
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      width: 500,
      height: 500,
      fonts: [
        {
          name: "Playfair",
          data: fontData,
          weight: 400,
          style: "normal",
        },
      ],
    },
  );

  const resvg = new Resvg(svg);
  const png = resvg.render().asPng();

  setHeader(event, "Content-Type", "image/png");
  setHeader(event, "Cache-Control", "no-store");

  return png;
});
