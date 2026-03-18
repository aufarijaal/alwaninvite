import satori from "satori";
import { Resvg } from "@resvg/resvg-js";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);

  const bride = (query.bride as string) || "Fulanah";
  const groom = (query.groom as string) || "Fulan";
  const guest = (query.to as string) || "Guest";

  // Load font
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
          padding: "40px",
        },
        children: [
          // Title
          {
            type: "div",
            props: {
              children: "Wedding Invitation",
              style: {
                fontSize: 36,
                marginBottom: 20,
              },
            },
          },

          // Names
          {
            type: "div",
            props: {
              children: `${bride} & ${groom}`,
              style: {
                fontSize: 64,
                fontWeight: "bold",
                marginBottom: 30,
              },
            },
          },

          // Guest
          {
            type: "div",
            props: {
              children: `Dear ${guest}`,
              style: {
                fontSize: 28,
                opacity: 0.8,
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
  setHeader(event, "Cache-Control", "public, max-age=86400");

  return png;
});
