"use client";

import dynamic from "next/dynamic";
import { createContext, useState } from "react";

const WagmiProvider = dynamic(
  () => import("@/components/providers/WagmiProvider"),
  {
    ssr: false,
  }
);

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider>
      <AudioContextProvider>
        <GameContextProvider>{children}</GameContextProvider>
      </AudioContextProvider>
    </WagmiProvider>
  );
}

// Audio context and provider
export interface AudioContextProviderType {
  isMuted: boolean;
  setIsMuted: (isMuted: boolean) => void;
  showHelp: boolean;
  setShowHelp: (showHelp: boolean) => void;
}

export const AudioContext = createContext<AudioContextProviderType>({
  isMuted: false,
  setIsMuted: () => {},
  showHelp: false,
  setShowHelp: () => {},
});

export function AudioContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMuted, setIsMuted] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  return (
    <AudioContext.Provider
      value={{ isMuted, setIsMuted, showHelp, setShowHelp }}
    >
      {children}
    </AudioContext.Provider>
  );
}

export enum SuckingStatus {
  Sucking = "sucking",
  Idle = "idle",
  Sucked = "sucked",
  NotSucked = "not_sucked",
}

export interface GameContextProviderType {
  suckingStatus: SuckingStatus;
  setSuckingStatus: (suckingStatus: SuckingStatus) => void;
  suck: () => void;
}

export const GameContext = createContext<GameContextProviderType>({
  suckingStatus: SuckingStatus.Idle,
  setSuckingStatus: () => {},
  suck: () => {},
});

export function GameContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [suckingStatus, setSuckingStatus] = useState(SuckingStatus.Idle);
  const suck = async () => {
    if (suckingStatus === SuckingStatus.Sucking) {
      return;
    }
    setSuckingStatus(SuckingStatus.Sucking);
    // take money from user
    const success = Math.random() < 0.005;
    if (success) {
      setSuckingStatus(SuckingStatus.Sucked);
    } else {
      setSuckingStatus(SuckingStatus.NotSucked);
    }
  };
  return (
    <GameContext.Provider value={{ suckingStatus, setSuckingStatus, suck }}>
      {children}
    </GameContext.Provider>
  );
}
