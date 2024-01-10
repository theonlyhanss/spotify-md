import type { NextApiResponse } from "next";
import https from "https";

export function setSvgHeader(res: NextApiResponse) {
  res.setHeader("Content-Type", "image/svg+xml");
  res.setHeader("Cache-Control", "s-maxage=1, stale-while-revalidate");
}

function getImageData(url: string): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    https.get(url, (response) => {
      if (response.statusCode !== 200) {
        reject(
          new Error(
            `Failed to download image. Status code: ${response.statusCode}`
          )
        );
        return;
      }

      const chunks: any = [];

      response.on("data", (chunk) => {
        chunks.push(chunk);
      });

      response.on("end", () => {
        const buffer = Buffer.concat(chunks);
        const base64 = buffer.toString("base64");
        resolve(`data:${response.headers["content-type"]};base64,${base64}`);
      });

      response.on("error", (error) => {
        reject(error);
      });
    });
  });
}
export interface IConvertedTrackObject {
  image: string;
  artist: string;
  name: string;
  href: string;
}

export async function convertTrackToMinimumData(
  track: SpotifyApi.TrackObjectFull | SpotifyApi.EpisodeObject
): Promise<IConvertedTrackObject> {
  const albumArtUrl =
    "album" in track && "images" in track.album && track.album.images.length
      ? track.album.images[0].url
      : "https://i.imgur.com/qmnOomj.png";

  const image = (await getImageData(albumArtUrl)) ?? "";

  const artist =
    "artists" in track && track.artists.length
      ? track.artists.map((artist) => artist.name).join(", ")
      : "Unknown Artist";

  const name = "name" in track ? track.name : "Unknown Track";

  const href =
    "external_urls" in track && "spotify" in track.external_urls
      ? track.external_urls.spotify
      : "#";

  return {
    image,
    artist,
    name,
    href,
  };
}
