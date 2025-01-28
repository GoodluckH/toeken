"use client";
import { useContext } from "react";
import { AudioContext } from "../providers";
import { IconHelp, IconVolume, IconVolumeOff } from "@tabler/icons-react";

export const NavBar = () => {
  const { isMuted, setIsMuted, showHelp, setShowHelp } =
    useContext(AudioContext);
  return (
    <nav className="sticky bg-background top-0 flex justify-between p-4 w-full px-10 mt-2">
      <button onClick={() => setIsMuted(!isMuted)}>
        {isMuted ? <IconVolumeOff /> : <IconVolume />}
      </button>
      <h1 className="font-bold text-2xl">toeken the game</h1>

      <button
        onClick={() => setShowHelp(true)}
        disabled={showHelp}
        className={showHelp ? "opacity-0" : ""}
      >
        <IconHelp />
      </button>
    </nav>
  );
};
