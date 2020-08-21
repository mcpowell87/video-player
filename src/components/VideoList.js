import React, { useEffect, useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import VideoListItem from "./VideoListItem";

const ListContainer = styled.ul`
  overflow-x: hidden;
  width: 25rem;
  list-style: none;
  margin: 0 1rem 0 0;
  padding: 0;
  border: 1px solid grey;
  flex-shrink: 0;
`;

function VideoList(props) {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);

  useEffect(() => {
    const getVideoList = async () => {
      const response = await fetch(
        `${window.location.protocol}//${window.location.host}/getVideos.php`
      );
      const json = await response.json();
      setVideos(
        json.sort((a, b) =>
          a.localeCompare(b, undefined, { sensitivity: "base" })
        )
      );
    };
    getVideoList();
  }, []);

  return (
    <ListContainer>
      {videos.map((v) => (
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

VideoList.propTypes = {
  location: PropTypes.object.isRequired,
};

export default VideoList;
