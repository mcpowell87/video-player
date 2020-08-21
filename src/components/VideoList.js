import React, { useEffect, useState } from "react";
import styled from "styled-components";
import VideoListItem from "./VideoListItem";
import Breakpoints from "../styles/breakpoints";

const ListContainer = styled.ul`
  overflow-x: hidden;
  width: 99vw;
  list-style: none;
  margin: .5rem 0 0 0;
  height: 57vh;
  padding: 0;
  
  flex-shrink: 0;

  @media ${Breakpoints.laptop} {
    border-radius: 4px;
    margin: 2.5rem 0 0 1rem;
    width: 25rem;
    background-color: ${props => props.theme.lighterBackground};
    height: calc(100% - 2.5rem) !important;

    ::-webkit-scrollbar {
        background-color: ${props => props.theme.lighterBackground};
        border-radius: 10px;
    }
    ::-webkit-scrollbar-track {
        background-color: ${props => props.theme.lighterBackground};
        border-radius: 10px;
    }
  }
`;

function VideoList(props) {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);

  useEffect(() => {
    const getVideoList = async () => {
      let json;
      try {
        const response = await fetch(
            `${window.location.protocol}//${window.location.host}/getVideos.php`
          );
        json = await response.json();
        json.sort((a, b) =>
          a.localeCompare(b, undefined, { sensitivity: "base" })
        );
      }
      catch(err) {
          console.warn("Did not receive a valid response from the server.")
      }
      
      setVideos(json);
    };
    if (process.env.NODE_ENV === "development") {
        setVideos(require("../testData/videos.json"));
    }
    else {
        getVideoList();
    }
  }, []);

  return (
    <ListContainer>
      {videos && videos.map((v) => (
        <VideoListItem
          key={v}
          video={v}
          selected={selectedVideo === v}
          onSelected={setSelectedVideo}
        />
      ))}
    </ListContainer>
  );
}

export default VideoList;
