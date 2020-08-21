import React from "react";
import { Link, withRouter } from "react-router-dom";
import styled from "styled-components";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import Breakpoints from "../styles/breakpoints";

const VideoItem = styled.li`
  color: ${(props) => props.theme.text.onDark};
  display: flex;
  height: 2.5rem;
  font-size: 20px;
  padding-left: .5rem;
  font-weight: 100;
  align-items: center;

  > svg {
    margin-right: .1rem;
  }

  @media ${Breakpoints.laptop} {
    height: 1.75rem;
    font-size: 16px;
    padding-left: 0;
    font-weight: normal;
  }

  :hover {
    @media ${Breakpoints.laptop} {
      background-color: ${props => props.theme.hover};
    }
  }
`;

const VideoLink = styled(Link)`
  color: ${(props) => props.theme.text.onDark};
  text-decoration: none;
  width: 100%;
  height: 100%;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  display: flex;
  align-items: center;
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
      {props.selected ? <FontAwesomeIcon size="xs" fixedWidth icon={faPlay} /> : ""}
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
