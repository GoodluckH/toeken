"use client";

import dynamic from "next/dynamic";
import usePartySocket from "partysocket/react";
import { useState } from "react";

const Demo = dynamic(() => import("./components/Demo"), {
  ssr: false,
});

export default function Home() {
  const [event, setEvent] = useState(null);
  const [data, setData] = useState(null);
  const socket = usePartySocket({
    // host defaults to the current URL if not set
    host: "toeken-party.goodluckh.partykit.dev",

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
      {event && <pre>{JSON.stringify(event, null, 2)}</pre>}
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
      <Demo />
    </main>
  );
}
