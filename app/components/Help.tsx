"use client";

import { useContext } from "react";
import { AudioContext } from "../providers";

export const Help = () => {
  const { setShowHelp } = useContext(AudioContext);
  return (
    <div className="px-8 gap-10 flex flex-col">
      <p>
        players may spin the wheel for 1,000 $toeken to give the current toe a
        suck, which has a chance to reveal the toe. toes must be revealed in the
        order of smallest to largest
      </p>
      <p>
        once a toe is revealed, WETH fees on the $toeken LP from clanker are
        distributed to the toe revealer and the next toe is ready to be revealed
      </p>
      <p>
        if all toes are revealed, the full unredacted foot will be minted as a
        5-piece collection onchain and airdropped to the winning toe revealers.
        the identity of the foot is then revealed only to the BIG TOE revealer
      </p>
      <div>
        <button
          onClick={() => setShowHelp(false)}
          className="text-lg p-2 bg-blue-800 rounded-md max-w-[80%]"
        >
          show me the toes
        </button>
        <button
          onClick={() => setShowHelp(false)}
          className="text-lg p-2 bg-yellow-800 rounded-md max-w-[80%] translate-x-20 translate-y-15"
        >
          show me the toes
        </button>
        <button
          onClick={() => setShowHelp(false)}
          className="text-lg p-2 bg-teal-800 rounded-md max-w-[80%] -translate-x-6 -translate-y-15"
        >
          show me the toes
        </button>
        <button
          onClick={() => setShowHelp(false)}
          className="text-lg p-2 bg-purple-800 rounded-md max-w-[80%] translate-x-40 -translate-y-40"
        >
          show me the toes
        </button>

        <button
          onClick={() => setShowHelp(false)}
          className="text-lg p-2 bg-red-800 rounded-md max-w-[80%] translate-x-40 -translate-y-20"
        >
          show me the toes
        </button>
      </div>
    </div>
  );
};
