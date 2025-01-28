import { useEffect, useCallback, useState, useContext } from "react";
import sdk, { type FrameContext } from "@farcaster/frame-sdk";
import Image from "next/image";
import FeetImage from "@/images/feet-1.jpg";
import {
  useAccount,
  useConnect,
  useDisconnect,
  useSendTransaction,
  useSignMessage,
  useSignTypedData,
  useWaitForTransactionReceipt,
} from "wagmi";
import { config } from "@/components/providers/WagmiProvider";
import { GameContext, SuckingStatus } from "../providers";

export default function Demo() {
  const [error, setError] = useState<object | null>(null);
  const [isSDKLoaded, setIsSDKLoaded] = useState(false);
  const [context, setContext] = useState<FrameContext>();
  const { suckingStatus, suck } = useContext(GameContext);
  const [isContextOpen, setIsContextOpen] = useState(false);
  const { connect } = useConnect();
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const [txHash, setTxHash] = useState<string | null>(null);
  const {
    sendTransaction,
    error: sendTxError,
    isError: isSendTxError,
    isPending: isSendTxPending,
  } = useSendTransaction();

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash: txHash as `0x${string}`,
    });

  const {
    signMessage,
    error: signError,
    isError: isSignError,
    isPending: isSignPending,
  } = useSignMessage();

  const {
    signTypedData,
    error: signTypedError,
    isError: isSignTypedError,
    isPending: isSignTypedPending,
  } = useSignTypedData();

  useEffect(() => {
    const load = async () => {
      setContext(await sdk.context);
      sdk.actions.ready();
    };
    if (sdk && !isSDKLoaded) {
      setIsSDKLoaded(true);
      load();
    }
  }, [isSDKLoaded]);

  const sendTx = useCallback(() => {
    sendTransaction(
      {
        to: "0x4bBFD120d9f352A0BEd7a014bd67913a2007a878",
        data: "0x9846cd9efc000023c0",
      },
      {
        onSuccess: (hash) => {
          setTxHash(hash);
        },
      }
    );
  }, [sendTransaction]);

  const sign = useCallback(() => {
    signMessage({ message: "Hello from Frames v2!" });
  }, [signMessage]);

  const signTyped = useCallback(() => {
    signTypedData({
      domain: {
        name: "Frames v2 Demo",
        version: "1",
        chainId: 8453,
      },
      types: {
        Message: [{ name: "content", type: "string" }],
      },
      message: {
        content: "Hello from Frames v2!",
      },
      primaryType: "Message",
    });
  }, [signTypedData]);

  const toggleContext = useCallback(() => {
    setIsContextOpen((prev) => !prev);
  }, []);

  if (!isSDKLoaded) {
    return <div>Loading...</div>;
  }
  const renderError = (error: Error | null) => {
    if (!error) return null;
    return <div className="text-red-500 text-xs mt-1">{error.message}</div>;
  };

  return (
    <div className="w-[300px] mx-auto py-4 px-2">
      <h1 className="text-xl font-bold text-center mb-4 italic">
        level 1: pinky toe
      </h1>

      <Image src={FeetImage} alt="feet" width={300} />
      <div className="mt-10 flex flex-col items-center w-full">
        {suckingStatus === SuckingStatus.NotSucked
          ? "you suck"
          : suckingStatus === SuckingStatus.Sucked
          ? "you sucked!!!!!!!!!"
          : ""}
        <button
          onClick={sendTx}
          disabled={suckingStatus === SuckingStatus.Sucking}
          className={`px-4 py-2 text-white rounded-lg ${
            suckingStatus === SuckingStatus.Idle
              ? "bg-blue-500 active:bg-blue-700"
              : suckingStatus === SuckingStatus.Sucking
              ? "bg-neutral-500 active:bg-neutral-700"
              : suckingStatus === SuckingStatus.NotSucked
              ? "bg-red-500 active:bg-red-700"
              : "bg-green-500 active:bg-green-700"
          }`}
        >
          {suckingStatus === SuckingStatus.Idle
            ? "give it a suck (1,000 toeken)"
            : suckingStatus === SuckingStatus.Sucking
            ? "sucking in progress..."
            : suckingStatus === SuckingStatus.NotSucked
            ? "try again (1,000 toeken)"
            : "suck the next one (1,000 toeken)"}
        </button>
        <div>
          {!isConnected && (
            <>
              <button
                className="px-4 py-2 text-white rounded-lg mt-10"
                onClick={async () => {
                  if (isConnected) {
                    disconnect();
                  } else {
                    try {
                      await connect({ connector: config.connectors[0] });
                    } catch (error) {
                      setError(error);
                    }
                  }
                }}
              >
                {isConnected ? "Disconnect" : "Connect"}
              </button>
              <div className="mb-4">
                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                  onClick={sendTx}
                  disabled={!isConnected || isSendTxPending}
                >
                  {isSendTxPending ? "Sending..." : "Send Transaction"}
                </button>
                {isSendTxError && renderError(sendTxError)}
                {txHash && (
                  <div className="mt-2 text-xs">
                    <div>Hash: {txHash}</div>
                    <div>
                      Status:{" "}
                      {isConfirming
                        ? "Confirming..."
                        : isConfirmed
                        ? "Confirmed!"
                        : "Pending"}
                    </div>
                  </div>
                )}
              </div>
              <div className="mb-4">
                <button onClick={sign} disabled={!isConnected || isSignPending}>
                  {isSignPending ? "Signing..." : "Sign Message"}
                </button>
                {isSignError && renderError(signError)}
              </div>
              <div className="mb-4">
                <button
                  onClick={signTyped}
                  disabled={!isConnected || isSignTypedPending}
                >
                  {isSignTypedPending ? "Signing..." : "Sign Typed Data"}
                </button>
                {isSignTypedError && renderError(signTypedError)}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
