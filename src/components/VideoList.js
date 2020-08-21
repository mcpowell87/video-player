import React, { useEffect, useState } from "react";
import { Link, withRouter, matchPath } from "react-router-dom";
import styled from "styled-components";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";

const ListContainer = styled.ul`
  overflow-x: hidden;
  width: 25rem;
  list-style: none;
  margin: 0 1rem 0 0;
  padding: 0;
  border: 1px solid grey;
  flex-shrink: 0;
`;

const VideoItem = styled.li`
  padding: 0.25rem;
  color: ${(props) => props.theme.text.onDark};
  display: flex;
  height: 1.5rem;
  align-items: center;

  > svg {
    margin-right: 0.5rem;
  }
`;

const VideoLink = styled(Link)`
  color: ${(props) => props.theme.text.onDark};
  font-size: 16px;
  text-decoration: none;
  width: 100%;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

function VideoList(props) {
  const [videos, setVideos] = useState([]);

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
  });

  const isSelected = (video) => {
    return matchPath(props.location.pathname, { path: `/${video}` });
  };

  return (
    <ListContainer>
      {videos.map((v) => {
        return (
          <VideoItem>
            {isSelected(v) ? (
              <FontAwesomeIcon size="sm" fixedWidth icon={faPlay} />
            ) : (
              ""
            )}
            <VideoLink title={v} to={{ pathname: `/${v}` }}>
              {v}
            </VideoLink>
          </VideoItem>
        );
      })}
      <VideoItem>
        {isSelected("something.mp4") ? (
          <FontAwesomeIcon size="xs" fixedWidth icon={faPlay} />
        ) : (
          ""
        )}
      </VideoItem>
    </ListContainer>
  );
}

VideoList.propTypes = {
  location: PropTypes.object.isRequired,
};

export default withRouter(VideoList);
