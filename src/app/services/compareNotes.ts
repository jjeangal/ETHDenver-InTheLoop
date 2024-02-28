import { GoResponse } from "./interfaces";
import { NoteEventTime } from "@spotify/basic-pitch";
import axios from "axios";
import { generateFileData } from "../basicPitch/toMidi";

export async function compareSongs(notesPoly: NoteEventTime[]): Promise<GoResponse | null> {
  const midiFile = generateFileData(notesPoly);
  const blob = new Blob([midiFile as Buffer], { type: "audio/mid" });
  const data = new FormData();
  data.append("midiFile", blob, "song.mid");

  try {
    const res = await axios.post("http://localhost:8080/compare", data);
    if (res.status == 200) {
      console.log(res.data);
      const result: GoResponse = {
        Id: res.data["id"],
        Author: res.data["author"],
        Title: res.data["title"],
        MatchingRate: res.data["matchingRate"],
      };
      return result;
    }
  } catch (error) {
    console.error("Coal API error: ", error);
    return null;
  }

  return null;
}
