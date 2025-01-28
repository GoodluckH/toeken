import React, { useEffect, useRef } from "react";
import Script from "next/script";
import { AudioContext } from "../providers";

export const YouTubeAudioLoop = ({ videoId }) => {
  const { isMuted } = React.useContext(AudioContext);
  const playerRef = useRef(null);
  // Handle mute state changes
  useEffect(() => {
    if (playerRef.current) {
      if (isMuted) {
        playerRef.current.mute();
      } else {
        playerRef.current.unMute();
      }
    }
  }, [isMuted]);
  useEffect(() => {
    // Load YouTube IFrame API
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    // Initialize player when API is ready
    window.onYouTubeIframeAPIReady = () => {
      playerRef.current = new window.YT.Player("youtube-player", {
        height: "0",
        width: "0",

        videoId: videoId,
        playerVars: {
          autoplay: 1,
          loop: 1,
          playlist: videoId, // Required for looping
          controls: 0,
        },
        events: {
          onReady: (event) => {
            event.target.playVideo();
            // Hide video and only play audio
            const iframe = document.getElementById("youtube-player");
            if (iframe) {
              iframe.style.opacity = "0";
              iframe.style.position = "absolute";
              iframe.style.top = "-9999px";
            }
          },
          onStateChange: (event) => {
            // If video ends, replay it
            if (event.data === window.YT.PlayerState.ENDED) {
              event.target.playVideo();
            }
          },
        },
      });
    };

    // Cleanup
    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
      }
    };
  }, [videoId]);

  return (
    <div className="audio-player">
      <div id="youtube-player"></div>
    </div>
  );
};
