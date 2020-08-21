import React, { useEffect, useRef } from "react";
import styled from 'styled-components';
import videojs from "video.js";
import mime from "mime-types";
import { useParams } from "react-router-dom";
import "../../node_modules/video.js/dist/video-js.css";
import { generateTitle } from '../util';

const VideoWrapper = styled.div`
    height: auto;
    width: 100%;
`;

const VideoPlayerDiv = styled.div`
    position: relative !important;
    width: 100% !important;
    height: auto !important;
`;

function VideoPlayer() {
  const videoPlayer = useRef();
  const player = useRef();
  let { videoPath } = useParams();

  useEffect(() => {
    player.current = videojs(videoPlayer.current, {
      fill: true,
      controls: true,
      preload: "auto",
    });
    return () => {
      if (player) {
        player.dispose();
      }
    };
  }, []);

  useEffect(() => {
      document.title = generateTitle(videoPath);
      if (player.current) {
          player.current.src({
              src: `${window.location.protocol}//${window.location.host}/files/videos/${encodeURIComponent(videoPath)}`,
              type: mime.lookup(videoPath)
          });
      }
  }, [videoPath])

  if (!videoPath) {
      return (<VideoWrapper></VideoWrapper>);
  }

  return (
    <VideoWrapper>
      <VideoPlayerDiv data-vjs-player>
        <video ref={videoPlayer} className="video-js vjs-big-play-centered">
          <source
            src={`${window.location.protocol}//${window.location.host}/files/videos/${videoPath}`}
            type={mime.lookup(videoPath)}
          />
        </video>
      </VideoPlayerDiv>
    </VideoWrapper>
  );
}
export default VideoPlayer;
