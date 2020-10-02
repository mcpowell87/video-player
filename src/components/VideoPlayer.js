import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import videojs from "video.js";
import mime from "mime-types";
import { useLocation } from "react-router-dom";
import "../../node_modules/video.js/dist/video-js.css";
import { generateTitle, getFriendlyFilename } from "../util";
import Breakpoints from "../styles/breakpoints";
import settings from "../settings";

const VideoWrapper = styled.div`
  height: 34vh;
  width: 99vw;

  @media ${Breakpoints.laptop} {
    height: 100%;
    width: 65vw;
    flex-grow: 0;
    flex-shrink: 0;
  }

  > .vjs-fill {
    height: calc(100% - 2rem) !important;
    @media ${Breakpoints.laptop} {
      height: calc(100% - 2.5rem) !important;
    }
  }
`;

const VideoTitleContainer = styled.div`
  display: flex;
  align-items: center;
  font-size: 16px;
  height: 2rem;

  @media ${Breakpoints.laptop} {
    font-size: 24px;
    height: 2.5rem;
  }
`;

const VideoTitle = styled.div`
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

function VideoPlayer() {
  const videoPlayer = useRef();
  const player = useRef();
  const [videoPath, setVideoPath] = useState();
  let location = useLocation();

  useEffect(() => {
    player.current = videojs(videoPlayer.current, {
      fill: true,
      responsive: true,
      controls: true,
      preload: "auto",
    });
    return () => {
      if (player && player.current) {
        player.current.dispose();
      }
    };
  }, []);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    setVideoPath(searchParams.get("v"));
    document.title = generateTitle(videoPath);
    if (player.current) {
      let src = { src: "", type: "" };
      if (videoPath) {
        src = {
          src: `${settings.apiBase}/video?v=${encodeURIComponent(videoPath)}`,
          type: mime.lookup(videoPath),
        };
      }
      player.current.src(src);
    }
  }, [location, videoPath]);

  return (
    <VideoWrapper>
      <VideoTitleContainer>
        <VideoTitle title={videoPath}>Now Playing: {getFriendlyFilename(videoPath)}</VideoTitle>
      </VideoTitleContainer>
      <div data-vjs-player>
        <video
          ref={videoPlayer}
          className="video-js vjs-big-play-centered"
        ></video>
      </div>
    </VideoWrapper>
  );
}
export default VideoPlayer;
