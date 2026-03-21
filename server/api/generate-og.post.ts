import satori from "satori";
import { Resvg } from "@resvg/resvg-js";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const bride = (body.bride as string) || "Fulanah";
  const groom = (body.groom as string) || "Fulan";

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
          background: "#fdf6f0",
          color: "#2c2c2c",
          fontFamily: "Playfair",
          textAlign: "center",
          padding: "48px",
        },
        children: [
          {
            type: "div",
            props: {
              children: "Wedding Invitation",
              style: {
                fontSize: 30,
                marginBottom: 24,
                opacity: 0.6,
                letterSpacing: "0.08em",
              },
            },
          },
          {
            type: "div",
            props: {
              children: bride,
              style: {
                fontSize: 60,
                fontWeight: "bold",
                marginBottom: 8,
              },
            },
          },
          {
            type: "div",
            props: {
              children: "&",
              style: {
                fontSize: 36,
                marginBottom: 8,
                opacity: 0.5,
              },
            },
          },
          {
            type: "div",
            props: {
              children: groom,
              style: {
                fontSize: 60,
                fontWeight: "bold",
              },
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
