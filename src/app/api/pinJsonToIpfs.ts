import pinataSDK from "@pinata/sdk";
import type { NextApiRequest, NextApiResponse } from "next";

const jwt = process.env.PINATA_API_JWT || "";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id, name, genre, author, contactInfo, artists, nature } = req.body;

  const pinata = new pinataSDK({ pinataJWTKey: jwt });

  const songJson = {
    id: id,
    name: name,
    genre: genre,
    author: author,
    contactInfo: contactInfo,
    artists: artists,
    nature: nature,
  };

  const result = await pinata.pinJSONToIPFS(songJson, { pinataMetadata: { name: "song" + id + ".json" } });

  res.status(200).json(result);
}
