import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
    body{
        background-color: ${props => props.theme.background};
        color: ${props => props.theme.text.onDark};
    }

    ::-webkit-scrollbar {
        background-color: ${props => props.theme.scrollbar.background};
        width: 10px;
    }
    ::-webkit-scrollbar-track {
        background-color: ${props => props.theme.scrollbar.track};
        border-radius: 10px;
    }
    ::-webkit-scrollbar-thumb {
        background-color: ${props => props.theme.scrollbar.thumb};
        border-radius: 10px;
    }
    ::-webkit-scrollbar-thumb:hover {
        background-color: ${props => props.theme.scrollbar.thumbhHover}
    }
`;