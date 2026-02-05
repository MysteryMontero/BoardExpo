import React, { Component } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import Board from './Board';
import Tickets from './Tickets';
import Header from '../components/Header/Header';
import TaskCard from '../components/TaskCard/TaskCard';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
      "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
`;

const AppWrapper = styled.div`
  text-align: center;
`;

class App extends Component {
  render() {
    const lanes = [
      { id: 1, title: 'No Intellegence' },
      { id: 2, title: 'Plain Stupid' },
      { id: 3, title: 'Can Hold A Job' },
      { id: 4, title: 'Smart Cookie' },
      { id: 5, title: 'Hyper Intelligent' },
    ];

    return (
      <>
        <GlobalStyle />
        <AppWrapper>
          <Header />
          <Board
            lanes={lanes}
            dataSource={'../../assets/data.json'}
          />
        </AppWrapper>
      </>
    );
  }
}

export default App;
