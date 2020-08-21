import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import videojs from "video.js";
import mime from "mime-types";
import { useParams } from "react-router-dom";
import "../../node_modules/video.js/dist/video-js.css";
import { generateTitle } from "../util";
import Breakpoints from "../styles/breakpoints";

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
  let { videoPath } = useParams();

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
    document.title = generateTitle(videoPath);
    if (player.current) {
      let src = { src: "", type: "" };
      if (videoPath) {
        src = {
          src: `${window.location.protocol}//${
            window.location.host
          }/files/videos/${encodeURIComponent(videoPath)}`,
          type: mime.lookup(videoPath),
        };
      }
      player.current.src(src);
    }
  }, [videoPath]);

  return (
    <VideoWrapper>
      <VideoTitleContainer>
        <VideoTitle title={videoPath}>Now Playing: {videoPath}</VideoTitle>
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
