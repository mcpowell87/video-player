import React from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
import VideoPlayer from "./components/VideoPlayer";
import VideoList from "./components/VideoList";
import DarkTheme from "./theme/dark";
import Breakpoints from "./styles/breakpoints";
import GlobalStyle from "./styles/global";

const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: calc(10px + 2vmin);
  color: ${props => props.theme.text.onDark};
`;

const AppHeader = styled.header`
  padding: .5rem;
  height: 5vh;
  display: flex;
  align-items: center;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  
  align-items: center;

  @media ${Breakpoints.laptop} {
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height: 90vh;
    max-width: 80%;
  }
`;

function App() {
  return (
    <ThemeProvider theme={DarkTheme}>
      <Router>
        <AppContainer>
          <GlobalStyle />
          <AppHeader>
            <div>Internet Video Archive</div>
          </AppHeader>
          <ContentContainer>
            <Switch>
              <Route path="/:videoPath" children={<VideoPlayer />} />
              <Route path="/" children={<VideoPlayer />} />
            </Switch>
            <VideoList />
          </ContentContainer>
        </AppContainer>
      </Router>
    </ThemeProvider>
  );
}

export default App;
