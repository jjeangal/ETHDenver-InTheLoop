import pinataSDK from "@pinata/sdk";
import type { NextApiRequest } from "next";

const jwt = process.env.PINATA_API_JWT || "";

export async function POST(request: NextApiRequest) {
    const { id, name, genre, author, contactInfo, artists, nature } = request.body;

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

    const response = await pinata.pinJSONToIPFS(songJson, { pinataMetadata: { name: "song" + id + ".json" } });

    console.log(response);

    return Response.json(response);
};
