"use client";

import dynamic from "next/dynamic";
import usePartySocket from "partysocket/react";
import { useContext, useState } from "react";
import { YouTubeAudioLoop } from "./components/Audio";
import { AudioContext } from "./providers";
import { Help } from "./components/Help";

const Demo = dynamic(() => import("./components/Demo"), {
  ssr: false,
});

export default function Home() {
  const [event, setEvent] = useState(null);
  const [data, setData] = useState(null);
  const { showHelp, setShowHelp } = useContext(AudioContext);
  const socket = usePartySocket({
    // host defaults to the current URL if not set
    host: "wss://toeken-party.goodluckh.partykit.dev",

    // we could use any room name here
    room: "main",
    onError(event) {
      setEvent(event);
      console.error("Error with PartySocket!", event);
      if (event.type === "init") {
      }
    },

    onMessage(evt) {
      const data = JSON.parse(evt.data);
      setData(data);
      console.log("Received message", data);
    },
  });
  return (
    <main className="min-h-screen flex flex-col p-4">
      <YouTubeAudioLoop videoId="kmuLGCgSPEc" />
      {showHelp ? <Help /> : <Demo />}
    </main>
  );
}
