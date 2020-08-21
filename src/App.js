import React from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
import VideoPlayer from "./components/VideoPlayer";
import VideoList from "./components/VideoList";
import DarkTheme from "./theme/dark";

const AppContainer = styled.div`
  background-color: ${props => props.theme.background};
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: ${props => props.theme.text.onDark};
`;

const AppHeader = styled.header`
  margin-bottom: 1rem;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 80%;
  height: 75vh;
`;

function App() {
  return (
    <ThemeProvider theme={DarkTheme}>
      <Router>
        <AppContainer>
          <AppHeader>
            <div>Internet Video Archive</div>
          </AppHeader>
          <ContentContainer>
            <VideoList />
            <Switch>
              <Route path="/:videoPath" children={<VideoPlayer />} />
            </Switch>
          </ContentContainer>
        </AppContainer>
      </Router>
    </ThemeProvider>
  );
}

export default App;
