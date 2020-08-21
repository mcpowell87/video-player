import React from "react";
import { Link, withRouter } from "react-router-dom";
import styled from "styled-components";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";

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

function VideoListItem(props) {
  /*const [selected, setSelected] = useState(false);
  useEffect(() => {
    const isSelected = (video) => {
      if (!matchPath(props.location.pathname, { path: `/${video}` })) {
        console.log(`${props.location.pathname} : ${video}`);
      }
      return matchPath(props.location.pathname, { path: `/${video}` });
    };
    setSelected(isSelected(props.video));
  }, [props.location.pathname, props.video]);*/

  return (
    <VideoItem>
      {props.selected ? <FontAwesomeIcon size="sm" fixedWidth icon={faPlay} /> : ""}
      <VideoLink
        onClick={() => props.onSelected(props.video)}
        title={props.video}
        to={{ pathname: `/${props.video}` }}
      >
        {props.video}
      </VideoLink>
    </VideoItem>
  );
}

VideoListItem.defaultProps = {
    selected: false
}

VideoListItem.propTypes = {
  video: PropTypes.string.isRequired,
  selected: PropTypes.bool,
  onSelected: PropTypes.func.isRequired,
};

export default withRouter(VideoListItem);
