import { Dispatch, SetStateAction } from "react";
import { addPitchBendsToNoteEvents, noteFramesToTime, outputToNotesPoly } from "./toMidi";
import { BasicPitch } from "@spotify/basic-pitch";
import * as tf from "@tensorflow/tfjs";
import { compareSongs } from "../services/compareNotes";

export async function songTrad(
  songArray: ArrayBuffer,
  setProgress: Dispatch<SetStateAction<number>>,
  setCompared: Dispatch<SetStateAction<{ cp: boolean; text: string }>>,
): Promise<{ follow: boolean; id: bigint; rate: number }> {
  const audioCtx = new AudioContext({ sampleRate: 22050 });
  let audioBuffer = undefined;

  console.log("Loading audio...");
  console.log(songArray);
  const songArrayCopy = songArray.slice(0);

  audioCtx.decodeAudioData(songArrayCopy, async (_audioBuffer: AudioBuffer) => {
    audioBuffer = _audioBuffer;
    audioBuffer = audioBuffer.getChannelData(0);
  });

  while (audioBuffer === undefined) {
    await new Promise(r => setTimeout(r, 1));
  }

  const frames: number[][] = [];
  const onsets: number[][] = [];
  const contours: number[][] = [];

  //will fix this any type check later
  const model = tf.loadGraphModel(`./model/model.json`) as Promise<any>;
  const basicPitch = new BasicPitch(model);

  await basicPitch.evaluateModel(
    audioBuffer as unknown as AudioBuffer,
    (f: number[][], o: number[][], c: number[][]) => {
      frames.push(...f);
      onsets.push(...o);
      contours.push(...c);
    },
    (p: number) => {
      console.log(p);
      setProgress(p);
    },
  );

  // const notesPoly = noteFramesToTime(
  //   addPitchBendsToNoteEvents(contours, outputToNotesPoly(frames, onsets, 0.25, 0.25, 5)),
  // );

  //frames, onsets, onSetTreshold, frameTreshold, minNoteLength, inferOnsets, maxFreq, minFreq, melodiaTrick
  //melodiaTrick -> remove semitones near a peak
  const notesPolyNoMelodia = noteFramesToTime(
    addPitchBendsToNoteEvents(contours, outputToNotesPoly(frames, onsets, 0.5, 0.3, 5, true, null, null, false)),
  );

  const result = await compareSongs(notesPolyNoMelodia);

  console.log(result);

  // @ts-ignore
  const matchingRate = result.MatchingRate ?? 1;
  let cont = false;
  let text = "";

  if (matchingRate >= 0.7) {
    console.log("Coal is on fire");
    text = "Song is too similar to what already exists!";
  } else if (matchingRate < 0.7 && matchingRate > 0.4) {
    console.log("Coal is hot");
    text = "Song needs to be reviewed";
  } else if (matchingRate <= 0.4 && matchingRate > 0.2) {
    console.log("Coal is warm");
    text = "Enfrigment detected but song can be uploaded";
    cont = true;
  } else {
    console.log("Coal is cold");
    text = "Light or no copyright detected";
    cont = true;
  }
  setCompared({ cp: true, text: text });
  // @ts-ignore
  return { follow: cont, id: result?.Id ?? 0n, rate: matchingRate };
}
