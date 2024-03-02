// components/MidiPlayer.tsx
import { Button } from "@chakra-ui/react";
import React from "react";
import * as Tone from "tone";

const MidiPlayer: React.FC<{ sequence: number[], index: number }> = ({ sequence, index }) => {
  const playSequence = () => {

    const synth = new Tone.Synth().toDestination();

    function getNoteFromMidiNumber(midiNote: number) {
      const noteNames = [
        "C",
        "C#",
        "D",
        "D#",
        "E",
        "F",
        "F#",
        "G",
        "G#",
        "A",
        "A#",
        "B",
      ];
      const noteIndex = midiNote % 12;
      const octave = Math.floor(midiNote / 12) - 1;
      return noteNames[noteIndex] + octave;
    }

    // Map your sequence of numbers to MIDI notes
    const mappedNotes = sequence.map((number) => getNoteFromMidiNumber(number));

    // Play the notes sequentially
    mappedNotes.forEach((note: string, index: number) => {
      synth.triggerAttackRelease(note, "8n", Tone.now() + index * 0.5);
    });
  };

  return <Button colorScheme="blue" onClick={playSequence}>Play Song #{index}</Button>;
};

export default MidiPlayer;
